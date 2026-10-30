import express from 'express';
import {
  createPlayer,
  getPlayerByToken,
  recoverPlayer,
  regenerateRecoveryCode,
  updatePlayerProfile,
  revokeSession,
  sanitizePlayerProfile
} from '../auth/playerAuth.js';

const router = express.Router();

// Middleware xác thực người chơi từ cookie
export async function playerAuthMiddleware(req, res, next) {
  const token = req.cookies?.player_token;
  if (!token) {
    return res.status(401).json({ error: 'Chưa xác thực người chơi. Vui lòng nhập tên để bắt đầu.' });
  }

  const player = await getPlayerByToken(token);
  if (!player) {
    res.clearCookie('player_token');
    return res.status(401).json({ error: 'Phiên người chơi đã hết hạn hoặc không hợp lệ.' });
  }

  req.player = player;
  req.playerToken = token;
  next();
}

/**
 * Đăng ký người chơi mới
 */
router.post('/register', async (req, res) => {
  try {
    const { displayName, studentId, studentClass, publicClass } = req.body;
    const { player, rawRecoveryCode, sessionToken } = await createPlayer(
      displayName,
      studentId,
      studentClass,
      publicClass
    );

    // Đặt cookie HttpOnly bảo mật
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('player_token', sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd,
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 ngày
    });

    res.json({
      success: true,
      player,
      recoveryCode: rawRecoveryCode,
      message: 'Tạo hồ sơ thành công! Hãy lưu lại mã khôi phục để dùng trên thiết bị khác.'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Lấy hồ sơ người chơi hiện tại
 */
router.get('/me', playerAuthMiddleware, (req, res) => {
  res.json({
    player: sanitizePlayerProfile(req.player, true)
  });
});

/**
 * Cập nhật hồ sơ người chơi hiện tại
 */
router.put('/me', playerAuthMiddleware, async (req, res) => {
  try {
    const { displayName, studentId, studentClass, publicClass } = req.body;
    const updated = await updatePlayerProfile(req.player.playerId, {
      displayName,
      studentId,
      studentClass,
      publicClass
    });
    res.json({ success: true, player: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Khôi phục hồ sơ bằng mã khôi phục
 */
router.post('/recover', async (req, res) => {
  try {
    const { recoveryCode } = req.body;
    const clientIp = req.ip || req.connection.remoteAddress || 'global';
    const { player, sessionToken } = await recoverPlayer(recoveryCode, clientIp);

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('player_token', sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      player,
      message: 'Khôi phục hồ sơ thành công!'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Cấp lại mã khôi phục mới
 */
router.post('/regenerate-recovery-code', playerAuthMiddleware, async (req, res) => {
  try {
    const { rawRecoveryCode, player } = await regenerateRecoveryCode(req.player.playerId);
    res.json({
      success: true,
      recoveryCode: rawRecoveryCode,
      player,
      message: 'Đã cấp mã khôi phục mới. Mã cũ đã vô hiệu hóa.'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Đổi người chơi trên thiết bị dùng chung (kết thúc phiên hiện tại)
 */
router.post('/switch', (req, res) => {
  const token = req.cookies?.player_token;
  if (token) {
    revokeSession(token);
  }
  res.clearCookie('player_token');
  res.json({
    success: true,
    message: 'Đã kết thúc phiên người chơi trên thiết bị này.'
  });
});

export default router;
