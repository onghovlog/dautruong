import dotenv from 'dotenv';
import app from './server/app.js';
import { connectDB } from './server/db/mongo.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
  } catch (err) {
    console.error('⚠️ Khởi động server với chế độ dự phòng do lỗi kết nối MongoDB:', err.message);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log('====================================================');
    console.log(`🚀 ĐẤU TRƯỜNG NGÔN NGỮ - FPT POLYTECHNIC`);
    console.log(`🍃 Cơ sở dữ liệu: MongoDB Atlas`);
    console.log(`📍 Máy chủ đang chạy tại: http://localhost:${PORT}`);
    console.log(`🛠️  Trang quản trị Admin: http://localhost:${PORT}/admin`);
    console.log(`📱 Mạng LAN (cùng Wi-Fi): http://<địa_chỉ_IP_máy>:${PORT}`);
    console.log(`⏰ Múi giờ hệ thống: ${process.env.TIMEZONE || 'Asia/Ho_Chi_Minh'}`);
    console.log('====================================================');
  });
}

startServer();
