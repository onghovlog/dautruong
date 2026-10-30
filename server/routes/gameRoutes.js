import express from 'express';
import { playerAuthMiddleware } from './playerRoutes.js';
import {
  createAttempt,
  getActiveAttemptByPlayer,
  startQuestion,
  submitAnswer,
  advanceToNextRound,
  startKeywordGuess,
  submitKeywordGuess,
  getAttemptById,
  getAllAttempts,
  sanitizeAttemptForClient
} from '../services/gameService.js';

const router = express.Router();

/**
 * Lấy lượt chơi đang diễn ra của người chơi hiện tại
 */
router.get('/current', playerAuthMiddleware, async (req, res) => {
  try {
    const active = await getActiveAttemptByPlayer(req.player.playerId);
    if (!active) {
      return res.json({ hasActive: false, attempt: null });
    }
    res.json({
      hasActive: true,
      attempt: sanitizeAttemptForClient(active)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Bắt đầu một lượt chơi mới (hoặc tiếp tục lượt dở)
 */
router.post('/start', playerAuthMiddleware, async (req, res) => {
  try {
    const { forceNew } = req.body;
    const result = await createAttempt(req.player.playerId, Boolean(forceNew));
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Mở câu hỏi và kích hoạt đồng hồ 10 giây phía server (Idempotent)
 */
router.post('/start-question', playerAuthMiddleware, async (req, res) => {
  try {
    const { attemptId, roundKey, questionIndex } = req.body;
    if (!attemptId || !roundKey || questionIndex === undefined) {
      return res.status(400).json({ error: 'Thiếu thông số bắt đầu câu hỏi.' });
    }

    const data = await startQuestion(attemptId, req.player.playerId, roundKey, Number(questionIndex));
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Gửi đáp án cho một câu hỏi (Idempotent)
 */
router.post('/submit-answer', playerAuthMiddleware, async (req, res) => {
  try {
    const { attemptId, roundKey, questionIndex, selectedOptionId, answerText } = req.body;
    if (!attemptId || !roundKey || questionIndex === undefined) {
      return res.status(400).json({ error: 'Thiếu thông số câu hỏi.' });
    }

    const result = await submitAnswer(
      attemptId,
      req.player.playerId,
      roundKey,
      Number(questionIndex),
      selectedOptionId,
      answerText
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Chuyển sang vòng tiếp theo
 */
router.post('/next-round', playerAuthMiddleware, async (req, res) => {
  try {
    const { attemptId } = req.body;
    if (!attemptId) {
      return res.status(400).json({ error: 'Thiếu attemptId.' });
    }

    const updated = await advanceToNextRound(attemptId, req.player.playerId);
    res.json({ success: true, attempt: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Bắt đầu đếm ngược 10 giây đoán từ khóa Chung kết (Idempotent)
 */
router.post('/start-keyword', playerAuthMiddleware, async (req, res) => {
  try {
    const { attemptId } = req.body;
    if (!attemptId) {
      return res.status(400).json({ error: 'Thiếu attemptId.' });
    }

    const result = await startKeywordGuess(attemptId, req.player.playerId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Nộp đáp án đoán từ khóa Chung kết
 */
router.post('/submit-keyword', playerAuthMiddleware, async (req, res) => {
  try {
    const { attemptId, guessText } = req.body;
    if (!attemptId) {
      return res.status(400).json({ error: 'Thiếu attemptId.' });
    }

    const result = await submitKeywordGuess(attemptId, req.player.playerId, guessText);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Xem lịch sử các lượt chơi của người chơi hiện tại
 */
router.get('/history', playerAuthMiddleware, async (req, res) => {
  try {
    const allAttempts = await getAllAttempts();
    const myAttempts = allAttempts
      .filter(a => a.playerId === req.player.playerId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(a => ({
        attemptId: a.attemptId,
        seasonName: a.seasonName,
        status: a.status,
        scores: a.scores,
        stats: a.stats,
        isDisqualified: a.isDisqualified,
        createdAt: a.createdAt,
        completedAt: a.completedAt,
        keywordBonus: a.scores.keywordBonus
      }));

    res.json({ attempts: myAttempts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Xem chi tiết 1 lượt chơi cụ thể
 */
router.get('/attempts/:attemptId', playerAuthMiddleware, async (req, res) => {
  try {
    const attempt = await getAttemptById(req.params.attemptId);
    if (!attempt) {
      return res.status(404).json({ error: 'Không tìm thấy lượt chơi.' });
    }
    if (attempt.playerId !== req.player.playerId) {
      return res.status(403).json({ error: 'Bạn không có quyền xem lượt chơi của người khác.' });
    }

    res.json({ attempt: sanitizeAttemptForClient(attempt) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
