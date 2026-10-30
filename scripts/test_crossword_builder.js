import { round4Questions } from './data_round4.js';
import { normalizeVietnamese } from '../server/services/textUtils.js';

export function findCrosswordSet(targetKeyword, targetTitle) {
  const normKeyword = normalizeVietnamese(targetKeyword);
  if (normKeyword.length !== 10) {
    throw new Error(`Từ khóa "${targetKeyword}" sau khi chuẩn hóa (${normKeyword}) không đúng 10 ký tự!`);
  }

  // Phân loại câu theo độ khó
  const deQuestions = round4Questions.filter(q => q.difficulty === 'de');
  const vuaQuestions = round4Questions.filter(q => q.difficulty === 'vua');
  const khoQuestions = round4Questions.filter(q => q.difficulty === 'kho');

  // Tìm tổ hợp: 1 câu dễ, 3 câu vừa, 6 câu khó sao cho khớp 10 ký tự của normKeyword
  // Sử dụng backtracking để tìm kiếm một tổ hợp hợp lệ
  const keywordChars = normKeyword.split('');

  function solve(rowIndex, usedIds, deCount, vuaCount, khoCount) {
    if (rowIndex === 10) {
      if (deCount === 1 && vuaCount === 3 && khoCount === 6) {
        return [];
      }
      return null;
    }

    const neededChar = keywordChars[rowIndex];
    // Tìm các câu có chứa neededChar và chưa dùng
    // Ưu tiên theo tỷ lệ còn thiếu
    let candidatePool = [];
    if (deCount < 1) candidatePool = candidatePool.concat(deQuestions);
    if (vuaCount < 3) candidatePool = candidatePool.concat(vuaQuestions);
    if (khoCount < 6) candidatePool = candidatePool.concat(khoQuestions);

    for (const q of candidatePool) {
      if (usedIds.has(q.id)) continue;
      const charIdx = q.normalizedAnswer.indexOf(neededChar);
      if (charIdx === -1) continue;

      const nextDe = deCount + (q.difficulty === 'de' ? 1 : 0);
      const nextVua = vuaCount + (q.difficulty === 'vua' ? 1 : 0);
      const nextKho = khoCount + (q.difficulty === 'kho' ? 1 : 0);

      // Cắt tỉa nếu vượt quá số lượng
      if (nextDe > 1 || nextVua > 3 || nextKho > 6) continue;

      usedIds.add(q.id);
      const subResult = solve(rowIndex + 1, usedIds, nextDe, nextVua, nextKho);
      usedIds.delete(q.id);

      if (subResult !== null) {
        return [
          {
            rowIndex,
            questionId: q.id,
            difficulty: q.difficulty,
            horizontalAnswer: q.horizontalAnswer,
            normalizedAnswer: q.normalizedAnswer,
            targetChar: neededChar,
            charIndex: charIdx
          },
          ...subResult
        ];
      }
    }

    return null;
  }

  const solution = solve(0, new Set(), 0, 0, 0);
  if (!solution) {
    throw new Error(`Không tìm được bộ ô chữ hợp lệ cho từ khóa: ${targetKeyword}`);
  }

  return {
    id: `cw_${normKeyword.toLowerCase()}`,
    title: targetTitle,
    keyword: targetKeyword,
    normalizedKeyword: normKeyword,
    isApproved: true,
    rows: solution
  };
}

// Thử tạo 5 bộ ô chữ mẫu
const targets = [
  { keyword: "ĐẤT NƯỚC TÔI", title: "Đất Nước Tôi" },
  { keyword: "VĂN HÓA VIỆT", title: "Văn Hóa Việt" },
  { keyword: "TRÍ TUỆ VIỆT", title: "Trí Tuệ Việt" },
  { keyword: "NGÔN NGỮ TÔI", title: "Ngôn Ngữ Tôi" },
  { keyword: "BẢN SẮC VIỆT", title: "Bản Sắc Việt" }
];

console.log("Đang kiểm tra và tạo 5 bộ ô chữ mẫu...");
const crosswords = [];
for (const t of targets) {
  try {
    const cw = findCrosswordSet(t.keyword, t.title);
    console.log(`✓ Tạo thành công bộ ô chữ: [${cw.title}] (${cw.normalizedKeyword})`);
    const diffCount = cw.rows.reduce((acc, r) => {
      acc[r.difficulty] = (acc[r.difficulty] || 0) + 1;
      return acc;
    }, {});
    console.log(`  Độ khó: Dễ=${diffCount.de}, Vừa=${diffCount.vua}, Khó=${diffCount.kho}`);
    crosswords.push(cw);
  } catch (err) {
    console.error(`✗ Lỗi tạo bộ [${t.title}]:`, err.message);
  }
}
