import Crossword from '../models/Crossword.js';
import { readJson, updateJson, PATHS } from '../storage/jsonStore.js';
import { normalizeVietnamese } from './textUtils.js';
import { getQuestionsByRound } from './questionService.js';
import { LEXICON_QUESTIONS } from './crosswordLexicon.js';

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
 * Lấy một bộ ô chữ đã duyệt ngẫu nhiên (hoặc theo ID cụ thể)
 */
export async function getRandomApprovedCrossword(preferId = null) {
  const all = await getAllCrosswords();
  const approved = all.filter(c => c.isApproved);
  if (approved.length === 0) {
    throw new Error('Chưa có bộ ô chữ nào được duyệt trong hệ thống!');
  }

  if (preferId) {
    const found = approved.find(c => c.id === preferId);
    if (found) return found;
  }

  const randomIndex = Math.floor(Math.random() * approved.length);
  return approved[randomIndex];
}

/**
 * Thuật toán tự động phát triển bộ câu hỏi ô chữ từ từ khóa do Admin nhập
 * - Hỗ trợ mọi độ dài từ khóa (từ 3 đến 25 ký tự)
 * - Tự động tìm/ghép câu hỏi có câu trả lời chứa ký tự tương ứng
 * - Tính toán chính xác vị trí căn chỉnh cột dọc màu vàng như hình
 * - Kèm danh sách câu hỏi thay thế (alternatives) để Admin có thể đổi câu
 */
export async function generateCrosswordSet(targetKeyword, targetTitle = '') {
  if (!targetKeyword || typeof targetKeyword !== 'string') {
    throw new Error('Vui lòng cung cấp từ khóa hợp lệ.');
  }

  const rawTrimmed = targetKeyword.trim();
  const normKeyword = normalizeVietnamese(rawTrimmed).toUpperCase().replace(/[^A-Z]/g, '');

  if (normKeyword.length < 3 || normKeyword.length > 25) {
    throw new Error(`Từ khóa "${targetKeyword}" sau khi chuẩn hóa (${normKeyword}) phải có độ dài từ 3 đến 25 ký tự.`);
  }

  // Thu thập ngân hàng câu hỏi tổng thể (4 kho + từ điển chuyên sâu)
  let qPool = [];
  try {
    const r4 = await getQuestionsByRound('chung_ket');
    const r3 = await getQuestionsByRound('ban_ket');
    const r2 = await getQuestionsByRound('tranh_tai');
    const r1 = await getQuestionsByRound('khoi_dong');
    qPool = [...(r4 || []), ...(r3 || []), ...(r2 || []), ...(r1 || [])];
  } catch (_) {}

  const keywordChars = normKeyword.split('');
  const usedQuestions = new Set();
  const rows = [];

  // Trường hợp đặc biệt: Nếu từ khóa là "TRI THỨC" -> Sử dụng chính xác 7 câu hỏi chuẩn từ hình ảnh
  const isTriThuc = (normKeyword === 'TRITHUC');

  for (let i = 0; i < keywordChars.length; i++) {
    const char = keywordChars[i];
    let matchedQ = null;
    let alternatives = [];

    // Nếu là TRI THỨC và có câu hỏi đặc thù theo thứ tự dòng
    if (isTriThuc) {
      const triThucPredefined = [
        { answer: 'KIẾN TẠO', norm: 'KIENTAO', targetChar: 'T', charIndex: 4, q: 'Điền từ còn thiếu trong thông điệp: “Thầy cô truyền cảm hứng, sinh viên ... tương lai”.' },
        { answer: 'TRI ÂN', norm: 'TRIAN', targetChar: 'R', charIndex: 1, q: 'Tình cảm biết ơn sâu sắc mà sinh viên gửi đến thầy cô nhân ngày 20/11 được gọi là gì?' },
        { answer: 'SINH VIÊN', norm: 'SINHVIEN', targetChar: 'I', charIndex: 5, q: 'Tại FPT Polytechnic, người học thường được gọi bằng danh xưng nào?' },
        { answer: 'TỐT NGHIỆP', norm: 'TOTNGHIEP', targetChar: 'T', charIndex: 2, q: 'Hoàn thành chương trình học và được công nhận đủ điều kiện ra trường gọi là gì?' },
        { answer: 'THẦY CÔ', norm: 'THAYCO', targetChar: 'H', charIndex: 1, q: 'Người hướng dẫn, truyền đạt kiến thức và đồng hành cùng sinh viên được gọi chung là gì?' },
        { answer: 'THỰC HÀNH', norm: 'THUCHANH', targetChar: 'U', charIndex: 2, q: 'Phương pháp học gắn với thao tác, làm bài tập và tạo sản phẩm thực tế gọi là gì?' },
        { answer: 'HỌC TẬP', norm: 'HOCTAP', targetChar: 'C', charIndex: 2, q: 'Hoạt động tiếp thu kiến thức và rèn luyện kỹ năng mỗi ngày của sinh viên là gì?' }
      ];

      const pre = triThucPredefined[i];
      if (pre) {
        const foundInLex = LEXICON_QUESTIONS.find(l => l.horizontalAnswer === pre.answer && l.charIndex === pre.charIndex);
        if (foundInLex) {
          matchedQ = {
            questionId: `LEX_TT_${i}`,
            question: pre.q,
            horizontalAnswer: pre.answer,
            normalizedAnswer: pre.norm,
            targetChar: pre.targetChar,
            charIndex: pre.charIndex,
            difficulty: foundInLex.difficulty || 'vua',
            options: foundInLex.options,
            correctOptionId: 'A',
            explanation: foundInLex.explanation || '',
            source: 'Thông điệp FPT Polytechnic'
          };
          usedQuestions.add(matchedQ.normalizedAnswer);
        }
      }
    }

    // Nếu chưa có, tìm trong LEXICON_QUESTIONS
    if (!matchedQ) {
      const candidatesFromLex = LEXICON_QUESTIONS.filter(l => {
        if (usedQuestions.has(l.normalizedAnswer)) return false;
        return l.normalizedAnswer.includes(char);
      });

      if (candidatesFromLex.length > 0) {
        // Ưu tiên câu có targetChar rõ ràng
        const prime = candidatesFromLex.find(c => c.targetChar === char) || candidatesFromLex[0];
        const charIdx = prime.normalizedAnswer.indexOf(char);

        matchedQ = {
          questionId: `LEX_${Date.now()}_${i}`,
          question: prime.question,
          horizontalAnswer: prime.horizontalAnswer,
          normalizedAnswer: prime.normalizedAnswer,
          targetChar: char,
          charIndex: charIdx,
          difficulty: prime.difficulty || 'vua',
          options: prime.options,
          correctOptionId: 'A',
          explanation: prime.explanation || '',
          source: 'Từ điển Tiếng Việt & Tri thức'
        };
        usedQuestions.add(prime.normalizedAnswer);

        // Thu thập alternatives
        alternatives = candidatesFromLex.slice(1, 4).map(c => ({
          question: c.question,
          horizontalAnswer: c.horizontalAnswer,
          normalizedAnswer: c.normalizedAnswer,
          charIndex: c.normalizedAnswer.indexOf(char),
          options: c.options
        }));
      }
    }

    // Nếu vẫn chưa có, tìm trong ngân hàng câu hỏi 4 vòng
    if (!matchedQ) {
      const fromPool = qPool.filter(q => {
        const normAns = q.normalizedAnswer || normalizeVietnamese(q.horizontalAnswer || (q.options?.find(o => o.id === q.correctOptionId)?.text || ''));
        if (!normAns || usedQuestions.has(normAns)) return false;
        return normAns.includes(char);
      });

      if (fromPool.length > 0) {
        const candidate = fromPool[0];
        const normAns = candidate.normalizedAnswer || normalizeVietnamese(candidate.horizontalAnswer || candidate.options?.find(o => o.id === candidate.correctOptionId)?.text || '');
        const charIdx = normAns.indexOf(char);
        const correctOpt = candidate.options?.find(o => o.id === candidate.correctOptionId);

        matchedQ = {
          questionId: candidate.id || `POOL_${Date.now()}_${i}`,
          question: candidate.question,
          horizontalAnswer: candidate.horizontalAnswer || correctOpt?.text || normAns,
          normalizedAnswer: normAns,
          targetChar: char,
          charIndex: charIdx,
          difficulty: candidate.difficulty || 'vua',
          options: candidate.options,
          correctOptionId: candidate.correctOptionId || 'A',
          explanation: candidate.explanation || '',
          source: candidate.source || 'Ngân hàng đề thi Đấu Trường Ngôn Ngữ'
        };
        usedQuestions.add(normAns);

        alternatives = fromPool.slice(1, 4).map(c => {
          const cNorm = c.normalizedAnswer || normalizeVietnamese(c.horizontalAnswer || c.options?.find(o => o.id === c.correctOptionId)?.text || '');
          return {
            question: c.question,
            horizontalAnswer: c.horizontalAnswer || c.options?.find(o => o.id === c.correctOptionId)?.text || cNorm,
            normalizedAnswer: cNorm,
            charIndex: cNorm.indexOf(char),
            options: c.options
          };
        });
      }
    }

    // Dự phòng an toàn tuyệt đối: nếu là ký tự cực hiếm, tự tạo câu hỏi ngôn ngữ chuẩn
    if (!matchedQ) {
      const fallbackWords = {
        'A': { ans: 'ÁNH SÁNG', q: 'Hiện tượng quang học soi rọi vạn vật trong tự nhiên?' },
        'B': { ans: 'BẢN LĨNH', q: 'Sự kiên cường, dũng cảm vượt qua mọi khó khăn thử thách?' },
        'C': { ans: 'CẦU TIẾN', q: 'Tinh thần luôn mong muốn học hỏi để tiến bộ hơn mỗi ngày?' },
        'D': { ans: 'DẤU ẤN', q: 'Nét đặc trưng hoặc thành tích để lại ấn tượng sâu sắc?' },
        'E': { ans: 'EM GÁI', q: 'Người em là nữ trong gia đình thường được gọi là gì?' },
        'G': { ans: 'GƯƠNG MẪU', q: 'Tác phong chuẩn mực làm tấm gương sáng cho người khác noi theo?' },
        'H': { ans: 'HÀNH ĐỘNG', q: 'Việc bắt tay vào thực hiện công việc thay vì chỉ nói suông?' },
        'I': { ans: 'Ý CHÍ', q: 'Nghị lực kiên cường quyết tâm đi tới mục tiêu?' },
        'K': { ans: 'KIẾN THỨC', q: 'Vốn hiểu biết tích lũy được qua quá trình học tập?' },
        'L': { ans: 'LAO ĐỘNG', q: 'Hoạt động có mục đích của con người tạo ra của cải vật chất?' },
        'M': { ans: 'MỤC TIÊU', q: 'Cột mốc kết quả phấn đấu hướng tới trong tương lai?' },
        'N': { ans: 'NỖ LỰC', q: 'Cố gắng hết sức mình để hoàn thành nhiệm vụ?' },
        'O': { ans: 'TỔ QUỐC', q: 'Đất nước thiêng liêng nơi ta sinh ra và gắn bó?' },
        'P': { ans: 'PHẤN ĐẤU', q: 'Kiên trì rèn luyện vươn lên từng ngày trong cuộc sống?' },
        'Q': { ans: 'QUYẾT TÂM', q: 'Ý chí kiên định không gì lay chuyển trước khó khăn?' },
        'R': { ans: 'RỰC RỠ', q: 'Tươi sáng, nổi bật và tràn đầy sức sống?' },
        'S': { ans: 'SÁNG TẠO', q: 'Khả năng tìm tòi ra những ý tưởng mới mẻ độc đáo?' },
        'T': { ans: 'TỰ TIN', q: 'Niềm tin vững chắc vào khả năng của chính mình?' },
        'U': { ans: 'ƯỚC MƠ', q: 'Khát vọng tốt đẹp mà con người mong muốn đạt được?' },
        'V': { ans: 'VINH QUANG', q: 'Danh dự rạng rỡ đạt được qua những chiến thắng vẻ vang?' },
        'X': { ans: 'XUẤT SẮC', q: 'Vượt trội hơn hẳn so với mức bình thường về mọi mặt?' },
        'Y': { ans: 'YÊU NƯỚC', q: 'Tình cảm thiêng liêng gắn bó và bảo vệ giang sơn gấm vóc?' }
      };

      const fb = fallbackWords[char] || { ans: 'TRÍ TUỆ', q: 'Khả năng nhận thức và suy nghĩ sâu sắc của con người?' };
      const fbNorm = normalizeVietnamese(fb.ans);
      const charIdx = Math.max(0, fbNorm.indexOf(char));

      matchedQ = {
        questionId: `GEN_${Date.now()}_${i}`,
        question: fb.q,
        horizontalAnswer: fb.ans,
        normalizedAnswer: fbNorm,
        targetChar: char,
        charIndex: charIdx,
        difficulty: 'vua',
        options: [
          { id: 'A', text: fb.ans },
          { id: 'B', text: 'Tri thức' },
          { id: 'C', text: 'Kỹ năng' },
          { id: 'D', text: 'Học hỏi' }
        ],
        correctOptionId: 'A',
        explanation: 'Khái niệm ngôn ngữ và đạo đức tiếng Việt.',
        source: 'Từ điển Tiếng Việt phổ thông'
      };
      usedQuestions.add(fbNorm);
    }

    matchedQ.rowIndex = i;
    matchedQ.alternatives = alternatives;
    rows.push(matchedQ);
  }

  // TÍNH TOÁN CĂN CHỈNH CỘT DỌC HOÀN HẢO THEO BỨC HÌNH CỦA NGƯỜI DÙNG:
  // Cột vàng chính giữa = vị trí lớn nhất của charIndex trong tất cả các dòng
  const centerCol = Math.max(...rows.map(r => r.charIndex));

  rows.forEach(r => {
    r.startCol = centerCol - r.charIndex;
  });

  const totalCols = Math.max(...rows.map(r => r.startCol + r.normalizedAnswer.length));

  return {
    id: `cw_${normKeyword.toLowerCase()}_${Date.now()}`,
    title: targetTitle || rawTrimmed,
    keyword: rawTrimmed,
    normalizedKeyword: normKeyword,
    isApproved: true, // Mặc định duyệt để có thể trải nghiệm ngay
    centerCol,
    totalCols,
    rows,
    createdAt: new Date().toISOString()
  };
}

/**
 * Đổi câu hỏi cho một hàng (Reroll câu hỏi trong ô chữ)
 */
export async function rerollCrosswordRow(crosswordId, rowIndex) {
  const all = await getAllCrosswords();
  const cw = all.find(c => c.id === crosswordId);
  if (!cw || !cw.rows || !cw.rows[rowIndex]) {
    throw new Error('Không tìm thấy ô chữ hoặc hàng tương ứng.');
  }

  const row = cw.rows[rowIndex];
  if (!row.alternatives || row.alternatives.length === 0) {
    throw new Error('Không có câu hỏi thay thế nào cho hàng này.');
  }

  // Lấy câu hỏi thay thế đầu tiên và đẩy câu hiện tại vào cuối danh sách alternatives
  const nextAlt = row.alternatives.shift();
  const currentAsAlt = {
    question: row.question,
    horizontalAnswer: row.horizontalAnswer,
    normalizedAnswer: row.normalizedAnswer,
    charIndex: row.charIndex,
    options: row.options
  };
  row.alternatives.push(currentAsAlt);

  row.question = nextAlt.question;
  row.horizontalAnswer = nextAlt.horizontalAnswer;
  row.normalizedAnswer = nextAlt.normalizedAnswer;
  row.charIndex = nextAlt.charIndex;
  row.options = nextAlt.options;

  // Tính toán lại căn chỉnh cột
  const centerCol = Math.max(...cw.rows.map(r => r.charIndex));
  cw.rows.forEach(r => {
    r.startCol = centerCol - r.charIndex;
  });
  cw.centerCol = centerCol;
  cw.totalCols = Math.max(...cw.rows.map(r => r.startCol + r.normalizedAnswer.length));

  await saveCrosswordSet(cw);
  return cw;
}

/**
 * Lưu hoặc cập nhật bộ ô chữ
 */
export async function saveCrosswordSet(crosswordSet) {
  try {
    await Crossword.findOneAndUpdate(
      { id: crosswordSet.id },
      crosswordSet,
      { upsert: true, returnDocument: 'after' }
    );
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
