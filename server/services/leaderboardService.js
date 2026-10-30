import Attempt from '../models/Attempt.js';
import Player from '../models/Player.js';
import { readJson, PATHS } from '../storage/jsonStore.js';

/**
 * Chuyển đổi timestamp ISO sang Date theo múi giờ Việt Nam (UTC+7)
 */
function getVietnamDate(isoString) {
  const d = new Date(isoString);
  // Thêm offset 7 giờ nếu cần hoặc dùng getUTCHours + 7
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  return new Date(utc + (7 * 3600000));
}

/**
 * Kiểm tra xem ngày có thuộc tuần này không (tuần bắt đầu từ thứ Hai, giờ VN)
 */
function isDateInCurrentWeek(dateStr) {
  const nowVN = getVietnamDate(new Date().toISOString());
  const targetVN = getVietnamDate(dateStr);

  // Tìm thứ Hai của tuần hiện tại
  const dayOfWeek = nowVN.getDay(); // 0 là CN, 1 là T2...
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  const startOfWeek = new Date(nowVN);
  startOfWeek.setDate(nowVN.getDate() + diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return targetVN >= startOfWeek && targetVN < endOfWeek;
}

/**
 * Kiểm tra xem ngày có thuộc tháng này không (giờ VN)
 */
function isDateInCurrentMonth(dateStr) {
  const nowVN = getVietnamDate(new Date().toISOString());
  const targetVN = getVietnamDate(dateStr);

  return (
    targetVN.getFullYear() === nowVN.getFullYear() &&
    targetVN.getMonth() === nowVN.getMonth()
  );
}

/**
 * So sánh 2 lượt chơi xem lượt nào tốt hơn:
 * 1. Điểm cao hơn
 * 2. Số câu đúng nhiều hơn
 * 3. Thời gian trả lời ít hơn (ms)
 * 4. Hoàn thành sớm hơn
 */
function compareAttempts(a, b) {
  // 1. Tổng điểm
  if (b.scores.total !== a.scores.total) {
    return b.scores.total - a.scores.total;
  }
  // 2. Số câu đúng
  if (b.stats.totalCorrect !== a.stats.totalCorrect) {
    return b.stats.totalCorrect - a.stats.totalCorrect;
  }
  // 3. Thời gian trả lời 40 câu trắc nghiệm (ms) - ít hơn là tốt hơn
  if (a.stats.totalQuizTimeSpentMs !== b.stats.totalQuizTimeSpentMs) {
    return a.stats.totalQuizTimeSpentMs - b.stats.totalQuizTimeSpentMs;
  }
  // 4. Thời điểm hoàn thành sớm hơn
  return new Date(a.completedAt) - new Date(b.completedAt);
}

/**
 * Lấy Bảng Xếp Hạng theo mùa và phạm vi lọc
 * @param {string} seasonId 
 * @param {'all' | 'week' | 'month'} timeRange 
 * @param {string} currentPlayerId 
 */
export async function getLeaderboard(seasonId, timeRange = 'all', currentPlayerId = null) {
  let attempts = [];
  let players = [];

  try {
    const query = { status: 'completed', isDisqualified: false };
    if (seasonId) query.seasonId = seasonId;
    attempts = await Attempt.find(query).lean();
    players = await Player.find().lean();
  } catch (_) {}

  if (!attempts || attempts.length === 0) {
    attempts = await readJson(PATHS.ATTEMPTS, []);
    players = await readJson(PATHS.PLAYERS, []);
  }

  const playerMap = new Map(players.map(p => [p.playerId, p]));


  // Lọc các lượt hợp lệ: completed, cùng season, không bị loại
  const eligibleAttempts = attempts.filter(a => {
    if (a.status !== 'completed' || a.isDisqualified) return false;
    if (seasonId && a.seasonId !== seasonId) return false;
    if (!a.completedAt) return false;

    if (timeRange === 'week') {
      return isDateInCurrentWeek(a.completedAt);
    }
    if (timeRange === 'month') {
      return isDateInCurrentMonth(a.completedAt);
    }
    return true; // 'all'
  });

  // Chọn lượt tốt nhất của mỗi người chơi
  const bestAttemptByPlayer = new Map();
  for (const att of eligibleAttempts) {
    const currentBest = bestAttemptByPlayer.get(att.playerId);
    if (!currentBest || compareAttempts(att, currentBest) < 0) {
      bestAttemptByPlayer.set(att.playerId, att);
    }
  }

  // Sắp xếp danh sách
  const sortedAttempts = Array.from(bestAttemptByPlayer.values()).sort(compareAttempts);

  // Tính thứ hạng đồng hạng (1, 2, 2, 4)
  let currentRank = 1;
  const rankedItems = [];

  for (let i = 0; i < sortedAttempts.length; i++) {
    const att = sortedAttempts[i];
    if (i > 0) {
      const prev = sortedAttempts[i - 1];
      // Kiểm tra có bằng nhau hoàn toàn không (điểm, số đúng, thời gian ms)
      const isTied = (
        att.scores.total === prev.scores.total &&
        att.stats.totalCorrect === prev.stats.totalCorrect &&
        att.stats.totalQuizTimeSpentMs === prev.stats.totalQuizTimeSpentMs
      );
      if (!isTied) {
        currentRank = i + 1;
      }
    }

    const p = playerMap.get(att.playerId);
    rankedItems.push({
      rank: currentRank,
      attemptId: att.attemptId,
      playerId: att.playerId,
      displayName: p?.displayName || 'Người chơi',
      studentClass: p?.publicClass ? (p?.studentClass || '') : null,
      totalScore: att.scores.total,
      totalCorrect: att.stats.totalCorrect,
      totalTimeSpentSeconds: (att.stats.totalQuizTimeSpentMs / 1000).toFixed(1),
      completedAt: att.completedAt,
      isCurrentPlayer: att.playerId === currentPlayerId
    });
  }

  // Tìm thứ hạng của người chơi hiện tại
  let myRankInfo = null;
  if (currentPlayerId) {
    const found = rankedItems.find(item => item.playerId === currentPlayerId);
    if (found) {
      myRankInfo = found;
    }
  }

  return {
    seasonId,
    timeRange,
    totalParticipants: rankedItems.length,
    items: rankedItems,
    myRank: myRankInfo,
    note: "Xếp hạng trải nghiệm: đề thi ngẫu nhiên theo cùng cấu hình độ khó; danh tính sinh viên tự khai báo chưa được xác minh chính thức."
  };
}
