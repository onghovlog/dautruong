import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import AdminConfig from '../models/AdminConfig.js';
import { readJson, PATHS } from '../storage/jsonStore.js';

const ADMIN_SESSIONS = new Map(); // token -> { username, expiresAt }
const LOGIN_RATE_LIMIT = new Map(); // ip -> { count, resetAt }

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Đăng nhập quản trị viên
 */
export async function adminLogin(username, password, clientIp = 'global') {
  const now = Date.now();
  const rate = LOGIN_RATE_LIMIT.get(clientIp) || { count: 0, resetAt: now + 15 * 60 * 1000 };
  if (rate.resetAt < now) {
    rate.count = 0;
    rate.resetAt = now + 15 * 60 * 1000;
  }
  if (rate.count >= 5) {
    const waitMins = Math.ceil((rate.resetAt - now) / 60000);
    throw new Error(`Đăng nhập sai quá 5 lần. Vui lòng thử lại sau ${waitMins} phút.`);
  }

  let adminConfig = await AdminConfig.findOne({ username: username?.trim() }).lean();
  if (!adminConfig) {
    adminConfig = await AdminConfig.findOne({}).lean();
  }
  if (!adminConfig) {
    adminConfig = await readJson(PATHS.ADMIN);
  }
  if (!adminConfig) {
    throw new Error('Chưa cấu hình tài khoản quản trị viên.');
  }

  const isUserValid = adminConfig.username === username?.trim();
  const isPassValid = isUserValid ? await bcrypt.compare(password || '', adminConfig.passwordHash) : false;

  if (!isUserValid || !isPassValid) {
    rate.count++;
    LOGIN_RATE_LIMIT.set(clientIp, rate);
    throw new Error('Tên đăng nhập hoặc mật khẩu quản trị không chính xác.');
  }

  // Đăng nhập thành công -> xóa rate limit
  LOGIN_RATE_LIMIT.delete(clientIp);

  const token = generateToken();
  const expiresAt = now + 12 * 60 * 60 * 1000; // 12 giờ
  ADMIN_SESSIONS.set(token, { username: adminConfig.username, expiresAt });

  return { token, username: adminConfig.username };
}

/**
 * Kiểm tra session Admin
 */
export function verifyAdminSession(token) {
  if (!token) return null;
  const session = ADMIN_SESSIONS.get(token);
  if (!session || session.expiresAt < Date.now()) {
    if (session) ADMIN_SESSIONS.delete(token);
    return null;
  }
  return session;
}

/**
 * Đăng xuất Admin
 */
export function adminLogout(token) {
  if (token) {
    ADMIN_SESSIONS.delete(token);
  }
}

/**
 * Middleware bảo vệ các API Admin
 */
export function requireAdminMiddleware(req, res, next) {
  const token = req.cookies?.admin_token;
  const session = verifyAdminSession(token);
  if (!session) {
    return res.status(401).json({ error: 'Yêu cầu quyền Quản trị viên (Admin). Vui lòng đăng nhập.' });
  }
  req.admin = session;
  next();
}
