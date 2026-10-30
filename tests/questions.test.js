import test, { after } from 'node:test';
import assert from 'node:assert';
import { connectDB, disconnectDB } from '../server/db/mongo.js';
import Question from '../server/models/Question.js';
import { readJson, PATHS } from '../server/storage/jsonStore.js';
import { normalizeVietnamese } from '../server/services/textUtils.js';

after(async () => {
  await disconnectDB();
});

test('Kiểm tra 4 kho câu hỏi có đủ 400 câu và đúng phân bố độ khó', async () => {
  await connectDB();
  const mongoCount = await Question.countDocuments();
  assert.strictEqual(mongoCount, 400, 'MongoDB phải chứa đủ 400 câu hỏi');

  const r1 = await readJson(PATHS.ROUND1);
  const r2 = await readJson(PATHS.ROUND2);
  const r3 = await readJson(PATHS.ROUND3);
  const r4 = await readJson(PATHS.ROUND4);

  assert.strictEqual(r1.length, 100, 'Kho Khởi động phải có đúng 100 câu');
  assert.strictEqual(r2.length, 100, 'Kho Tranh tài phải có đúng 100 câu');
  assert.strictEqual(r3.length, 100, 'Kho Bán kết phải có đúng 100 câu');
  assert.strictEqual(r4.length, 100, 'Kho Chung kết phải có đúng 100 câu');

  // Phân bố độ khó
  const countDiff = arr => arr.reduce((acc, q) => { acc[q.difficulty] = (acc[q.difficulty] || 0) + 1; return acc; }, {});

  const d1 = countDiff(r1);
  assert.deepStrictEqual(d1, { de: 60, vua: 30, kho: 10 }, 'Khởi động phải có 60 dễ, 30 vừa, 10 khó');

  const d2 = countDiff(r2);
  assert.deepStrictEqual(d2, { de: 30, vua: 50, kho: 20 }, 'Tranh tài phải có 30 dễ, 50 vừa, 20 khó');

  const d3 = countDiff(r3);
  assert.deepStrictEqual(d3, { de: 20, vua: 40, kho: 40 }, 'Bán kết phải có 20 dễ, 40 vừa, 40 khó');

  const d4 = countDiff(r4);
  assert.deepStrictEqual(d4, { de: 10, vua: 30, kho: 60 }, 'Chung kết phải có 10 dễ, 30 vừa, 60 khó');

  // ID duy nhất
  const allIds = new Set([...r1, ...r2, ...r3, ...r4].map(q => q.id));
  assert.strictEqual(allIds.size, 400, 'Tất cả 400 câu hỏi phải có ID duy nhất không trùng lặp');
});

test('Kiểm tra tối thiểu 5 bộ ô chữ Chung kết hợp lệ', async () => {
  const crosswords = await readJson(PATHS.CROSSWORDS);
  assert.ok(Array.isArray(crosswords) && crosswords.length >= 5, 'Phải có tối thiểu 5 bộ ô chữ');

  const standardSets = crosswords.filter(c => c.rows && c.rows.length === 10);
  assert.ok(standardSets.length >= 5, 'Phải có tối thiểu 5 bộ ô chữ chuẩn 10 hàng');

  for (const cw of standardSets) {
    assert.strictEqual(cw.normalizedKeyword.length, 10, `Từ khóa ô chữ ${cw.title} phải có đúng 10 ký tự`);
    assert.strictEqual(cw.rows.length, 10, `Bộ ô chữ ${cw.title} phải có đúng 10 hàng`);

    // Tỷ lệ độ khó ô chữ: 1 Dễ, 3 Vừa, 6 Khó
    const diffs = cw.rows.reduce((acc, r) => { acc[r.difficulty] = (acc[r.difficulty] || 0) + 1; return acc; }, {});
    assert.strictEqual(diffs.de, 1, `Ô chữ ${cw.title} phải có đúng 1 câu dễ`);
    assert.strictEqual(diffs.vua, 3, `Ô chữ ${cw.title} phải có đúng 3 câu vừa`);
    assert.strictEqual(diffs.kho, 6, `Ô chữ ${cw.title} phải có đúng 6 câu khó`);
  }

  // Kiểm tra ký tự trích xuất cho mọi bộ ô chữ
  for (const cw of crosswords) {
    let word = '';
    for (const r of cw.rows) {
      assert.strictEqual(r.normalizedAnswer[r.charIndex], r.targetChar, `Ký tự trích xuất hàng ${r.rowIndex} phải khớp targetChar`);
      word += r.targetChar;
    }
    assert.strictEqual(word, cw.normalizedKeyword, `Từ khóa trích xuất ${word} phải khớp ${cw.normalizedKeyword}`);
  }
});
