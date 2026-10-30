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
  getAttemptById
} from '../server/services/gameService.js';

after(async () => {
  await disconnectDB();
});

test('Kiểm tra cơ chế chấm điểm, deadline 10s và idempotent', async () => {
  await connectDB();
  // Tạo người chơi test
  const { player } = await createPlayer('Thí sinh Test Điểm Số', 'PH00001', 'WD18301', true);
  const { attempt } = await createAttempt(player.playerId, true);
  assert.ok(attempt.attemptId);

  // Vòng 1 - Khởi động (10 điểm / câu)
  const q0Start = await startQuestion(attempt.attemptId, player.playerId, 'khoi_dong', 0);
  assert.ok(q0Start.deadlineAt);
  assert.strictEqual(q0Start.deadlineAt - q0Start.startedAt, 10000, 'Deadline phải đúng 10.000ms');

  // Gọi lại start-question xem có idempotent không
  const q0ReStart = await startQuestion(attempt.attemptId, player.playerId, 'khoi_dong', 0);
  assert.strictEqual(q0ReStart.deadlineAt, q0Start.deadlineAt, 'Gọi lại phải trả deadline cũ, không reset timer');

  // Lấy câu hỏi từ DB để biết đáp án đúng phục vụ test
  let rawAttempt = await getAttemptById(attempt.attemptId);
  let correctOption = rawAttempt.rounds.khoi_dong.questions[0].serverCorrectOptionId;

  // Nộp đáp án đúng
  const ans0 = await submitAnswer(attempt.attemptId, player.playerId, 'khoi_dong', 0, correctOption);
  assert.strictEqual(ans0.isCorrect, true);
  assert.strictEqual(ans0.pointsAwarded, 10, 'Vòng Khởi động đúng được 10 điểm');
  assert.strictEqual(ans0.roundScore, 10);
  assert.strictEqual(ans0.totalScore, 10);

  // Gửi lại cùng đáp án cho câu 0 xem có bị cộng lặp không
  const ans0Dup = await submitAnswer(attempt.attemptId, player.playerId, 'khoi_dong', 0, correctOption);
  assert.strictEqual(ans0Dup.pointsAwarded, 10);
  assert.strictEqual(ans0Dup.totalScore, 10, 'Gửi lặp câu hỏi không được cộng điểm lần hai');

  // Trả lời câu 1: chọn sai
  await startQuestion(attempt.attemptId, player.playerId, 'khoi_dong', 1);
  rawAttempt = await getAttemptById(attempt.attemptId);
  correctOption = rawAttempt.rounds.khoi_dong.questions[1].serverCorrectOptionId;
  const wrongOption = (correctOption === 'A' ? 'B' : 'A');

  const ans1 = await submitAnswer(attempt.attemptId, player.playerId, 'khoi_dong', 1, wrongOption);
  assert.strictEqual(ans1.isCorrect, false);
  assert.strictEqual(ans1.pointsAwarded, 0, 'Trả lời sai được 0 điểm');
  assert.strictEqual(ans1.totalScore, 10);
});

test('Kiểm tra Admin cài đặt thời gian countdown mỗi câu hỏi', async () => {
  const { updateActiveSeasonTimer } = await import('../server/services/adminService.js');

  // Admin đổi thời gian câu hỏi thành 15 giây và từ khóa thành 20 giây
  await updateActiveSeasonTimer({ timePerQuestionSeconds: 15, keywordGuessTimeSeconds: 20 }, 'admin');

  const { player } = await createPlayer('Thí sinh Test Cài Đặt Timer', 'PH99999', 'WD18301', true);
  const { attempt } = await createAttempt(player.playerId, true);

  const q0 = await startQuestion(attempt.attemptId, player.playerId, 'khoi_dong', 0);
  assert.strictEqual(q0.timeLimitSeconds, 15, 'timeLimitSeconds trả về client phải là 15 giây');
  assert.strictEqual(q0.deadlineAt - q0.startedAt, 15000, 'Deadline phải đúng 15.000ms theo cài đặt của Admin');

  // Đặt lại mặc định 10s
  await updateActiveSeasonTimer({ timePerQuestionSeconds: 10, keywordGuessTimeSeconds: 10 }, 'admin');
});

