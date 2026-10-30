import crypto from 'crypto';
import { readJson, updateJson, PATHS } from '../server/storage/jsonStore.js';
import { getActiveSeason } from '../server/services/gameService.js';
import { connectDB, disconnectDB } from '../server/db/mongo.js';
import Player from '../server/models/Player.js';
import Attempt from '../server/models/Attempt.js';

async function main() {
  const isClear = process.argv.includes('--clear');

  let isMongoConnected = false;
  try {
    await connectDB();
    isMongoConnected = true;
  } catch (_) {}

  if (isClear) {
    console.log("Đang xóa toàn bộ dữ liệu demo...");
    if (isMongoConnected) {
      await Player.deleteMany({ isDemo: true });
      await Attempt.deleteMany({ isDemo: true });
    }
    await updateJson(PATHS.PLAYERS, (players = []) => {
      return players.filter(p => !p.isDemo);
    });
    await updateJson(PATHS.ATTEMPTS, (attempts = []) => {
      return attempts.filter(a => !a.isDemo);
    });
    console.log("✓ Đã xóa sạch dữ liệu demo an toàn.");
    if (isMongoConnected) await disconnectDB();
    return;
  }

  console.log("Đang tạo 6 hồ sơ và kết quả mẫu (demo) cho sinh viên FPT Polytechnic...");
  const season = await getActiveSeason();

  const demoStudents = [
    { name: "Nguyễn Văn An", studentId: "PH28451", class: "WD18301", score: 1040, correct: 38, timeMs: 142000, bonus: 100 },
    { name: "Trần Thị Mai Linh", studentId: "PH29104", class: "GD18302", score: 980, correct: 36, timeMs: 156000, bonus: 100 },
    { name: "Lê Hoàng Long", studentId: "PH30122", class: "WD18303", score: 920, correct: 34, timeMs: 168000, bonus: 100 },
    { name: "Phạm Minh Đức", studentId: "PH31209", class: "LTMT18301", score: 850, correct: 32, timeMs: 185000, bonus: 0 },
    { name: "Vũ Phương Thảo", studentId: "PH30988", class: "PR18301", score: 780, correct: 29, timeMs: 210000, bonus: 0 },
    { name: "Đặng Tuấn Kiệt", studentId: "PH27663", class: "WD18302", score: 720, correct: 27, timeMs: 235000, bonus: 0 }
  ];

  const now = new Date();

  for (let i = 0; i < demoStudents.length; i++) {
    const s = demoStudents[i];
    const playerId = 'ply_demo_' + (i + 1);
    const attemptId = 'att_demo_' + (i + 1);

    const completionDate = new Date(now.getTime() - (i * 2 + 1) * 3600000);

    const newPlayer = {
      playerId,
      displayName: s.name,
      studentId: s.studentId,
      studentClass: s.class,
      publicClass: true,
      recoveryCodeHash: crypto.createHash('sha256').update(`DEMO${i}`).digest('hex'),
      recoveryCodeAttempts: 0,
      recoveryCodeLockedUntil: null,
      createdAt: completionDate,
      lastActiveAt: completionDate,
      isDemo: true
    };

    const newAttempt = {
      attemptId,
      playerId,
      seasonId: season.id,
      seasonName: season.name,
      status: 'completed',
      isDisqualified: false,
      disqualifiedReason: '',
      isDemo: true,
      createdAt: completionDate,
      startedAt: completionDate,
      lastUpdatedAt: completionDate,
      completedAt: completionDate,
      currentRoundIndex: 3,
      currentRoundKey: 'chung_ket',
      currentQuestionIndex: 9,
      scores: {
        khoi_dong: 90,
        tranh_tai: 180,
        ban_ket: 270,
        chung_ket: s.score - 90 - 180 - 270 - s.bonus,
        keywordBonus: s.bonus,
        total: s.score
      },
      stats: {
        totalCorrect: s.correct,
        totalWrong: 40 - s.correct,
        totalTimeout: 0,
        totalQuestionsAnswered: 40,
        totalQuizTimeSpentMs: s.timeMs
      }
    };

    if (isMongoConnected) {
      await Player.findOneAndUpdate({ playerId }, newPlayer, { upsert: true });
      await Attempt.findOneAndUpdate({ attemptId }, newAttempt, { upsert: true });
    }

    await updateJson(PATHS.PLAYERS, (players = []) => {
      if (!players.some(p => p.playerId === playerId)) {
        players.push(newPlayer);
      }
      return players;
    });

    await updateJson(PATHS.ATTEMPTS, (attempts = []) => {
      if (!attempts.some(a => a.attemptId === attemptId)) {
        attempts.push(newAttempt);
      }
      return attempts;
    });
  }

  if (isMongoConnected) {
    await disconnectDB();
  }

  console.log("✓ Tạo thành công 6 kết quả demo vào Bảng Xếp Hạng (MongoDB & Backup).");
  console.log("  Để xóa dữ liệu demo, chạy: npm run seed-demo -- --clear");
}

main().catch(console.error);
