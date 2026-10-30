import fs from 'fs';
import { readJson, PATHS } from '../server/storage/jsonStore.js';
import { normalizeVietnamese } from '../server/services/textUtils.js';

export async function validateAllQuestions() {
  console.log("=== KIỂM TRA NGHIỆM THU NGÂN HÀNG CÂU HỎI VÀ Ô CHỮ ===");
  const errors = [];
  const warnings = [];

  const roundFiles = [
    { file: PATHS.ROUND1, name: "Khởi động", expectedCount: 100, expectedDiff: { de: 60, vua: 30, kho: 10 } },
    { file: PATHS.ROUND2, name: "Tranh tài", expectedCount: 100, expectedDiff: { de: 30, vua: 50, kho: 20 } },
    { file: PATHS.ROUND3, name: "Bán kết", expectedCount: 100, expectedDiff: { de: 20, vua: 40, kho: 40 } },
    { file: PATHS.ROUND4, name: "Chung kết", expectedCount: 100, expectedDiff: { de: 10, vua: 30, kho: 60 }, isCrossword: true }
  ];

  const allIds = new Set();
  const allQuestionTexts = new Map();
  let totalQuestions = 0;

  for (const rf of roundFiles) {
    if (!fs.existsSync(rf.file)) {
      errors.push(`File không tồn tại: ${rf.file}`);
      continue;
    }

    const questions = await readJson(rf.file);
    if (!Array.isArray(questions)) {
      errors.push(`Nội dung ${rf.name} không phải là mảng JSON hợp lệ.`);
      continue;
    }

    totalQuestions += questions.length;
    console.log(`\nKiểm tra kho [${rf.name}]: ${questions.length} câu (kỳ vọng: ${rf.expectedCount})`);

    if (questions.length !== rf.expectedCount) {
      errors.push(`Kho [${rf.name}] có ${questions.length} câu, khác với kỳ vọng ${rf.expectedCount}`);
    }

    const diffCounts = { de: 0, vua: 0, kho: 0 };

    questions.forEach((q, idx) => {
      const prefix = `[${rf.name} - Câu ${idx + 1} (${q.id || 'NO_ID'})]`;

      if (!q.id) errors.push(`${prefix}: Thiếu trường 'id'`);
      if (allIds.has(q.id)) errors.push(`${prefix}: Trùng lặp ID '${q.id}'`);
      allIds.add(q.id);

      if (!q.question || !q.question.trim()) errors.push(`${prefix}: Thiếu nội dung câu hỏi`);

      const cleanQ = q.question ? q.question.trim().toLowerCase() : '';
      if (allQuestionTexts.has(cleanQ)) {
        warnings.push(`${prefix}: Câu hỏi tương đồng với câu ${allQuestionTexts.get(cleanQ)}`);
      } else {
        allQuestionTexts.set(cleanQ, q.id);
      }

      if (!['de', 'vua', 'kho'].includes(q.difficulty)) {
        errors.push(`${prefix}: Độ khó không hợp lệ '${q.difficulty}'`);
      } else {
        diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
      }

      if (!Array.isArray(q.options) || q.options.length !== 4) {
        errors.push(`${prefix}: Phải có đúng 4 phương án lựa chọn`);
      } else {
        const optionIds = q.options.map(o => o.id);
        if (!['A', 'B', 'C', 'D'].every(optId => optionIds.includes(optId))) {
          errors.push(`${prefix}: Các lựa chọn phải có id là A, B, C, D`);
        }
        for (const opt of q.options) {
          if (!opt.text || !opt.text.trim()) {
            errors.push(`${prefix}: Lựa chọn ${opt.id} rỗng`);
          }
        }
      }

      if (!['A', 'B', 'C', 'D'].includes(q.correctOptionId)) {
        errors.push(`${prefix}: correctOptionId không hợp lệ: '${q.correctOptionId}'`);
      }

      if (!q.explanation || !q.explanation.trim()) {
        errors.push(`${prefix}: Thiếu giải thích (explanation)`);
      }

      if (rf.isCrossword) {
        if (!q.horizontalAnswer || !q.horizontalAnswer.trim()) {
          errors.push(`${prefix}: Vòng Chung kết bắt buộc có horizontalAnswer`);
        }
        if (!q.normalizedAnswer || !q.normalizedAnswer.trim()) {
          errors.push(`${prefix}: Vòng Chung kết bắt buộc có normalizedAnswer`);
        } else {
          const expectedNorm = normalizeVietnamese(q.horizontalAnswer);
          if (q.normalizedAnswer !== expectedNorm) {
            errors.push(`${prefix}: normalizedAnswer '${q.normalizedAnswer}' không khớp với chuẩn hóa của '${q.horizontalAnswer}' (${expectedNorm})`);
          }
        }
      }
    });

    console.log(`  Phân bố độ khó thực tế: Dễ=${diffCounts.de}, Vừa=${diffCounts.vua}, Khó=${diffCounts.kho}`);
    console.log(`  Kỳ vọng độ khó:        Dễ=${rf.expectedDiff.de}, Vừa=${rf.expectedDiff.vua}, Khó=${rf.expectedDiff.kho}`);

    if (diffCounts.de !== rf.expectedDiff.de ||
        diffCounts.vua !== rf.expectedDiff.vua ||
        diffCounts.kho !== rf.expectedDiff.kho) {
      errors.push(`Kho [${rf.name}] sai phân bố độ khó! Thực tế: ${JSON.stringify(diffCounts)} - Kỳ vọng: ${JSON.stringify(rf.expectedDiff)}`);
    }
  }

  // Kiểm tra bộ ô chữ
  console.log(`\nKiểm tra dữ liệu Ô Chữ (crosswords.json)...`);
  if (!fs.existsSync(PATHS.CROSSWORDS)) {
    errors.push("Chưa tồn tại file crosswords.json");
  } else {
    const crosswords = await readJson(PATHS.CROSSWORDS);
    if (!Array.isArray(crosswords) || crosswords.length < 5) {
      errors.push(`Yêu cầu tối thiểu 5 bộ ô chữ, hiện có ${crosswords?.length || 0}`);
    } else {
      console.log(`  Đã có ${crosswords.length} bộ ô chữ.`);
      crosswords.forEach((cw, idx) => {
        const cwPrefix = `[Bộ ô chữ ${idx + 1}: ${cw.title}]`;
        if (cw.normalizedKeyword.length !== 10) {
          errors.push(`${cwPrefix}: Từ khóa chuẩn hóa phải có đúng 10 ký tự, thực tế: ${cw.normalizedKeyword.length}`);
        }
        if (!Array.isArray(cw.rows) || cw.rows.length !== 10) {
          errors.push(`${cwPrefix}: Phải có đúng 10 hàng ngang, thực tế: ${cw.rows?.length || 0}`);
        } else {
          const rowIds = new Set();
          const rowDiffs = { de: 0, vua: 0, kho: 0 };
          let extractedWord = '';

          cw.rows.forEach(r => {
            if (rowIds.has(r.questionId)) {
              errors.push(`${cwPrefix}: Trùng lặp câu hỏi ${r.questionId} trong cùng bộ ô chữ`);
            }
            rowIds.add(r.questionId);
            rowDiffs[r.difficulty] = (rowDiffs[r.difficulty] || 0) + 1;

            const charInAnswer = r.normalizedAnswer[r.charIndex];
            if (charInAnswer !== r.targetChar) {
              errors.push(`${cwPrefix} Hàng ${r.rowIndex}: targetChar '${r.targetChar}' không khớp với charIndex ${r.charIndex} trong '${r.normalizedAnswer}'`);
            }
            extractedWord += charInAnswer;
          });

          if (extractedWord !== cw.normalizedKeyword) {
            errors.push(`${cwPrefix}: Ký tự trích xuất '${extractedWord}' không khớp với từ khóa '${cw.normalizedKeyword}'`);
          }

          if (rowDiffs.de !== 1 || rowDiffs.vua !== 3 || rowDiffs.kho !== 6) {
            errors.push(`${cwPrefix}: Tỷ lệ độ khó ô chữ phải là 1 Dễ/ 3 Vừa/ 6 Khó, thực tế: ${JSON.stringify(rowDiffs)}`);
          }
        }
      });
    }
  }

  console.log(`\n==============================================`);
  console.log(`TỔNG CỘNG: ${totalQuestions} câu hỏi trong 4 kho.`);
  console.log(`CẢNH BÁO: ${warnings.length}`);
  warnings.forEach(w => console.log(`  [Cảnh báo] ${w}`));

  console.log(`LỖI: ${errors.length}`);
  errors.forEach(e => console.error(`  [LỖI] ${e}`));

  if (errors.length > 0) {
    console.error(`\n❌ NGHIỆM THU THẤT BẠI: Phát hiện ${errors.length} lỗi.`);
    return false;
  } else {
    console.log(`\n✅ NGHIỆM THU THÀNH CÔNG: Toàn bộ 400 câu hỏi và 5 bộ ô chữ đạt chuẩn 100%!`);
    return true;
  }
}

if (process.argv[1].endsWith('validate_questions.js')) {
  validateAllQuestions().then(success => {
    if (!success) process.exit(1);
  });
}
