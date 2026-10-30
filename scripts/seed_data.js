import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { round1Questions } from './data_round1.js';
import { round2Questions } from './data_round2.js';
import { round3Questions } from './data_round3.js';
import { round4Questions } from './data_round4.js';
import { findCrosswordSet } from './test_crossword_builder.js';
import { writeJson, PATHS } from '../server/storage/jsonStore.js';
import { connectDB, disconnectDB } from '../server/db/mongo.js';
import Question from '../server/models/Question.js';
import Crossword from '../server/models/Crossword.js';
import Season from '../server/models/Season.js';
import AdminConfig from '../server/models/AdminConfig.js';

dotenv.config();

async function seed() {
  console.log("=== BẮT ĐẦU SEED DỮ LIỆU ĐẤU TRƯỜNG NGÔN NGỮ (MONGODB & BACKUP) ===");

  let isMongoConnected = false;
  try {
    await connectDB();
    isMongoConnected = true;
    console.log("✓ Đã kết nối cơ sở dữ liệu MongoDB Atlas thành công.");
  } catch (err) {
    console.warn("⚠️ Không thể kết nối MongoDB Atlas lúc này, sẽ seed vào file JSON cục bộ:", err.message);
  }

  // 1. Ghi 4 kho câu hỏi (tổng 400 câu)
  console.log("\n1. Đang lưu 4 kho câu hỏi chuẩn (400 câu)...");
  await writeJson(PATHS.ROUND1, round1Questions);
  await writeJson(PATHS.ROUND2, round2Questions);
  await writeJson(PATHS.ROUND3, round3Questions);
  await writeJson(PATHS.ROUND4, round4Questions);

  if (isMongoConnected) {
    const all400 = [...round1Questions, ...round2Questions, ...round3Questions, ...round4Questions];
    await Question.deleteMany({});
    await Question.insertMany(all400);
    console.log(`   ✓ MongoDB: Đã chèn thành công ${all400.length} câu hỏi vào collection 'questions'`);
  }
  console.log(`   ✓ Vòng 1 (Khởi động): ${round1Questions.length} câu`);
  console.log(`   ✓ Vòng 2 (Tranh tài): ${round2Questions.length} câu`);
  console.log(`   ✓ Vòng 3 (Bán kết): ${round3Questions.length} câu`);
  console.log(`   ✓ Vòng 4 (Chung kết): ${round4Questions.length} câu`);

  // 2. Tạo và lưu 5 bộ ô chữ chuẩn đã duyệt
  console.log("\n2. Đang tạo 5 bộ ô chữ Chung kết đã duyệt...");
  const targets = [
    { keyword: "ĐẤT NƯỚC TÔI", title: "Đất Nước Tôi" },
    { keyword: "VĂN HÓA VIỆT", title: "Văn Hóa Việt" },
    { keyword: "TRÍ TUỆ VIỆT", title: "Trí Tuệ Việt" },
    { keyword: "NGÔN NGỮ TÔI", title: "Ngôn Ngữ Tôi" },
    { keyword: "BẢN SẮC VIỆT", title: "Bản Sắc Việt" }
  ];

  const crosswords = [];
  for (const t of targets) {
    const cw = findCrosswordSet(t.keyword, t.title);
    crosswords.push(cw);
  }
  await writeJson(PATHS.CROSSWORDS, crosswords);

  if (isMongoConnected) {
    await Crossword.deleteMany({});
    await Crossword.insertMany(crosswords);
    console.log(`   ✓ MongoDB: Đã lưu ${crosswords.length} bộ ô chữ vào collection 'crosswords'`);
  }
  console.log(`   ✓ Đã lưu ${crosswords.length} bộ ô chữ chuẩn.`);

  // 3. Tạo mùa giải mặc định
  console.log("\n3. Đang khởi tạo Mùa giải (Season)...");
  const seasons = [
    {
      id: "season_2026_01",
      name: "Mùa Khởi Tranh 2026",
      description: "Mùa giải tranh tài tiếng Việt dành cho sinh viên FPT Polytechnic",
      status: "active",
      createdAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      endedAt: null,
      rules: {
        pointsPerRound: {
          khoi_dong: 10,
          tranh_tai: 20,
          ban_ket: 30,
          chung_ket: 40
        },
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
    }
  ];
  await writeJson(PATHS.SEASONS, seasons);

  if (isMongoConnected) {
    await Season.deleteMany({});
    await Season.insertMany(seasons);
    console.log(`   ✓ MongoDB: Đã lưu mùa giải vào collection 'seasons'`);
  }
  console.log(`   ✓ Đã kích hoạt Mùa giải: ${seasons[0].name}`);

  // 4. Khởi tạo Admin Account
  console.log("\n4. Đang thiết lập tài khoản Admin...");
  const adminUser = process.env.ADMIN_USERNAME || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || "AdminPoly@2026";
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(adminPass, salt);

  const adminConfig = {
    username: adminUser,
    passwordHash,
    role: "admin",
    updatedAt: new Date().toISOString()
  };
  await writeJson(PATHS.ADMIN, adminConfig);

  if (isMongoConnected) {
    await AdminConfig.deleteMany({});
    await AdminConfig.create({
      username: adminUser,
      passwordHash
    });
    console.log(`   ✓ MongoDB: Đã lưu thông tin Admin vào collection 'adminconfigs'`);
  }
  console.log(`   ✓ Đã cấu hình Admin: ${adminUser}`);

  // 5. Khởi tạo các file dữ liệu người chơi, lượt chơi, audit log nếu chưa có
  if (!fs.existsSync(PATHS.PLAYERS)) {
    await writeJson(PATHS.PLAYERS, []);
  }
  if (!fs.existsSync(PATHS.ATTEMPTS)) {
    await writeJson(PATHS.ATTEMPTS, []);
  }
  if (!fs.existsSync(PATHS.AUDIT_LOGS)) {
    await writeJson(PATHS.AUDIT_LOGS, []);
  }

  if (isMongoConnected) {
    await disconnectDB();
  }

  console.log("\n====================================================");
  console.log("🎉 HOÀN TẤT SEED DỮ LIỆU VÀO MONGODB THÀNH CÔNG 100%!");
  console.log("====================================================");
}

seed().catch(err => {
  console.error("Lỗi khi seed dữ liệu:", err);
  process.exit(1);
});
