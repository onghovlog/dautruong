import test, { after } from 'node:test';
import assert from 'node:assert';
import { connectDB, disconnectDB } from '../server/db/mongo.js';
import {
  createPlayer,
  recoverPlayer,
  updatePlayerProfile,
  getPlayerByToken,
  revokeSession
} from '../server/auth/playerAuth.js';

after(async () => {
  await disconnectDB();
});

test('Kiểm tra nhận diện hồ sơ, trùng tên, mã khôi phục và bảo mật', async () => {
  await connectDB();
  // 1. Hai người trùng tên phải có 2 playerId hoàn toàn khác nhau
  const p1 = await createPlayer('Nguyễn Văn Bảo', 'PH11111', 'WD18301', true);
  const p2 = await createPlayer('Nguyễn Văn Bảo', 'PH22222', 'WD18302', false);

  assert.notStrictEqual(p1.player.playerId, p2.player.playerId, 'Hai người trùng tên phải có playerId khác nhau');
  assert.ok(p1.rawRecoveryCode, 'Người chơi mới phải được cấp mã khôi phục');
  assert.ok(p2.rawRecoveryCode, 'Người chơi thứ hai cũng có mã khôi phục riêng');

  // 2. Khôi phục bằng mã hợp lệ
  const recovered = await recoverPlayer(p1.rawRecoveryCode, 'test_ip_1');
  assert.strictEqual(recovered.player.playerId, p1.player.playerId, 'Khôi phục thành công đúng hồ sơ');
  assert.ok(recovered.sessionToken);

  // 3. Khôi phục với mã sai phải báo lỗi không hợp lệ
  await assert.rejects(
    async () => {
      await recoverPlayer('DTNN-SAIM-ASAI', 'test_ip_2');
    },
    /Mã khôi phục không chính xác/,
    'Mã khôi phục sai phải bị từ chối'
  );

  // 4. Người chơi được sửa tên, MSSV, lớp; không được sửa playerId
  const updated = await updatePlayerProfile(p1.player.playerId, {
    displayName: 'Nguyễn Văn Bảo (Cập nhật)',
    studentClass: 'WD18305'
  });
  assert.strictEqual(updated.displayName, 'Nguyễn Văn Bảo (Cập nhật)');
  assert.strictEqual(updated.studentClass, 'WD18305');
  assert.strictEqual(updated.playerId, p1.player.playerId, 'PlayerId không bị thay đổi');

  // 5. Đổi người chơi: hủy token
  revokeSession(recovered.sessionToken);
  const checkSession = await getPlayerByToken(recovered.sessionToken);
  assert.strictEqual(checkSession, null, 'Sau khi đăng xuất / đổi người chơi, token không còn hiệu lực');
});
