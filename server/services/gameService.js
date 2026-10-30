import crypto from 'crypto';
import Attempt from '../models/Attempt.js';
import Season from '../models/Season.js';
import { readJson, updateJson, PATHS } from '../storage/jsonStore.js';
import { generateRoundQuestions, generateFinalRoundQuestions } from './questionService.js';
import { getRandomApprovedCrossword } from './crosswordService.js';
import { normalizeVietnamese } from './textUtils.js';

const ROUND_KEYS = ['khoi_dong', 'tranh_tai', 'ban_ket', 'chung_ket'];

/**
 * Lấy mùa giải đang hoạt động
 */
export async function getActiveSeason() {
  try {
    const active = await Season.findOne({ status: 'active' }).lean();
    if (active) return active;
  } catch (_) {}

  const seasons = await readJson(PATHS.SEASONS, []);
  const active = seasons.find(s => s.status === 'active') || seasons[0];
  if (!active) {
    throw new Error('Chưa có mùa giải nào được kích hoạt.');
  }
  return active;
}

/**
 * Lấy tất cả lượt chơi
 */
export async function getAllAttempts() {
  try {
    const attempts = await Attempt.find().lean();
    if (attempts && attempts.length > 0) return attempts;
  } catch (_) {}
  return await readJson(PATHS.ATTEMPTS, []);
}

/**
 * Lấy thông tin chi tiết một lượt chơi theo attemptId
 */
export async function getAttemptById(attemptId) {
  try {
    const attempt = await Attempt.findOne({ attemptId }).lean();
    if (attempt) return attempt;
  } catch (_) {}
  const attempts = await readJson(PATHS.ATTEMPTS, []);
  return attempts.find(a => a.attemptId === attemptId) || null;
}

/**
 * Lấy lượt chơi đang diễn ra của người chơi (nếu có)
 */
export async function getActiveAttemptByPlayer(playerId) {
  try {
    const attempt = await Attempt.findOne({ playerId, status: 'in_progress' }).lean();
    if (attempt) return attempt;
  } catch (_) {}
  const attempts = await readJson(PATHS.ATTEMPTS, []);
  return attempts.find(a => a.playerId === playerId && a.status === 'in_progress') || null;
}

/**
 * Tạo một lượt chơi mới cho người chơi
 * @param {string} playerId 
 * @param {boolean} forceNew Nếu true, bỏ lượt dở cũ chuyển sang abandoned
 */
export async function createAttempt(playerId, forceNew = false) {
  const season = await getActiveSeason();
  const rules = season.rules;

  // Kiểm tra lượt đang chơi dở
  const existingActive = await getActiveAttemptByPlayer(playerId);
  if (existingActive) {
    if (!forceNew) {
      return {
        isResume: true,
        attempt: sanitizeAttemptForClient(existingActive)
      };
    }
    // Chuyển lượt cũ sang abandoned
    await updateJson(PATHS.ATTEMPTS, (attempts = []) => {
      const old = attempts.find(a => a.attemptId === existingActive.attemptId);
      if (old) {
        old.status = 'abandoned';
        old.lastUpdatedAt = new Date().toISOString();
      }
      return attempts;
    });
  }

  // Tạo đề 4 vòng
  console.log(`[GameService] Đang tạo đề thi cho người chơi ${playerId}...`);
  const r1Questions = await generateRoundQuestions('khoi_dong', rules.difficultyRatio.khoi_dong);
  const r2Questions = await generateRoundQuestions('tranh_tai', rules.difficultyRatio.tranh_tai);
  const r3Questions = await generateRoundQuestions('ban_ket', rules.difficultyRatio.ban_ket);

  // Vòng Chung kết: Lấy 1 bộ ô chữ ngẫu nhiên đã duyệt
  const crossword = await getRandomApprovedCrossword();
  const r4Questions = await generateFinalRoundQuestions(crossword);

  const attemptId = 'att_' + crypto.randomUUID();
  const now = new Date().toISOString();

  const newAttempt = {
    attemptId,
    playerId,
    seasonId: season.id,
    seasonName: season.name,
    rulesSnapshot: rules,
    status: 'in_progress', // 'in_progress' | 'completed' | 'abandoned'
    isDisqualified: false,
    disqualifiedReason: '',
    createdAt: now,
    startedAt: now,
    lastUpdatedAt: now,
    completedAt: null,
    currentRoundIndex: 0,
    currentRoundKey: 'khoi_dong',
    currentQuestionIndex: 0,
    scores: {
      khoi_dong: 0,
      tranh_tai: 0,
      ban_ket: 0,
      chung_ket: 0,
      keywordBonus: 0,
      total: 0
    },
    stats: {
      totalCorrect: 0,
      totalWrong: 0,
      totalTimeout: 0,
      totalQuestionsAnswered: 0,
      totalQuizTimeSpentMs: 0 // Tổng thời gian 40 câu trắc nghiệm (ms)
    },
    rounds: {
      khoi_dong: {
        roundKey: 'khoi_dong',
        name: 'Khởi động',
        pointPerQuestion: rules.pointsPerRound.khoi_dong,
        score: 0,
        correctCount: 0,
        wrongCount: 0,
        timeoutCount: 0,
        isCompleted: false,
        questions: r1Questions
      },
      tranh_tai: {
        roundKey: 'tranh_tai',
        name: 'Tranh tài',
        pointPerQuestion: rules.pointsPerRound.tranh_tai,
        score: 0,
        correctCount: 0,
        wrongCount: 0,
        timeoutCount: 0,
        isCompleted: false,
        questions: r2Questions
      },
      ban_ket: {
        roundKey: 'ban_ket',
        name: 'Bán kết',
        pointPerQuestion: rules.pointsPerRound.ban_ket,
        score: 0,
        correctCount: 0,
        wrongCount: 0,
        timeoutCount: 0,
        isCompleted: false,
        questions: r3Questions
      },
      chung_ket: {
        roundKey: 'chung_ket',
        name: 'Chung kết',
        pointPerQuestion: rules.pointsPerRound.chung_ket,
        crosswordId: crossword.id,
        crosswordTitle: crossword.title,
        keyword: crossword.keyword,
        normalizedKeyword: crossword.normalizedKeyword,
        score: 0,
        correctCount: 0,
        wrongCount: 0,
        timeoutCount: 0,
        isCompleted: false,
        questions: r4Questions,
        keywordGuess: {
          startedAt: null,
          deadlineAt: null,
          answeredAt: null,
          guessedWord: null,
          isCorrect: null,
          pointsAwarded: 0,
          timeSpentMs: 0
        }
      }
    }
  };

  // Lưu vào MongoDB
  try {
    await Attempt.create(newAttempt);
  } catch (err) {
    console.error('[GameService MongoDB Save Error]:', err.message);
  }

  await updateJson(PATHS.ATTEMPTS, (attempts = []) => {
    attempts.push(newAttempt);
    return attempts;
  }, []);

  return {
    isResume: false,
    attempt: sanitizeAttemptForClient(newAttempt)
  };
}

/**
 * Bắt đầu mở câu hỏi (Idempotent)
 */
export async function startQuestion(attemptId, playerId, roundKey, questionIndex) {
  let result = null;

  await updateJson(PATHS.ATTEMPTS, async (attempts = []) => {
    const attempt = attempts.find(a => a.attemptId === attemptId);
    if (!attempt) throw new Error('Không tìm thấy lượt chơi.');
    if (attempt.playerId !== playerId) throw new Error('Không có quyền truy cập lượt chơi này.');
    if (attempt.status !== 'in_progress') throw new Error('Lượt chơi đã kết thúc hoặc bị hủy.');

    const currentRound = attempt.rounds[roundKey];
    if (!currentRound) throw new Error(`Vòng chơi không hợp lệ: ${roundKey}`);
    if (attempt.currentRoundKey !== roundKey) throw new Error(`Hiện đang ở vòng ${attempt.currentRoundKey}`);

    const q = currentRound.questions[questionIndex];
    if (!q) throw new Error(`Câu hỏi không hợp lệ: ${questionIndex}`);

    // Idempotent: Nếu câu này chưa mở thì gán thời gian bắt đầu và deadline
    const now = Date.now();
    const timePerQuestionSeconds = attempt.rulesSnapshot?.timePerQuestionSeconds || 10;
    const timeLimitMs = timePerQuestionSeconds * 1000;

    if (!q.startedAt) {
      q.startedAt = now;
      q.deadlineAt = now + timeLimitMs;
      attempt.lastUpdatedAt = new Date().toISOString();
      attempt.currentQuestionIndex = questionIndex;

      // Đồng bộ vào MongoDB
      try {
        await Attempt.updateOne(
          { attemptId },
          {
            $set: {
              [`rounds.${roundKey}.questions.${questionIndex}.startedAt`]: q.startedAt,
              [`rounds.${roundKey}.questions.${questionIndex}.deadlineAt`]: q.deadlineAt,
              currentQuestionIndex: questionIndex,
              lastUpdatedAt: new Date(now)
            }
          }
        );
      } catch (_) {}
    }

    result = {
      roundKey,
      questionIndex,
      startedAt: q.startedAt,
      deadlineAt: q.deadlineAt,
      timeLimitSeconds: timePerQuestionSeconds,
      serverTime: now,
      question: {
        index: q.index,
        round: q.round,
        topic: q.topic,
        difficulty: q.difficulty,
        question: q.question,
        options: q.options
      }
    };

    return attempts;
  });

  return result;
}

/**
 * Nộp đáp án cho một câu hỏi (Idempotent)
 */
export async function submitAnswer(attemptId, playerId, roundKey, questionIndex, selectedOptionId, answerText) {
  let result = null;

  await updateJson(PATHS.ATTEMPTS, async (attempts = []) => {
    const attempt = attempts.find(a => a.attemptId === attemptId);
    if (!attempt) throw new Error('Không tìm thấy lượt chơi.');
    if (attempt.playerId !== playerId) throw new Error('Không có quyền truy cập lượt chơi này.');
    if (attempt.status !== 'in_progress') throw new Error('Lượt chơi đã kết thúc hoặc bị hủy.');

    const round = attempt.rounds[roundKey];
    if (!round) throw new Error(`Vòng không hợp lệ: ${roundKey}`);

    const q = round.questions[questionIndex];
    if (!q) throw new Error(`Câu hỏi không hợp lệ: ${questionIndex}`);
    if (!q.startedAt) throw new Error('Câu hỏi chưa được mở.');

    // Nếu đã nộp trước đó -> trả lại kết quả cũ (idempotent, không cộng điểm thêm)
    if (q.answeredAt !== null) {
      result = formatAnswerResponse(attempt, round, q, roundKey);
      return attempts;
    }

    const now = Date.now();
    const networkGracePeriod = 1500; // 1.5 giây độ trễ mạng tối đa
    const isOverdue = now > (q.deadlineAt + networkGracePeriod);
    const timePerQuestionSeconds = attempt.rulesSnapshot?.timePerQuestionSeconds || 10;
    const timeLimitMs = timePerQuestionSeconds * 1000;

    q.answeredAt = now;
    q.selectedOptionId = selectedOptionId || null;

    const hasOption = Boolean(selectedOptionId);
    const hasText = Boolean(answerText && typeof answerText === 'string' && answerText.trim());

    if (isOverdue || (!hasOption && !hasText)) {
      // Hết giờ hoặc không chọn/nhập đáp án
      q.isTimeout = true;
      q.isCorrect = false;
      q.timeSpentMs = timeLimitMs;
      q.pointsAwarded = 0;
      round.timeoutCount++;
      attempt.stats.totalTimeout++;
    } else {
      q.timeSpentMs = Math.min(timeLimitMs, Math.max(0, now - q.startedAt));
      let isRight = false;

      // 1. Kiểm tra đáp án trắc nghiệm
      if (hasOption && selectedOptionId === q.serverCorrectOptionId) {
        isRight = true;
      }

      // 2. Kiểm tra gõ đáp án ô chữ (tự động chuẩn hóa có dấu / không dấu)
      if (!isRight && hasText && q.normalizedAnswer) {
        const normUser = normalizeVietnamese(answerText);
        const normTarget = normalizeVietnamese(q.normalizedAnswer);
        if (normUser === normTarget) {
          isRight = true;
        }
      }

      q.isCorrect = isRight;
      q.isTimeout = false;

      if (isRight) {
        q.pointsAwarded = round.pointPerQuestion;
        round.correctCount++;
        attempt.stats.totalCorrect++;
      } else {
        q.pointsAwarded = 0;
        round.wrongCount++;
        attempt.stats.totalWrong++;
      }
    }

    // Cập nhật điểm và thống kê
    round.score += q.pointsAwarded;
    attempt.scores[roundKey] = round.score;
    attempt.scores.total = (
      attempt.scores.khoi_dong +
      attempt.scores.tranh_tai +
      attempt.scores.ban_ket +
      attempt.scores.chung_ket +
      attempt.scores.keywordBonus
    );

    attempt.stats.totalQuestionsAnswered++;
    attempt.stats.totalQuizTimeSpentMs += q.timeSpentMs;
    attempt.lastUpdatedAt = new Date().toISOString();

    // Kiểm tra đã hoàn thành các câu của vòng chưa
    const allAnswered = round.questions.every(item => item.answeredAt !== null);
    if (allAnswered || questionIndex === round.questions.length - 1) {
      round.isCompleted = true;
    }

    // Đồng bộ vào MongoDB
    try {
      await Attempt.updateOne(
        { attemptId },
        {
          $set: {
            [`rounds.${roundKey}.questions.${questionIndex}`]: q,
            [`rounds.${roundKey}.score`]: round.score,
            [`rounds.${roundKey}.correctCount`]: round.correctCount,
            [`rounds.${roundKey}.wrongCount`]: round.wrongCount,
            [`rounds.${roundKey}.timeoutCount`]: round.timeoutCount,
            scores: attempt.scores,
            stats: attempt.stats,
            lastUpdatedAt: new Date(now)
          }
        }
      );
    } catch (_) {}

    result = formatAnswerResponse(attempt, round, q, roundKey);
    return attempts;
  });

  return result;
}

/**
 * Chuyển sang vòng tiếp theo
 */
export async function advanceToNextRound(attemptId, playerId) {
  let updatedAttempt = null;

  await updateJson(PATHS.ATTEMPTS, async (attempts = []) => {
    const attempt = attempts.find(a => a.attemptId === attemptId);
    if (!attempt) throw new Error('Không tìm thấy lượt chơi.');
    if (attempt.playerId !== playerId) throw new Error('Không có quyền truy cập lượt chơi này.');
    if (attempt.status !== 'in_progress') throw new Error('Lượt chơi không trong trạng thái diễn ra.');

    const currentRound = attempt.rounds[attempt.currentRoundKey];
    if (!currentRound || !currentRound.isCompleted) {
      throw new Error('Bạn cần hoàn thành tất cả 10 câu của vòng hiện tại trước khi tiếp tục.');
    }

    if (attempt.currentRoundIndex < 3) {
      attempt.currentRoundIndex++;
      attempt.currentRoundKey = ROUND_KEYS[attempt.currentRoundIndex];
      attempt.currentQuestionIndex = 0;
      attempt.lastUpdatedAt = new Date().toISOString();

      try {
        await Attempt.updateOne(
          { attemptId },
          {
            $set: {
              [`rounds.${currentRound.roundKey}.isCompleted`]: true,
              currentRoundIndex: attempt.currentRoundIndex,
              currentRoundKey: attempt.currentRoundKey,
              currentQuestionIndex: 0,
              lastUpdatedAt: new Date()
            }
          }
        );
      } catch (_) {}
    }

    updatedAttempt = attempt;
    return attempts;
  });

  return sanitizeAttemptForClient(updatedAttempt);
}

/**
 * Bắt đầu đếm ngược 10 giây đoán từ khóa ô chữ Chung kết (Idempotent)
 */
export async function startKeywordGuess(attemptId, playerId) {
  let result = null;

  await updateJson(PATHS.ATTEMPTS, async (attempts = []) => {
    const attempt = attempts.find(a => a.attemptId === attemptId);
    if (!attempt) throw new Error('Không tìm thấy lượt chơi.');
    if (attempt.playerId !== playerId) throw new Error('Không có quyền truy cập.');
    if (attempt.status !== 'in_progress') throw new Error('Lượt chơi không hoạt động.');

    const ck = attempt.rounds.chung_ket;
    if (!ck) {
      throw new Error('Vòng Chung kết chưa sẵn sàng.');
    }

    const kg = ck.keywordGuess;
    const now = Date.now();
    const guessTimeSeconds = attempt.rulesSnapshot?.keywordGuessTimeSeconds || 10;
    const guessLimitMs = guessTimeSeconds * 1000;

    if (!kg.startedAt) {
      kg.startedAt = now;
      kg.deadlineAt = now + guessLimitMs;
      attempt.lastUpdatedAt = new Date().toISOString();

      try {
        await Attempt.updateOne(
          { attemptId },
          {
            $set: {
              'rounds.chung_ket.keywordGuess.startedAt': kg.startedAt,
              'rounds.chung_ket.keywordGuess.deadlineAt': kg.deadlineAt,
              lastUpdatedAt: new Date(now)
            }
          }
        );
      } catch (_) {}
    }

    result = {
      startedAt: kg.startedAt,
      deadlineAt: kg.deadlineAt,
      timeLimitSeconds: guessTimeSeconds,
      serverTime: now
    };

    return attempts;
  });

  return result;
}

/**
 * Gửi đáp án đoán từ khóa Chung kết
 */
export async function submitKeywordGuess(attemptId, playerId, guessText) {
  let result = null;

  await updateJson(PATHS.ATTEMPTS, async (attempts = []) => {
    const attempt = attempts.find(a => a.attemptId === attemptId);
    if (!attempt) throw new Error('Không tìm thấy lượt chơi.');
    if (attempt.playerId !== playerId) throw new Error('Không có quyền.');

    const ck = attempt.rounds.chung_ket;
    const kg = ck.keywordGuess;

    // Idempotent: Nếu đã submit rồi thì trả kết quả hoàn thành
    if (kg.answeredAt !== null || attempt.status === 'completed') {
      result = formatCompletedAttemptResponse(attempt);
      return attempts;
    }

    if (!kg.startedAt) {
      throw new Error('Chưa bắt đầu lượt đoán từ khóa.');
    }

    const now = Date.now();
    const networkGracePeriod = 1500;
    const isOverdue = now > (kg.deadlineAt + networkGracePeriod);
    const guessTimeSeconds = attempt.rulesSnapshot?.keywordGuessTimeSeconds || 10;
    const guessLimitMs = guessTimeSeconds * 1000;

    kg.answeredAt = now;
    kg.guessedWord = guessText?.trim() || '';
    kg.timeSpentMs = Math.min(guessLimitMs, Math.max(0, now - kg.startedAt));

    const normalizedGuess = normalizeVietnamese(guessText);
    const isMatch = !isOverdue && normalizedGuess === ck.normalizedKeyword;

    kg.isCorrect = isMatch;
    kg.pointsAwarded = isMatch ? 100 : 0;

    attempt.scores.keywordBonus = kg.pointsAwarded;
    attempt.scores.total = (
      attempt.scores.khoi_dong +
      attempt.scores.tranh_tai +
      attempt.scores.ban_ket +
      attempt.scores.chung_ket +
      attempt.scores.keywordBonus
    );

    // Nếu đoán đúng HOẶC đã trả lời hết các câu hỏi -> Hoàn thành toàn bộ game
    const allAnswered = ck.questions.every(q => q.answeredAt !== null);
    if (isMatch || allAnswered) {
      attempt.status = 'completed';
      attempt.completedAt = new Date().toISOString();
      attempt.lastUpdatedAt = attempt.completedAt;
      ck.isCompleted = true;

      // Nếu đoán đúng, mở toàn bộ các hàng còn lại
      if (isMatch) {
        ck.questions.forEach(q => {
          if (!q.answeredAt) {
            q.answeredAt = now;
            q.isCorrect = true;
          }
        });
      }
    }

    try {
      await Attempt.updateOne(
        { attemptId },
        {
          $set: {
            'rounds.chung_ket.keywordGuess': kg,
            'rounds.chung_ket.isCompleted': ck.isCompleted,
            status: attempt.status,
            completedAt: attempt.completedAt ? new Date(now) : null,
            lastUpdatedAt: new Date(now),
            scores: attempt.scores,
            stats: attempt.stats
          }
        }
      );
    } catch (_) {}

    result = formatCompletedAttemptResponse(attempt);
    return attempts;
  });

  return result;
}

/**
 * Format response sau khi trả lời câu hỏi
 */
function formatAnswerResponse(attempt, round, q, roundKey) {
  const resp = {
    roundKey,
    questionIndex: q.index,
    isCorrect: q.isCorrect,
    isTimeout: q.isTimeout,
    selectedOptionId: q.selectedOptionId,
    correctOptionId: q.serverCorrectOptionId,
    explanation: q.explanation,
    pointsAwarded: q.pointsAwarded,
    timeSpentMs: q.timeSpentMs,
    roundScore: round.score,
    totalScore: attempt.scores.total,
    isRoundCompleted: round.isCompleted
  };

  // Nếu là Chung kết: công bố chữ cái hàng ngang đã mở (nhưng chưa công bố cột dọc)
  if (roundKey === 'chung_ket') {
    resp.horizontalAnswer = q.horizontalAnswer;
    resp.normalizedAnswer = q.normalizedAnswer;
  }

  return resp;
}

/**
 * Format response sau khi kết thúc game hoàn chỉnh (được phép tiết lộ bí mật ô chữ)
 */
function formatCompletedAttemptResponse(attempt) {
  const ck = attempt.rounds.chung_ket;
  const kg = ck.keywordGuess;

  // Tiết lộ đầy đủ giải pháp ô chữ (vị trí trích xuất cột dọc)
  const fullCrosswordSolution = ck.questions.map(q => ({
    index: q.index,
    horizontalAnswer: q.horizontalAnswer,
    normalizedAnswer: q.normalizedAnswer,
    targetChar: q.targetChar,
    charIndex: q.charIndex
  }));

  return {
    isCompleted: true,
    attemptId: attempt.attemptId,
    scores: attempt.scores,
    stats: attempt.stats,
    keywordGuess: {
      guessedWord: kg.guessedWord,
      isCorrect: kg.isCorrect,
      pointsAwarded: kg.pointsAwarded,
      officialKeyword: ck.keyword,
      normalizedKeyword: ck.normalizedKeyword
    },
    crosswordSolution: fullCrosswordSolution,
    completedAt: attempt.completedAt
  };
}

/**
 * Lọc dữ liệu an toàn cho client khi đang chơi
 * Tuyệt đối không gửi đáp án đúng hoặc bí mật ô chữ!
 */
export function sanitizeAttemptForClient(attempt) {
  if (!attempt) return null;

  const isCompleted = (attempt.status === 'completed');
  const safeRounds = {};

  for (const rKey of ROUND_KEYS) {
    const r = attempt.rounds[rKey];
    if (!r) continue;

    const safeQuestions = r.questions.map(q => {
      const isAnswered = (q.answeredAt !== null);
      const safeQ = {
        index: q.index,
        round: q.round,
        topic: q.topic,
        difficulty: q.difficulty,
        question: q.question,
        options: q.options,
        isAnswered,
        isTimeout: q.isTimeout,
        startedAt: q.startedAt,
        deadlineAt: q.deadlineAt
      };

      if (isAnswered || isCompleted) {
        safeQ.selectedOptionId = q.selectedOptionId;
        safeQ.correctOptionId = q.serverCorrectOptionId;
        safeQ.isCorrect = q.isCorrect;
        safeQ.pointsAwarded = q.pointsAwarded;
        safeQ.timeSpentMs = q.timeSpentMs;
        safeQ.explanation = q.explanation;
        safeQ.source = q.source;

        if (rKey === 'chung_ket') {
          safeQ.horizontalAnswer = q.horizontalAnswer;
          safeQ.normalizedAnswer = q.normalizedAnswer;
          // Chỉ gửi cột dọc khi đã kết thúc toàn bộ game
          if (isCompleted) {
            safeQ.targetChar = q.targetChar;
            safeQ.charIndex = q.charIndex;
          }
        }
      }

      return safeQ;
    });

    safeRounds[rKey] = {
      roundKey: r.roundKey,
      name: r.name,
      pointPerQuestion: r.pointPerQuestion,
      score: r.score,
      correctCount: r.correctCount,
      wrongCount: r.wrongCount,
      timeoutCount: r.timeoutCount,
      isCompleted: r.isCompleted,
      questions: safeQuestions
    };

    if (rKey === 'chung_ket') {
      safeRounds.chung_ket.crosswordTitle = r.crosswordTitle;
      safeRounds.chung_ket.keywordLength = r.normalizedKeyword ? r.normalizedKeyword.length : r.questions.length;
      safeRounds.chung_ket.keywordGuess = {
        startedAt: r.keywordGuess.startedAt,
        deadlineAt: r.keywordGuess.deadlineAt,
        isGuessed: (r.keywordGuess.answeredAt !== null),
        isCorrect: r.keywordGuess.isCorrect
      };

      // Cung cấp layout ô chữ để client render chuẩn xác theo hình
      const centerCol = Math.max(...r.questions.map(q => q.charIndex !== undefined ? q.charIndex : 0));
      safeRounds.chung_ket.gridMetadata = {
        centerCol,
        rows: r.questions.map((q, idx) => ({
          index: idx,
          length: q.normalizedAnswer ? q.normalizedAnswer.length : 7,
          startCol: centerCol - (q.charIndex !== undefined ? q.charIndex : 0),
          targetColOffset: (q.charIndex !== undefined ? q.charIndex : 0)
        }))
      };

      if (isCompleted) {
        safeRounds.chung_ket.officialKeyword = r.keyword;
        safeRounds.chung_ket.normalizedKeyword = r.normalizedKeyword;
        safeRounds.chung_ket.keywordGuessResult = r.keywordGuess;
      }
    }
  }

  return {
    attemptId: attempt.attemptId,
    playerId: attempt.playerId,
    seasonId: attempt.seasonId,
    seasonName: attempt.seasonName,
    status: attempt.status,
    currentRoundIndex: attempt.currentRoundIndex,
    currentRoundKey: attempt.currentRoundKey,
    currentQuestionIndex: attempt.currentQuestionIndex,
    scores: attempt.scores,
    stats: attempt.stats,
    createdAt: attempt.createdAt,
    completedAt: attempt.completedAt,
    rounds: safeRounds
  };
}
