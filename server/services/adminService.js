import crypto from 'crypto';
import AuditLog from '../models/AuditLog.js';
import Question from '../models/Question.js';
import Season from '../models/Season.js';
import Player from '../models/Player.js';
import Attempt from '../models/Attempt.js';
import { readJson, updateJson, PATHS } from '../storage/jsonStore.js';
import { getQuestionsByRound } from './questionService.js';
import { normalizeVietnamese } from './textUtils.js';

/**
 * Ghi nhật ký Audit Log
 */
export async function logAuditAction(adminUsername, action, targetType, targetId, details = {}) {
  const logEntry = {
    id: 'log_' + crypto.randomUUID(),
    adminUsername,
    action,
    targetType,
    targetId,
    details,
    timestamp: new Date().toISOString()
  };

  try {
    await AuditLog.create(logEntry);
  } catch (_) {}

  await updateJson(PATHS.AUDIT_LOGS, (logs = []) => {
    logs.unshift(logEntry); // Mới nhất lên đầu
    // Giới hạn 2000 logs gần nhất
    if (logs.length > 2000) logs.pop();
    return logs;
  }, []);

  return logEntry;
}

/**
 * Lấy danh sách Audit Logs
 */
export async function getAuditLogs(limit = 100) {
  try {
    const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(limit).lean();
    if (logs && logs.length > 0) return logs;
  } catch (_) {}
  const logs = await readJson(PATHS.AUDIT_LOGS, []);
  return logs.slice(0, limit);
}

/**
 * Lấy câu hỏi theo bộ lọc Admin
 */
export async function getAdminQuestions(roundKey, { difficulty, topic, search } = {}) {
  const all = await getQuestionsByRound(roundKey);
  let filtered = all;

  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  if (topic) {
    filtered = filtered.filter(q => q.topic === topic);
  }
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(q =>
      q.id.toLowerCase().includes(s) ||
      q.question.toLowerCase().includes(s) ||
      q.explanation?.toLowerCase().includes(s)
    );
  }

  return filtered;
}

/**
 * Thêm hoặc Cập nhật câu hỏi
 */
export async function saveQuestion(questionData, adminUser = 'admin') {
  const { round, id } = questionData;
  if (!round || !['khoi_dong', 'tranh_tai', 'ban_ket', 'chung_ket'].includes(round)) {
    throw new Error('Vòng chơi không hợp lệ.');
  }

  let filePath = null;
  switch (round) {
    case 'khoi_dong': filePath = PATHS.ROUND1; break;
    case 'tranh_tai': filePath = PATHS.ROUND2; break;
    case 'ban_ket': filePath = PATHS.ROUND3; break;
    case 'chung_ket': filePath = PATHS.ROUND4; break;
  }

  // Validate câu hỏi
  if (!questionData.question || !questionData.question.trim()) {
    throw new Error('Nội dung câu hỏi không được để trống.');
  }
  if (!Array.isArray(questionData.options) || questionData.options.length !== 4) {
    throw new Error('Phải có đúng 4 phương án A, B, C, D.');
  }
  if (!['A', 'B', 'C', 'D'].includes(questionData.correctOptionId)) {
    throw new Error('Đáp án đúng phải là A, B, C hoặc D.');
  }

  if (round === 'chung_ket') {
    if (!questionData.horizontalAnswer) {
      throw new Error('Vòng Chung kết bắt buộc phải có horizontalAnswer.');
    }
    questionData.normalizedAnswer = normalizeVietnamese(questionData.horizontalAnswer);
  }

  const qId = id || (`${round.substring(0, 2).toUpperCase()}-${Date.now().toString().slice(-4)}`);
  questionData.id = qId;

  try {
    await Question.findOneAndUpdate({ id: qId }, { ...questionData, id: qId }, { upsert: true, returnDocument: 'after' });
  } catch (_) {}

  await updateJson(filePath, (questions = []) => {
    const idx = questions.findIndex(q => q.id === qId);
    if (idx >= 0) {
      questions[idx] = { ...questions[idx], ...questionData };
    } else {
      questions.push(questionData);
    }
    return questions;
  });

  await logAuditAction(adminUser, 'SAVE_QUESTION', 'QUESTION', qId, { round, difficulty: questionData.difficulty });
  return questionData;
}

/**
 * Xóa câu hỏi
 */
export async function deleteQuestion(roundKey, questionId, adminUser = 'admin') {
  let filePath = null;
  switch (roundKey) {
    case 'khoi_dong': filePath = PATHS.ROUND1; break;
    case 'tranh_tai': filePath = PATHS.ROUND2; break;
    case 'ban_ket': filePath = PATHS.ROUND3; break;
    case 'chung_ket': filePath = PATHS.ROUND4; break;
  }

  try {
    await Question.deleteOne({ id: questionId });
  } catch (_) {}

  await updateJson(filePath, (questions = []) => {
    return questions.filter(q => q.id !== questionId);
  });

  await logAuditAction(adminUser, 'DELETE_QUESTION', 'QUESTION', questionId, { round: roundKey });
  return { success: true };
}

/**
 * Quản lý Mùa giải
 */
export async function getAllSeasons() {
  try {
    const seasons = await Season.find().lean();
    if (seasons && seasons.length > 0) return seasons;
  } catch (_) {}
  return await readJson(PATHS.SEASONS, []);
}

export async function createSeason(seasonData, adminUser = 'admin') {
  const newSeason = {
    id: `season_${Date.now()}`,
    name: seasonData.name?.trim() || `Mùa giải mới ${new Date().getFullYear()}`,
    description: seasonData.description?.trim() || '',
    status: seasonData.status || 'inactive',
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    endedAt: null,
    rules: seasonData.rules || {
      pointsPerRound: { khoi_dong: 10, tranh_tai: 20, ban_ket: 30, chung_ket: 40 },
      keywordBonus: 100,
      timePerQuestionSeconds: 10,
      keywordGuessTimeSeconds: 10,
      difficultyRatio: {
        khoi_dong: { de: 6, vua: 3, kho: 1 },
        tranh_tai: { de: 3, vua: 5, kho: 2 },
        ban_ket: { de: 2, vua: 4, kho: 4 },
        chung_ket: { de: 1, vua: 3, kho: 6 }
      }
    }
  };

  try {
    if (newSeason.status === 'active') {
      await Season.updateMany({}, { status: 'archived' });
    }
    await Season.create(newSeason);
  } catch (_) {}

  await updateJson(PATHS.SEASONS, (seasons = []) => {
    if (newSeason.status === 'active') {
      seasons.forEach(s => s.status = 'archived');
    }
    seasons.push(newSeason);
    return seasons;
  });

  await logAuditAction(adminUser, 'CREATE_SEASON', 'SEASON', newSeason.id, { name: newSeason.name });
  return newSeason;
}

export async function setActiveSeason(seasonId, adminUser = 'admin') {
  try {
    await Season.updateMany({}, { status: 'archived' });
    await Season.updateOne({ id: seasonId }, { status: 'active' });
  } catch (_) {}

  await updateJson(PATHS.SEASONS, (seasons = []) => {
    seasons.forEach(s => {
      s.status = (s.id === seasonId) ? 'active' : 'archived';
    });
    return seasons;
  });

  await logAuditAction(adminUser, 'SET_ACTIVE_SEASON', 'SEASON', seasonId);
  return { success: true };
}

/**
 * Tìm kiếm người chơi cho Admin
 */
export async function searchPlayers(query = '') {
  try {
    let q = {};
    if (query) {
      const reg = new RegExp(query.trim(), 'i');
      q = { $or: [{ displayName: reg }, { studentId: reg }, { studentClass: reg }, { playerId: reg }] };
    }
    const players = await Player.find(q).lean();
    if (players && players.length > 0) {
      return players.map(p => ({
        playerId: p.playerId,
        displayName: p.displayName,
        studentId: p.studentId,
        studentClass: p.studentClass,
        publicClass: p.publicClass,
        createdAt: p.createdAt,
        lastActiveAt: p.lastActiveAt
      }));
    }
  } catch (_) {}

  const players = await readJson(PATHS.PLAYERS, []);
  if (!query) return players.slice(0, 50);

  const q = query.toLowerCase().trim();
  return players.filter(p =>
    p.playerId.toLowerCase().includes(q) ||
    p.displayName.toLowerCase().includes(q) ||
    p.studentId.toLowerCase().includes(q) ||
    p.studentClass.toLowerCase().includes(q)
  );
}

/**
 * Xem lịch sử các lượt chơi của người chơi
 */
export async function getPlayerAttempts(playerId) {
  try {
    const attempts = await Attempt.find({ playerId }).sort({ createdAt: -1 }).lean();
    if (attempts && attempts.length > 0) return attempts;
  } catch (_) {}

  const attempts = await readJson(PATHS.ATTEMPTS, []);
  return attempts
    .filter(a => a.playerId === playerId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Loại lượt chơi (Disqualify) khỏi bảng xếp hạng với lý do
 */
export async function disqualifyAttempt(attemptId, reason, adminUser = 'admin') {
  if (!reason || !reason.trim()) {
    throw new Error('Vui lòng nêu rõ lý do loại lượt chơi.');
  }

  try {
    await Attempt.updateOne(
      { attemptId },
      {
        isDisqualified: true,
        disqualifiedReason: reason.trim(),
        disqualifiedBy: adminUser,
        disqualifiedAt: new Date()
      }
    );
  } catch (_) {}

  let updated = null;
  await updateJson(PATHS.ATTEMPTS, (attempts = []) => {
    const a = attempts.find(item => item.attemptId === attemptId);
    if (!a) throw new Error('Không tìm thấy lượt chơi.');
    a.isDisqualified = true;
    a.disqualifiedReason = reason.trim();
    a.disqualifiedBy = adminUser;
    a.disqualifiedAt = new Date().toISOString();
    updated = a;
    return attempts;
  });

  await logAuditAction(adminUser, 'DISQUALIFY_ATTEMPT', 'ATTEMPT', attemptId, { reason });
  return updated;
}

/**
 * Phục hồi lượt chơi bị loại
 */
export async function reinstateAttempt(attemptId, adminUser = 'admin') {
  try {
    await Attempt.updateOne(
      { attemptId },
      {
        isDisqualified: false,
        disqualifiedReason: '',
        reinstatedBy: adminUser,
        reinstatedAt: new Date()
      }
    );
  } catch (_) {}

  let updated = null;
  await updateJson(PATHS.ATTEMPTS, (attempts = []) => {
    const a = attempts.find(item => item.attemptId === attemptId);
    if (!a) throw new Error('Không tìm thấy lượt chơi.');
    a.isDisqualified = false;
    a.reinstatedBy = adminUser;
    a.reinstatedAt = new Date().toISOString();
    updated = a;
    return attempts;
  });

  await logAuditAction(adminUser, 'REINSTATE_ATTEMPT', 'ATTEMPT', attemptId);
  return updated;
}

/**
 * Thống kê tổng quan hệ thống
 */
export async function getSystemStats() {
  try {
    const totalPlayers = await Player.countDocuments();
    const totalAttempts = await Attempt.countDocuments();
    const completedAttempts = await Attempt.countDocuments({ status: 'completed', isDisqualified: false });
    const abandonedAttempts = await Attempt.countDocuments({ status: 'abandoned' });
    const seasonsCount = await Season.countDocuments();
    const attempts = await Attempt.find().lean();

    const roundStats = {
      khoi_dong: { correct: 0, total: 0 },
      tranh_tai: { correct: 0, total: 0 },
      ban_ket: { correct: 0, total: 0 },
      chung_ket: { correct: 0, total: 0 }
    };

    for (const a of attempts) {
      if (!a.rounds) continue;
      for (const rKey of ['khoi_dong', 'tranh_tai', 'ban_ket', 'chung_ket']) {
        const r = a.rounds[rKey];
        if (!r) continue;
        roundStats[rKey].correct += r.correctCount || 0;
        roundStats[rKey].total += (r.correctCount + r.wrongCount + r.timeoutCount) || 0;
      }
    }

    return {
      totalPlayers,
      totalAttempts,
      completedAttempts,
      abandonedAttempts,
      roundStats,
      seasonsCount
    };
  } catch (_) {}

  const players = await readJson(PATHS.PLAYERS, []);
  const attempts = await readJson(PATHS.ATTEMPTS, []);
  const seasons = await readJson(PATHS.SEASONS, []);

  const totalPlayers = players.length;
  const totalAttempts = attempts.length;
  const completedAttempts = attempts.filter(a => a.status === 'completed' && !a.isDisqualified).length;
  const abandonedAttempts = attempts.filter(a => a.status === 'abandoned').length;

  // Thống kê tỷ lệ đúng theo từng vòng
  const roundStats = {
    khoi_dong: { correct: 0, total: 0 },
    tranh_tai: { correct: 0, total: 0 },
    ban_ket: { correct: 0, total: 0 },
    chung_ket: { correct: 0, total: 0 }
  };

  for (const a of attempts) {
    if (!a.rounds) continue;
    for (const rKey of ['khoi_dong', 'tranh_tai', 'ban_ket', 'chung_ket']) {
      const r = a.rounds[rKey];
      if (!r) continue;
      roundStats[rKey].correct += r.correctCount || 0;
      roundStats[rKey].total += (r.correctCount + r.wrongCount + r.timeoutCount) || 0;
    }
  }

  return {
    totalPlayers,
    totalAttempts,
    completedAttempts,
    abandonedAttempts,
    roundStats,
    seasonsCount: seasons.length
  };
}

/**
 * Xuất dữ liệu bảng xếp hạng sang CSV có BOM UTF-8 (chuẩn Microsoft Excel tiếng Việt)
 * Chống Formula Injection bằng cách prefix dấu ' trước các ký tự =, +, -, @
 */
export function exportLeaderboardToCsv(rankedItems) {
  function escapeCsvCell(val) {
    if (val === null || val === undefined) return '""';
    let str = String(val).replace(/"/g, '""');
    // Chống Formula Injection
    if (/^[=+\-@\t\r]/.test(str)) {
      str = "'" + str;
    }
    return `"${str}"`;
  }

  const headers = ['Hạng', 'ID Người chơi', 'Tên sinh viên', 'Lớp', 'Tổng điểm', 'Số câu đúng', 'Thời gian (giây)', 'Thời điểm hoàn thành'];
  const rows = rankedItems.map(item => [
    escapeCsvCell(item.rank),
    escapeCsvCell(item.playerId),
    escapeCsvCell(item.displayName),
    escapeCsvCell(item.studentClass || 'Ẩn/Không có'),
    escapeCsvCell(item.totalScore),
    escapeCsvCell(item.totalCorrect),
    escapeCsvCell(item.totalTimeSpentSeconds),
    escapeCsvCell(item.completedAt)
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  // Thêm BOM UTF-8 (\uFEFF) ở đầu file
  return '\uFEFF' + csvContent;
}

/**
 * Cập nhật cấu hình thời gian đếm ngược (countdown) cho mùa giải đang hoạt động
 */
export async function updateActiveSeasonTimer({ timePerQuestionSeconds, keywordGuessTimeSeconds }, adminUser = 'admin') {
  const qTime = parseInt(timePerQuestionSeconds, 10);
  if (isNaN(qTime) || qTime < 3 || qTime > 120) {
    throw new Error('Thời gian trả lời mỗi câu phải là số nguyên từ 3 đến 120 giây.');
  }

  let kwTime = 10;
  if (keywordGuessTimeSeconds !== undefined && keywordGuessTimeSeconds !== null) {
    kwTime = parseInt(keywordGuessTimeSeconds, 10);
    if (isNaN(kwTime) || kwTime < 3 || kwTime > 120) {
      throw new Error('Thời gian đoán từ khóa phải là số nguyên từ 3 đến 120 giây.');
    }
  }

  try {
    await Season.updateOne(
      { status: 'active' },
      {
        $set: {
          'rules.timePerQuestionSeconds': qTime,
          'rules.keywordGuessTimeSeconds': kwTime
        }
      }
    );
    await Attempt.updateMany(
      { status: 'in_progress' },
      {
        $set: {
          'rulesSnapshot.timePerQuestionSeconds': qTime,
          'rulesSnapshot.keywordGuessTimeSeconds': kwTime
        }
      }
    );
  } catch (_) {}

  let updatedSeason = null;
  await updateJson(PATHS.SEASONS, (seasons = []) => {
    let active = seasons.find(s => s.status === 'active') || seasons[0];
    if (!active) throw new Error('Không tìm thấy mùa giải hoạt động.');

    if (!active.rules) active.rules = {};
    active.rules.timePerQuestionSeconds = qTime;
    if (kwTime) active.rules.keywordGuessTimeSeconds = kwTime;

    updatedSeason = active;
    return seasons;
  });

  // Cập nhật rulesSnapshot cho tất cả lượt chơi đang diễn ra (in_progress) để áp dụng ngay
  await updateJson(PATHS.ATTEMPTS, (attempts = []) => {
    attempts.forEach(att => {
      if (att.status === 'in_progress') {
        if (!att.rulesSnapshot) att.rulesSnapshot = {};
        att.rulesSnapshot.timePerQuestionSeconds = qTime;
        if (kwTime) att.rulesSnapshot.keywordGuessTimeSeconds = kwTime;
      }
    });
    return attempts;
  });

  await logAuditAction(adminUser, 'UPDATE_TIMER_SETTINGS', 'SEASON', updatedSeason.id, {
    timePerQuestionSeconds: qTime,
    keywordGuessTimeSeconds: kwTime
  });

  return updatedSeason;
}

