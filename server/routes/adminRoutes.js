import express from 'express';
import { adminLogin, adminLogout, verifyAdminSession, requireAdminMiddleware } from '../auth/adminAuth.js';
import {
  getAdminQuestions,
  saveQuestion,
  deleteQuestion,
  getAllSeasons,
  createSeason,
  setActiveSeason,
  searchPlayers,
  getPlayerAttempts,
  disqualifyAttempt,
  reinstateAttempt,
  getSystemStats,
  exportLeaderboardToCsv,
  getAuditLogs,
  updateActiveSeasonTimer
} from '../services/adminService.js';
import {
  getAllCrosswords,
  generateCrosswordSet,
  saveCrosswordSet,
  deleteCrosswordSet,
  rerollCrosswordRow
} from '../services/crosswordService.js';
import { getLeaderboard } from '../services/leaderboardService.js';
import { getActiveSeason } from '../services/gameService.js';

const router = express.Router();

/**
 * Đăng nhập Admin
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const clientIp = req.ip || req.connection.remoteAddress || 'global';
    const { token } = await adminLogin(username, password, clientIp);

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('admin_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd,
      maxAge: 12 * 60 * 60 * 1000 // 12 giờ
    });

    res.json({ success: true, message: 'Đăng nhập quản trị viên thành công.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Đăng xuất Admin
 */
router.post('/logout', (req, res) => {
  const token = req.cookies?.admin_token;
  if (token) {
    adminLogout(token);
  }
  res.clearCookie('admin_token');
  res.json({ success: true, message: 'Đã đăng xuất.' });
});

/**
 * Kiểm tra phiên Admin
 */
router.get('/me', (req, res) => {
  const token = req.cookies?.admin_token;
  const session = verifyAdminSession(token);
  if (!session) {
    return res.status(401).json({ authenticated: false });
  }
  res.json({ authenticated: true, username: session.username });
});

// ================= TẤT CẢ ROUTE DƯỚI ĐÂY YÊU CẦU QUYỀN ADMIN =================
router.use(requireAdminMiddleware);

/**
 * Thống kê tổng quan hệ thống
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await getSystemStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Quản lý câu hỏi
 */
router.get('/questions', async (req, res) => {
  try {
    const { round = 'khoi_dong', difficulty, topic, search } = req.query;
    const questions = await getAdminQuestions(round, { difficulty, topic, search });
    res.json({ round, count: questions.length, questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/questions', async (req, res) => {
  try {
    const saved = await saveQuestion(req.body, req.admin.username);
    res.json({ success: true, question: saved });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/questions/:roundKey/:id', async (req, res) => {
  try {
    const { roundKey, id } = req.params;
    await deleteQuestion(roundKey, id, req.admin.username);
    res.json({ success: true, message: `Đã xóa câu hỏi ${id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Quản lý Bộ ô chữ Chung kết
 */
router.get('/crosswords', async (req, res) => {
  try {
    const list = await getAllCrosswords();
    res.json({ crosswords: list });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/crosswords/generate', async (req, res) => {
  try {
    const { keyword, title } = req.body;
    if (!keyword) {
      return res.status(400).json({ error: 'Vui lòng cung cấp từ khóa.' });
    }
    const generated = await generateCrosswordSet(keyword, title);
    res.json({ success: true, crossword: generated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/crosswords/save', async (req, res) => {
  try {
    const saved = await saveCrosswordSet(req.body);
    res.json({ success: true, crossword: saved });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/crosswords/reroll-row', async (req, res) => {
  try {
    const { crosswordId, rowIndex } = req.body;
    const updated = await rerollCrosswordRow(crosswordId, Number(rowIndex));
    res.json({ success: true, crossword: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/crosswords/:id', async (req, res) => {
  try {
    await deleteCrosswordSet(req.params.id);
    res.json({ success: true, message: 'Đã xóa bộ ô chữ.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Quản lý Mùa giải
 */
router.get('/seasons', async (req, res) => {
  try {
    const seasons = await getAllSeasons();
    res.json({ seasons });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/seasons', async (req, res) => {
  try {
    const created = await createSeason(req.body, req.admin.username);
    res.json({ success: true, season: created });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/seasons/:id/activate', async (req, res) => {
  try {
    await setActiveSeason(req.params.id, req.admin.username);
    res.json({ success: true, message: `Đã kích hoạt mùa giải ${req.params.id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Cài đặt thời gian đếm ngược (countdown) câu hỏi và từ khóa cho Admin
 */
router.get('/settings/timer', async (req, res) => {
  try {
    const season = await getActiveSeason();
    res.json({
      timePerQuestionSeconds: season.rules?.timePerQuestionSeconds || 10,
      keywordGuessTimeSeconds: season.rules?.keywordGuessTimeSeconds || 10,
      seasonName: season.name
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/settings/timer', async (req, res) => {
  try {
    const { timePerQuestionSeconds, keywordGuessTimeSeconds } = req.body;
    const updated = await updateActiveSeasonTimer({ timePerQuestionSeconds, keywordGuessTimeSeconds }, req.admin.username);
    res.json({
      success: true,
      message: `Đã cập nhật thời gian đếm ngược: ${updated.rules.timePerQuestionSeconds}s/câu hỏi!`,
      rules: updated.rules
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Quản lý Người chơi & Lượt chơi
 */
router.get('/players', async (req, res) => {
  try {
    const { search } = req.query;
    const players = await searchPlayers(search);
    res.json({ count: players.length, players });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/players/:playerId/attempts', async (req, res) => {
  try {
    const attempts = await getPlayerAttempts(req.params.playerId);
    res.json({ attempts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/attempts/:id/disqualify', async (req, res) => {
  try {
    const { reason } = req.body;
    const updated = await disqualifyAttempt(req.params.id, reason, req.admin.username);
    res.json({ success: true, attempt: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/attempts/:id/reinstate', async (req, res) => {
  try {
    const updated = await reinstateAttempt(req.params.id, req.admin.username);
    res.json({ success: true, attempt: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Xuất dữ liệu Bảng Xếp Hạng sang CSV UTF-8 có BOM
 */
router.get('/export/csv', async (req, res) => {
  try {
    const { seasonId, timeRange = 'all' } = req.query;
    let targetSeason = seasonId;
    if (!targetSeason) {
      const active = await getActiveSeason();
      targetSeason = active.id;
    }

    const leaderboard = await getLeaderboard(targetSeason, timeRange);
    const csvData = exportLeaderboardToCsv(leaderboard.items);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="BangXepHang_${targetSeason}_${timeRange}.csv"`);
    res.send(csvData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Xem Audit Logs
 */
router.get('/audit-logs', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 100;
    const logs = await getAuditLogs(limit);
    res.json({ logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
