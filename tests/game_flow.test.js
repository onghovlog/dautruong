import test, { after } from 'node:test';
import assert from 'node:assert';
import { connectDB, disconnectDB } from '../server/db/mongo.js';
import { createPlayer } from '../server/auth/playerAuth.js';
import {
  createAttempt,
  startQuestion,
  submitAnswer,
  advanceToNextRound,
  startKeywordGuess,
  submitKeywordGuess,
  getAttemptById,
  sanitizeAttemptForClient
} from '../server/services/gameService.js';

after(async () => {
  await disconnectDB();
});

test('Kiểm tra luồng chơi hoàn chỉnh 4 vòng và đoán từ khóa Chung kết', async () => {
  await connectDB();
  const { player } = await createPlayer('Thí sinh Toàn Thắng', 'PH88888', 'WD18301', true);
  const { attempt } = await createAttempt(player.playerId, true);

  const roundKeys = ['khoi_dong', 'tranh_tai', 'ban_ket', 'chung_ket'];
  const expectedPoints = [10, 20, 30, 40];

  // Trả lời đúng tất cả 40 câu trắc nghiệm của cả 4 vòng
  for (let rIdx = 0; rIdx < 4; rIdx++) {
    const rKey = roundKeys[rIdx];
    const point = expectedPoints[rIdx];

    const curAttempt = await getAttemptById(attempt.attemptId);
    const numQ = curAttempt.rounds[rKey].questions.length;

    for (let qIdx = 0; qIdx < numQ; qIdx++) {
      await startQuestion(attempt.attemptId, player.playerId, rKey, qIdx);
      const raw = await getAttemptById(attempt.attemptId);
      const correctOpt = raw.rounds[rKey].questions[qIdx].serverCorrectOptionId;

      const res = await submitAnswer(attempt.attemptId, player.playerId, rKey, qIdx, correctOpt);
      assert.strictEqual(res.isCorrect, true);
      assert.strictEqual(res.pointsAwarded, point);
    }

    // Nếu chưa phải vòng cuối thì chuyển vòng
    if (rIdx < 3) {
      const advanced = await advanceToNextRound(attempt.attemptId, player.playerId);
      assert.strictEqual(advanced.currentRoundKey, roundKeys[rIdx + 1]);
    }
  }

  let raw = await getAttemptById(attempt.attemptId);
  const ckLength = raw.rounds.chung_ket.questions.length;
  const expectedQuizTotal = 10 * 10 + 10 * 20 + 10 * 30 + ckLength * 40;
  assert.strictEqual(raw.scores.total, expectedQuizTotal, `Tổng điểm trắc nghiệm phải đạt đúng ${expectedQuizTotal} điểm`);

  // Kiểm tra an toàn: khi chưa đoán từ khóa, sanitizeAttemptForClient KHÔNG được chứa targetChar hay charIndex
  const safeBefore = sanitizeAttemptForClient(raw);
  for (const q of safeBefore.rounds.chung_ket.questions) {
    assert.strictEqual(q.targetChar, undefined, 'Không được lộ targetChar trước khi đoán xong');
    assert.strictEqual(q.charIndex, undefined, 'Không được lộ charIndex trước khi đoán xong');
  }

  // Bắt đầu đoán từ khóa Chung kết
  const kgStart = await startKeywordGuess(attempt.attemptId, player.playerId);
  assert.ok(kgStart.deadlineAt);

  // Nộp từ khóa chính xác
  const targetKeyword = raw.rounds.chung_ket.normalizedKeyword;
  const kgRes = await submitKeywordGuess(attempt.attemptId, player.playerId, targetKeyword);
  assert.strictEqual(kgRes.keywordGuess.isCorrect, true);
  assert.strictEqual(kgRes.keywordGuess.pointsAwarded, 100);
  assert.strictEqual(kgRes.scores.total, expectedQuizTotal + 100, `Tổng điểm sau khi đoán đúng từ khóa phải đạt ${expectedQuizTotal + 100}`);

  // Kiểm tra sau khi hoàn thành: đã công bố đầy đủ các hàng ô chữ với vị trí cột dọc
  assert.ok(Array.isArray(kgRes.crosswordSolution));
  assert.strictEqual(kgRes.crosswordSolution.length, ckLength);
  for (const row of kgRes.crosswordSolution) {
    assert.ok(row.targetChar, 'Phải có targetChar sau khi hoàn thành');
    assert.ok(row.charIndex !== undefined, 'Phải có charIndex sau khi hoàn thành');
  }

  // Kiểm tra trạng thái hoàn thành
  const finalRaw = await getAttemptById(attempt.attemptId);
  assert.strictEqual(finalRaw.status, 'completed');
  assert.ok(finalRaw.completedAt);
});
