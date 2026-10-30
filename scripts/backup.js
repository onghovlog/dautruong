import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const BACKUP_DIR = path.resolve(DATA_DIR, 'backups');

async function main() {
  const isRestore = process.argv[2] === 'restore';
  const backupName = process.argv[3];

  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  if (isRestore) {
    if (!backupName) {
      console.error("Vui lòng cung cấp tên thư mục sao lưu. Ví dụ: node scripts/backup.js restore backup_20261030_120000");
      process.exit(1);
    }
    const sourceDir = path.join(BACKUP_DIR, backupName);
    if (!fs.existsSync(sourceDir)) {
      console.error(`Không tìm thấy bản sao lưu tại: ${sourceDir}`);
      process.exit(1);
    }

    console.log(`Đang khôi phục từ: ${sourceDir}...`);
    const files = fs.readdirSync(sourceDir);
    for (const f of files) {
      if (f.endsWith('.json')) {
        fs.copyFileSync(path.join(sourceDir, f), path.join(DATA_DIR, f));
        console.log(`  ✓ Khôi phục: ${f}`);
      }
    }
    console.log("=== KHÔI PHỤC HOÀN TẤT ===");
    return;
  }

  // Tạo bản sao lưu mới
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const targetDir = path.join(BACKUP_DIR, `backup_${timestamp}`);
  fs.mkdirSync(targetDir, { recursive: true });

  console.log(`Đang sao lưu dữ liệu vào: ${targetDir}...`);
  const files = fs.readdirSync(DATA_DIR);
  for (const f of files) {
    const fullPath = path.join(DATA_DIR, f);
    if (fs.statSync(fullPath).isFile() && f.endsWith('.json')) {
      fs.copyFileSync(fullPath, path.join(targetDir, f));
      console.log(`  ✓ Sao lưu: ${f}`);
    }
  }

  console.log(`=== SAO LƯU THÀNH CÔNG ===`);
  console.log(`Thư mục sao lưu: ${path.basename(targetDir)}`);
}

main().catch(console.error);
