import test, { after } from 'node:test';
import assert from 'node:assert';
import { connectDB, disconnectDB } from '../server/db/mongo.js';
import Attempt from '../server/models/Attempt.js';
import { getLeaderboard } from '../server/services/leaderboardService.js';
import { getActiveSeason } from '../server/services/gameService.js';
import { updateJson, PATHS } from '../server/storage/jsonStore.js';

after(async () => {
  await disconnectDB();
});

test('Kiểm tra bảng xếp hạng: tiêu chí ưu tiên, mỗi người 1 lượt tốt nhất, đồng hạng 1, 2, 2, 4', async () => {
  await connectDB();
  const season = await getActiveSeason();

  // Tạo mock dữ liệu các lượt chơi hoàn thành trong cùng mùa giải
  const mockAttempts = [
    // Người A: 1000 điểm, đúng 36 câu, thời gian 150.000ms
    {
      attemptId: 'test_att_A1',
      playerId: 'test_ply_A',
      seasonId: season.id,
      status: 'completed',
      isDisqualified: false,
      completedAt: new Date().toISOString(),
      scores: { total: 1000 },
      stats: { totalCorrect: 36, totalQuizTimeSpentMs: 150000 }
    },
    // Người A (lượt thứ 2 của A): 1050 điểm, đúng 38 câu -> phải chọn lượt này!
    {
      attemptId: 'test_att_A2',
      playerId: 'test_ply_A',
      seasonId: season.id,
      status: 'completed',
      isDisqualified: false,
      completedAt: new Date().toISOString(),
      scores: { total: 1050 },
      stats: { totalCorrect: 38, totalQuizTimeSpentMs: 140000 }
    },
    // Người B: 1050 điểm, đúng 38 câu, thời gian 140.000ms -> bằng hệt A2 => Đồng hạng 1!
    {
      attemptId: 'test_att_B',
      playerId: 'test_ply_B',
      seasonId: season.id,
      status: 'completed',
      isDisqualified: false,
      completedAt: new Date().toISOString(),
      scores: { total: 1050 },
      stats: { totalCorrect: 38, totalQuizTimeSpentMs: 140000 }
    },
    // Người C: 1050 điểm, đúng 38 câu, thời gian 145.000ms (chậm hơn B 5s) -> Hạng 3 (vì 1, 1, 3)!
    {
      attemptId: 'test_att_C',
      playerId: 'test_ply_C',
      seasonId: season.id,
      status: 'completed',
      isDisqualified: false,
      completedAt: new Date().toISOString(),
      scores: { total: 1050 },
      stats: { totalCorrect: 38, totalQuizTimeSpentMs: 145000 }
    },
    // Người D: 900 điểm, nhưng bị loại (disqualified) -> KHÔNG ĐƯỢC XUẤT HIỆN
    {
      attemptId: 'test_att_D',
      playerId: 'test_ply_D',
      seasonId: season.id,
      status: 'completed',
      isDisqualified: true,
      disqualifiedReason: 'Gian lận',
      completedAt: new Date().toISOString(),
      scores: { total: 900 },
      stats: { totalCorrect: 30, totalQuizTimeSpentMs: 160000 }
    }
  ];

  // Lưu vào MongoDB
  try {
    await Attempt.deleteMany({ attemptId: { $regex: /^test_att_/ } });
    await Attempt.insertMany(mockAttempts);
  } catch (_) {}

  // Lưu tạm vào attempts.json
  await updateJson(PATHS.ATTEMPTS, (attempts = []) => {
    // Xóa các test mock cũ nếu có
    const filtered = attempts.filter(a => !a.attemptId.startsWith('test_att_'));
    return [...filtered, ...mockAttempts];
  });

  const lb = await getLeaderboard(season.id, 'all');

  // Lọc chỉ xem các test_ply trong kết quả
  const testItems = lb.items.filter(item => item.playerId.startsWith('test_ply_'));
  assert.strictEqual(testItems.length, 3, 'Chỉ 3 người A, B, C được xuất hiện (D bị loại, A chỉ có 1 lượt tốt nhất)');

  const itemA = testItems.find(i => i.playerId === 'test_ply_A');
  const itemB = testItems.find(i => i.playerId === 'test_ply_B');
  const itemC = testItems.find(i => i.playerId === 'test_ply_C');

  assert.strictEqual(itemA.totalScore, 1050, 'Người A phải được lấy lượt tốt nhất là 1050 điểm');
  assert.strictEqual(itemB.totalScore, 1050, 'Người B có điểm 1050');
  assert.strictEqual(itemC.totalScore, 1050, 'Người C có điểm 1050');
  assert.strictEqual(itemA.rank, itemB.rank, 'Người A và B có điểm và thời gian bằng nhau nên phải đồng hạng');
  assert.strictEqual(itemC.rank, itemA.rank + 2, 'Người C có thời gian chậm hơn nên xếp sau hai người đồng hạng theo chuẩn 1, 2, 2, 4');
});
