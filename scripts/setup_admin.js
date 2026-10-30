import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { writeJson, PATHS } from '../server/storage/jsonStore.js';
import { connectDB, disconnectDB } from '../server/db/mongo.js';
import AdminConfig from '../server/models/AdminConfig.js';

dotenv.config();

async function setupAdmin() {
  const username = process.argv[2] || process.env.ADMIN_USERNAME || 'admin';
  const password = process.argv[3] || process.env.ADMIN_PASSWORD || 'AdminPoly@2026';

  console.log(`Đang cấu hình tài khoản Admin: [${username}]...`);
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const adminConfig = {
    username,
    passwordHash,
    role: 'admin',
    updatedAt: new Date().toISOString()
  };

  try {
    await connectDB();
    await AdminConfig.findOneAndUpdate(
      { username },
      { username, passwordHash },
      { upsert: true }
    );
    console.log(`✓ Đã lưu tài khoản Admin vào MongoDB Atlas.`);
    await disconnectDB();
  } catch (err) {
    console.warn(`⚠️ Không thể cập nhật vào MongoDB lúc này:`, err.message);
  }

  await writeJson(PATHS.ADMIN, adminConfig);
  console.log(`✓ Đã cập nhật thành công tài khoản Admin.`);
  console.log(`  Tài khoản: ${username}`);
  console.log(`  Mật khẩu:  ${password}`);
}

setupAdmin().catch(console.error);
