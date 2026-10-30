import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const writeQueues = new Map();

/**
 * Hàm sleep hỗ trợ retry
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Đưa tác vụ vào hàng đợi tuần tự cho từng file
 */
function enqueue(filePath, taskFn) {
  const normalizedPath = path.normalize(filePath);
  const currentQueue = writeQueues.get(normalizedPath) || Promise.resolve();

  const nextQueue = currentQueue
    .then(async () => {
      return await taskFn();
    })
    .catch((err) => {
      console.error(`[JsonStore Error in Queue for ${normalizedPath}]:`, err);
      throw err;
    })
    .finally(() => {
      if (writeQueues.get(normalizedPath) === nextQueue) {
        writeQueues.delete(normalizedPath);
      }
    });

  writeQueues.set(normalizedPath, nextQueue);
  return nextQueue;
}

/**
 * Thay thế file an toàn với retry cho hệ điều hành Windows (tránh EPERM/EBUSY khi lock tức thời)
 */
async function safeReplaceFile(tmpPath, destPath, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await fs.promises.rename(tmpPath, destPath);
      return;
    } catch (err) {
      if (['EPERM', 'EBUSY', 'EACCES'].includes(err.code) && attempt < maxRetries) {
        await sleep(attempt * 20); // Đợi 20ms, 40ms, 60ms...
        continue;
      }
      // Nếu rename vẫn không được sau các lần thử, thử copyFile rồi xóa tmp
      try {
        await fs.promises.copyFile(tmpPath, destPath);
        await fs.promises.unlink(tmpPath).catch(() => {});
        return;
      } catch (copyErr) {
        throw err;
      }
    }
  }
}

/**
 * Đọc file JSON an toàn
 */
export async function readJson(filePath, defaultValue = null) {
  try {
    if (!fs.existsSync(filePath)) {
      if (defaultValue !== null) {
        await writeJson(filePath, defaultValue);
        return defaultValue;
      }
      return null;
    }
    const content = await fs.promises.readFile(filePath, 'utf-8');
    if (!content.trim()) return defaultValue;
    return JSON.parse(content);
  } catch (error) {
    console.error(`[JsonStore] Lỗi đọc file ${filePath}:`, error.message);
    throw new Error(`Không thể đọc dữ liệu từ file: ${path.basename(filePath)}`);
  }
}

/**
 * Ghi file JSON tuần tự qua file tạm rồi thay thế an toàn
 */
export async function writeJson(filePath, data) {
  return enqueue(filePath, async () => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }

    const tmpPath = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(2, 8)}.tmp`;
    const jsonString = JSON.stringify(data, null, 2);

    try {
      await fs.promises.writeFile(tmpPath, jsonString, 'utf-8');
      await safeReplaceFile(tmpPath, filePath);
    } catch (err) {
      if (fs.existsSync(tmpPath)) {
        await fs.promises.unlink(tmpPath).catch(() => {});
      }
      throw err;
    }
  });
}

/**
 * Cập nhật file JSON theo chu trình Atomic: Read -> Modify -> Write tuần tự
 */
export async function updateJson(filePath, updateFn, defaultValue = null) {
  return enqueue(filePath, async () => {
    let currentData = null;
    if (fs.existsSync(filePath)) {
      const content = await fs.promises.readFile(filePath, 'utf-8');
      currentData = content.trim() ? JSON.parse(content) : defaultValue;
    } else {
      currentData = defaultValue;
    }

    const updatedData = await updateFn(currentData);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }

    const tmpPath = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(2, 8)}.tmp`;
    const jsonString = JSON.stringify(updatedData, null, 2);

    try {
      await fs.promises.writeFile(tmpPath, jsonString, 'utf-8');
      await safeReplaceFile(tmpPath, filePath);
      return updatedData;
    } catch (err) {
      if (fs.existsSync(tmpPath)) {
        await fs.promises.unlink(tmpPath).catch(() => {});
      }
      throw err;
    }
  });
}

export const PATHS = {
  DATA_DIR,
  QUESTIONS_DIR: path.join(DATA_DIR, 'questions'),
  ROUND1: path.join(DATA_DIR, 'questions', 'round1_khoi_dong.json'),
  ROUND2: path.join(DATA_DIR, 'questions', 'round2_tranh_tai.json'),
  ROUND3: path.join(DATA_DIR, 'questions', 'round3_ban_ket.json'),
  ROUND4: path.join(DATA_DIR, 'questions', 'round4_chung_ket.json'),
  CROSSWORDS: path.join(DATA_DIR, 'crosswords.json'),
  PLAYERS: path.join(DATA_DIR, 'players.json'),
  ATTEMPTS: path.join(DATA_DIR, 'attempts.json'),
  SEASONS: path.join(DATA_DIR, 'seasons.json'),
  AUDIT_LOGS: path.join(DATA_DIR, 'audit_logs.json'),
  ADMIN: path.join(DATA_DIR, 'admin_config.json'),
  DEMO_PLAYERS: path.join(DATA_DIR, 'demo_players.json'),
  DEMO_ATTEMPTS: path.join(DATA_DIR, 'demo_attempts.json'),
  BACKUPS_DIR: path.join(DATA_DIR, 'backups')
};
