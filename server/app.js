import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import playerRoutes from './routes/playerRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const app = express();

// Security headers cơ bản
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Middleware xử lý JSON và Cookie
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'dau_truong_ngon_ngu_poly'));

// Phục vụ tài nguyên tĩnh Frontend từ thư mục public (KHÔNG phục vụ thư mục data!)
app.use(express.static(PUBLIC_DIR, {
  maxAge: '1h',
  index: false
}));

// API Routes
app.use('/api/player', playerRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/admin', adminRoutes);

// Phục vụ trang Admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'admin.html'));
});

// Trang chủ SPA (Single Page Application)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint API không tồn tại.' });
  }
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Đã xảy ra lỗi máy chủ nội bộ. Vui lòng thử lại sau.'
  });
});

export default app;
