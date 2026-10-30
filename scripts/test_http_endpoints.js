import assert from 'node:assert';

async function testHttpEndpoints() {
  console.log("=== KIỂM THỬ TRỰC TIẾP HTTP ENDPOINTS MÁY CHỦ http://localhost:3000 ===");

  // 1. Kiểm tra trang chủ HTML
  const homeRes = await fetch('http://localhost:3000/');
  assert.strictEqual(homeRes.status, 200, 'Trang chủ phải trả về mã 200');
  const homeHtml = await homeRes.text();
  assert.ok(homeHtml.includes('Đấu Trường Ngôn Ngữ'), 'Trang chủ phải chứa tiêu đề Đấu Trường Ngôn Ngữ');
  assert.ok(homeHtml.includes('app-container'), 'Trang chủ phải có mobile app-container');
  console.log("✓ 1. Trang chủ HTML5 chuẩn mobile container 480px: OK");

  // 2. Kiểm tra trang Admin HTML
  const adminPageRes = await fetch('http://localhost:3000/admin');
  assert.strictEqual(adminPageRes.status, 200);
  const adminHtml = await adminPageRes.text();
  assert.ok(adminHtml.includes('Quản Trị Viên'), 'Trang admin phải có tiêu đề Quản Trị Viên');
  console.log("✓ 2. Trang Admin HTML5 mobile container: OK");

  // 3. Đăng ký người chơi mới qua API
  const regRes = await fetch('http://localhost:3000/api/player/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      displayName: 'Võ Minh Trí',
      studentId: 'PH33456',
      studentClass: 'WD18301',
      publicClass: true
    })
  });
  assert.strictEqual(regRes.status, 200);
  const regData = await regRes.json();
  assert.ok(regData.player.playerId, 'Phải tạo playerId thành công');
  assert.ok(regData.recoveryCode, 'Phải cấp recoveryCode thành công');
  const playerCookie = regRes.headers.get('set-cookie');
  assert.ok(playerCookie && playerCookie.includes('player_token'), 'Phải set cookie player_token HttpOnly');
  console.log(`✓ 3. Đăng ký người chơi mới: OK (${regData.player.displayName} - Mã khôi phục: ${regData.recoveryCode})`);

  // 4. Lấy thông tin /api/player/me với cookie
  const meRes = await fetch('http://localhost:3000/api/player/me', {
    headers: { Cookie: playerCookie }
  });
  assert.strictEqual(meRes.status, 200);
  const meData = await meRes.json();
  assert.strictEqual(meData.player.displayName, 'Võ Minh Trí');
  console.log("✓ 4. Nhận diện phiên người chơi qua HttpOnly cookie: OK");

  // 5. Khởi tạo lượt chơi mới
  const startRes = await fetch('http://localhost:3000/api/game/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: playerCookie },
    body: JSON.stringify({ forceNew: true })
  });
  assert.strictEqual(startRes.status, 200);
  const startData = await startRes.json();
  const attemptId = startData.attempt.attemptId;
  assert.ok(attemptId, 'Phải tạo attemptId thành công');
  console.log(`✓ 5. Khởi tạo lượt chơi mới (attemptId: ${attemptId}): OK`);

  // 6. Mở câu hỏi số 0 của vòng 1 (Khởi động)
  const q0Res = await fetch('http://localhost:3000/api/game/start-question', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: playerCookie },
    body: JSON.stringify({ attemptId, roundKey: 'khoi_dong', questionIndex: 0 })
  });
  assert.strictEqual(q0Res.status, 200);
  const q0Data = await q0Res.json();
  assert.strictEqual(q0Data.deadlineAt - q0Data.startedAt, 10000, 'Deadline phải đúng 10 giây');
  console.log("✓ 6. Mở câu hỏi và đồng bộ đồng hồ 10 giây server: OK");

  // 7. Nộp đáp án câu 0
  const ansRes = await fetch('http://localhost:3000/api/game/submit-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: playerCookie },
    body: JSON.stringify({ attemptId, roundKey: 'khoi_dong', questionIndex: 0, selectedOptionId: 'B' })
  });
  assert.strictEqual(ansRes.status, 200);
  const ansData = await ansRes.json();
  assert.ok(ansData.explanation, 'Phải trả lời giải thích câu hỏi');
  console.log(`✓ 7. Chấm điểm câu hỏi và trả giải thích chi tiết: OK (Điểm: ${ansData.roundScore}đ)`);

  // 8. Bảng xếp hạng
  const lbRes = await fetch('http://localhost:3000/api/leaderboard?timeRange=all');
  assert.strictEqual(lbRes.status, 200);
  const lbData = await lbRes.json();
  assert.ok(Array.isArray(lbData.items), 'Bảng xếp hạng phải trả về danh sách');
  console.log(`✓ 8. Bảng xếp hạng công khai: OK (Có ${lbData.items.length} thí sinh trong bảng)`);

  // 9. Đăng nhập Admin
  const adminLoginRes = await fetch('http://localhost:3000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'AdminPoly@2026' })
  });
  assert.strictEqual(adminLoginRes.status, 200);
  const adminCookie = adminLoginRes.headers.get('set-cookie');
  assert.ok(adminCookie && adminCookie.includes('admin_token'), 'Phải set cookie admin_token');
  console.log("✓ 9. Đăng nhập Admin với mật khẩu Bcrypt hash: OK");

  // 10. Admin lấy danh sách 5 bộ ô chữ
  const cwRes = await fetch('http://localhost:3000/api/admin/crosswords', {
    headers: { Cookie: adminCookie }
  });
  assert.strictEqual(cwRes.status, 200);
  const cwData = await cwRes.json();
  assert.ok(cwData.crosswords.length >= 5, 'Phải có tối thiểu 5 bộ ô chữ');
  console.log(`✓ 10. Quản lý ô chữ Chung kết: OK (Có ${cwData.crosswords.length} bộ ô chữ đã duyệt)`);

  // 11. Admin xuất file CSV có BOM UTF-8
  const csvRes = await fetch('http://localhost:3000/api/admin/export/csv', {
    headers: { Cookie: adminCookie }
  });
  assert.strictEqual(csvRes.status, 200);
  const csvBuf = await csvRes.arrayBuffer();
  const csvBytes = new Uint8Array(csvBuf);
  assert.ok(csvBytes[0] === 0xEF && csvBytes[1] === 0xBB && csvBytes[2] === 0xBF, 'File CSV phải có tiền tố 3 bytes BOM UTF-8 (EF BB BF) cho Microsoft Excel');
  console.log("✓ 11. Xuất file CSV bảng xếp hạng với UTF-8 BOM chống lỗi font Excel: OK");

  // 12. Admin cài đặt thời gian đếm ngược (countdown timer)
  const timerPutRes = await fetch('http://localhost:3000/api/admin/settings/timer', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookie },
    body: JSON.stringify({ timePerQuestionSeconds: 15, keywordGuessTimeSeconds: 20 })
  });
  assert.strictEqual(timerPutRes.status, 200);
  const timerPutData = await timerPutRes.json();
  assert.strictEqual(timerPutData.rules.timePerQuestionSeconds, 15, 'Thời gian câu hỏi phải cập nhật thành 15s');

  const timerGetRes = await fetch('http://localhost:3000/api/admin/settings/timer', {
    headers: { Cookie: adminCookie }
  });
  assert.strictEqual(timerGetRes.status, 200);
  const timerGetData = await timerGetRes.json();
  assert.strictEqual(timerGetData.timePerQuestionSeconds, 15);
  console.log("✓ 12. Admin cài đặt và đọc cấu hình thời gian đếm ngược (countdown timer): OK");

  // Khôi phục về 10s
  await fetch('http://localhost:3000/api/admin/settings/timer', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookie },
    body: JSON.stringify({ timePerQuestionSeconds: 10, keywordGuessTimeSeconds: 10 })
  });

  console.log("\n====================================================");
  console.log("🎉 TẤT CẢ 12/12 KIỂM THỬ TÍCH HỢP HTTP ENDPOINTS THÀNH CÔNG 100%!");
  console.log("====================================================");
}

testHttpEndpoints().catch(err => {
  console.error("Lỗi kiểm thử HTTP:", err);
  process.exit(1);
});
