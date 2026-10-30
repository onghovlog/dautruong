import Crossword from '../models/Crossword.js';
import { readJson, updateJson, PATHS } from '../storage/jsonStore.js';
import { normalizeVietnamese } from './textUtils.js';
import { getQuestionsByRound } from './questionService.js';

/**
 * Lấy tất cả các bộ ô chữ
 */
export async function getAllCrosswords() {
  try {
    const list = await Crossword.find().sort({ createdAt: -1 }).lean();
    if (list && list.length > 0) return list;
  } catch (_) {}
  return await readJson(PATHS.CROSSWORDS, []);
}

/**
 * Lấy một bộ ô chữ ngẫu nhiên đã duyệt
 */
export async function getRandomApprovedCrossword() {
  try {
    const approved = await Crossword.find({ isApproved: true }).lean();
    if (approved && approved.length > 0) {
      const randomIndex = Math.floor(Math.random() * approved.length);
      return approved[randomIndex];
    }
  } catch (_) {}

  const list = await getAllCrosswords();
  const approved = list.filter(c => c.isApproved);
  if (approved.length === 0) {
    throw new Error('Chưa có bộ ô chữ nào được duyệt trong hệ thống!');
  }
  const randomIndex = Math.floor(Math.random() * approved.length);
  return approved[randomIndex];
}

/**
 * Thuật toán tự động ghép bộ ô chữ từ ngân hàng 100 câu Chung kết
 * Tỷ lệ bắt buộc: 1 Dễ, 3 Vừa, 6 Khó
 * Khớp hoàn toàn 10 ký tự của từ khóa
 */
export async function generateCrosswordSet(targetKeyword, targetTitle) {
  const normKeyword = normalizeVietnamese(targetKeyword);
  if (normKeyword.length !== 10) {
    throw new Error(`Từ khóa "${targetKeyword}" sau khi chuẩn hóa (${normKeyword}) phải có đúng 10 ký tự.`);
  }

  const round4Questions = await getQuestionsByRound('chung_ket');
  const deQuestions = round4Questions.filter(q => q.difficulty === 'de');
  const vuaQuestions = round4Questions.filter(q => q.difficulty === 'vua');
  const khoQuestions = round4Questions.filter(q => q.difficulty === 'kho');

  const keywordChars = normKeyword.split('');

  function solve(rowIndex, usedIds, deCount, vuaCount, khoCount) {
    if (rowIndex === 10) {
      if (deCount === 1 && vuaCount === 3 && khoCount === 6) {
        return [];
      }
      return null;
    }

    const neededChar = keywordChars[rowIndex];
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

      if (nextDe > 1 || nextVua > 3 || nextKho > 6) continue;

      usedIds.add(q.id);
      const sub = solve(rowIndex + 1, usedIds, nextDe, nextVua, nextKho);
      usedIds.delete(q.id);

      if (sub !== null) {
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
          ...sub
        ];
      }
    }

    return null;
  }

  const solution = solve(0, new Set(), 0, 0, 0);
  if (!solution) {
    throw new Error(`Không thể tìm thấy tổ hợp 10 câu thỏa mãn tỷ lệ 1 Dễ/ 3 Vừa/ 6 Khó cho từ khóa: ${targetKeyword}`);
  }

  return {
    id: `cw_${normKeyword.toLowerCase()}_${Date.now()}`,
    title: targetTitle || targetKeyword,
    keyword: targetKeyword,
    normalizedKeyword: normKeyword,
    isApproved: false, // Chờ Admin duyệt
    rows: solution,
    createdAt: new Date().toISOString()
  };
}

/**
 * Lưu hoặc cập nhật bộ ô chữ
 */
export async function saveCrosswordSet(crosswordSet) {
  try {
    await Crossword.findOneAndUpdate({ id: crosswordSet.id }, crosswordSet, { upsert: true, returnDocument: 'after' });
  } catch (_) {}

  return await updateJson(PATHS.CROSSWORDS, (list = []) => {
    const existingIndex = list.findIndex(c => c.id === crosswordSet.id);
    if (existingIndex >= 0) {
      list[existingIndex] = crosswordSet;
    } else {
      list.push(crosswordSet);
    }
    return list;
  }, []);
}

/**
 * Xóa bộ ô chữ
 */
export async function deleteCrosswordSet(crosswordId) {
  try {
    await Crossword.deleteOne({ id: crosswordId });
  } catch (_) {}

  return await updateJson(PATHS.CROSSWORDS, (list = []) => {
    return list.filter(c => c.id !== crosswordId);
  }, []);
}

