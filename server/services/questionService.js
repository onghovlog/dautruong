import Question from '../models/Question.js';
import { readJson, PATHS } from '../storage/jsonStore.js';

/**
 * Xáo trộn mảng Fisher-Yates ngẫu nhiên
 */
function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Lấy danh sách câu hỏi theo vòng
 */
export async function getQuestionsByRound(roundKey) {
  try {
    const questions = await Question.find({ round: roundKey }).lean();
    if (questions && questions.length > 0) return questions;
  } catch (_) {}

  let filePath = null;
  switch (roundKey) {
    case 'khoi_dong': filePath = PATHS.ROUND1; break;
    case 'tranh_tai': filePath = PATHS.ROUND2; break;
    case 'ban_ket': filePath = PATHS.ROUND3; break;
    case 'chung_ket': filePath = PATHS.ROUND4; break;
    default: throw new Error(`Vòng chơi không hợp lệ: ${roundKey}`);
  }
  return await readJson(filePath, []);
}

/**
 * Tạo đề 10 câu cho các vòng 1, 2, 3
 * Khởi động: 6 Dễ, 3 Vừa, 1 Khó
 * Tranh tài: 3 Dễ, 5 Vừa, 2 Khó
 * Bán kết: 2 Dễ, 4 Vừa, 4 Khó
 * Sắp xếp: Dễ -> Vừa -> Khó (random trong từng mức)
 * Xáo trộn đáp án 1 lần cố định và lưu vào snapshot
 */
export async function generateRoundQuestions(roundKey, ratio) {
  const allQuestions = await getQuestionsByRound(roundKey);

  const deList = shuffleArray(allQuestions.filter(q => q.difficulty === 'de'));
  const vuaList = shuffleArray(allQuestions.filter(q => q.difficulty === 'vua'));
  const khoList = shuffleArray(allQuestions.filter(q => q.difficulty === 'kho'));

  if (deList.length < ratio.de || vuaList.length < ratio.vua || khoList.length < ratio.kho) {
    throw new Error(`Kho câu hỏi ${roundKey} không đủ số lượng theo cấu hình độ khó!`);
  }

  const selectedDe = deList.slice(0, ratio.de);
  const selectedVua = vuaList.slice(0, ratio.vua);
  const selectedKho = khoList.slice(0, ratio.kho);

  // Sắp xếp: Dễ -> Vừa -> Khó
  const raw10 = [...selectedDe, ...selectedVua, ...selectedKho];

  // Chuẩn bị snapshot cho 10 câu
  return raw10.map((rawQ, index) => {
    // Xáo trộn 4 phương án A, B, C, D
    const originalCorrectOption = rawQ.options.find(o => o.id === rawQ.correctOptionId);
    const shuffledOptions = shuffleArray(rawQ.options);

    // Gán lại ID A, B, C, D mới
    const optionLabels = ['A', 'B', 'C', 'D'];
    let newCorrectOptionId = 'A';

    const finalOptions = shuffledOptions.map((opt, i) => {
      const newId = optionLabels[i];
      if (opt.id === rawQ.correctOptionId) {
        newCorrectOptionId = newId;
      }
      return {
        id: newId,
        text: opt.text
      };
    });

    return {
      index, // 0..9
      questionId: rawQ.id,
      round: rawQ.round,
      topic: rawQ.topic,
      difficulty: rawQ.difficulty,
      question: rawQ.question,
      options: finalOptions, // Cho frontend xem
      serverCorrectOptionId: newCorrectOptionId, // Giữ bí mật trên server
      explanation: rawQ.explanation,
      source: rawQ.source || '',
      // Trạng thái chơi của câu
      startedAt: null,
      deadlineAt: null,
      answeredAt: null,
      selectedOptionId: null,
      isCorrect: null,
      isTimeout: false,
      timeSpentMs: 0,
      pointsAwarded: 0
    };
  });
}

/**
 * Tạo đề 10 câu cho Vòng Chung kết từ Bộ Ô Chữ đã duyệt
 */
export async function generateFinalRoundQuestions(crosswordSet) {
  const round4Questions = await getQuestionsByRound('chung_ket');
  const qMap = new Map(round4Questions.map(q => [q.id, q]));

  return crosswordSet.rows.map((rowItem, index) => {
    const rawQ = qMap.get(rowItem.questionId);
    if (!rawQ) {
      throw new Error(`Không tìm thấy câu hỏi ${rowItem.questionId} trong kho Chung kết!`);
    }

    const shuffledOptions = shuffleArray(rawQ.options);
    const optionLabels = ['A', 'B', 'C', 'D'];
    let newCorrectOptionId = 'A';

    const finalOptions = shuffledOptions.map((opt, i) => {
      const newId = optionLabels[i];
      if (opt.id === rawQ.correctOptionId) {
        newCorrectOptionId = newId;
      }
      return {
        id: newId,
        text: opt.text
      };
    });

    return {
      index, // 0..9 (thứ tự hàng)
      questionId: rawQ.id,
      round: 'chung_ket',
      topic: rawQ.topic,
      difficulty: rawQ.difficulty,
      question: rawQ.question,
      options: finalOptions,
      serverCorrectOptionId: newCorrectOptionId,
      explanation: rawQ.explanation,
      source: rawQ.source || '',
      // Dữ liệu hàng ô chữ
      horizontalAnswer: rawQ.horizontalAnswer,
      normalizedAnswer: rawQ.normalizedAnswer,
      targetChar: rowItem.targetChar, // Ký tự bí mật tạo cột dọc
      charIndex: rowItem.charIndex,   // Vị trí bí mật
      // Trạng thái chơi của câu
      startedAt: null,
      deadlineAt: null,
      answeredAt: null,
      selectedOptionId: null,
      isCorrect: null,
      isTimeout: false,
      timeSpentMs: 0,
      pointsAwarded: 0
    };
  });
}
