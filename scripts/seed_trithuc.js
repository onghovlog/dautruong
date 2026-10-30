import { generateCrosswordSet, saveCrosswordSet } from '../server/services/crosswordService.js';
import { connectDB, disconnectDB } from '../server/db/mongo.js';

async function main() {
  await connectDB();
  console.log('Đang tạo bộ ô chữ TRI THỨC...');
  const cw = await generateCrosswordSet('TRI THỨC', 'Tri Thức - FPT Polytechnic');
  cw.id = 'cw_trithuc';
  cw.isApproved = true;
  await saveCrosswordSet(cw);
  console.log('✓ Đã tạo và lưu thành công bộ ô chữ TRI THỨC:');
  console.log(`- Từ khóa: ${cw.keyword} (${cw.normalizedKeyword})`);
  console.log(`- Số hàng: ${cw.rows.length}`);
  console.log(`- Cột vàng (centerCol): ${cw.centerCol}`);
  cw.rows.forEach(r => {
    console.log(`  Row ${r.rowIndex + 1} [startCol ${r.startCol}]: ${r.normalizedAnswer} (target: '${r.targetChar}' at index ${r.charIndex})`);
  });
  await disconnectDB();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
