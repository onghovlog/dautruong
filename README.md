# ⚔️ ĐẤU TRƯỜNG NGÔN NGỮ • FPT POLYTECHNIC

Website Minigame đấu trường kiến thức Tiếng Việt dành riêng cho sinh viên Cao đẳng FPT Polytechnic. Dự án được xây dựng hoàn chỉnh từ Backend tới Frontend theo kiến trúc Mobile-First (khung 480px căn giữa trên mọi thiết bị).

---

## 📋 MỤC LỤC
1. [Giới thiệu & Tính năng](#1-giới-thiệu--tính-năng)
2. [Yêu cầu & Công nghệ](#2-yêu-cầu--công-nghệ)
3. [Cài đặt & Khởi động](#3-cài-đặt--khởi-động)
4. [Tài khoản Quản trị (Admin)](#4-tài-khoản-quản-trị-admin)
5. [Truy cập trên điện thoại cùng mạng Wi-Fi](#5-truy-cập-trên-điện-thoại-cùng-mạng-wi-fi)
6. [Cấu trúc mã nguồn & Dữ liệu JSON](#6-cấu-trúc-mã-nguồn--dữ-liệu-json)
7. [Ngân hàng 400 câu hỏi & Quản lý đề](#7-ngân-hàng-400-câu-hỏi--quản-lý-đề)
8. [Cơ chế Ô Chữ Chung kết & Thuật toán sinh](#8-cơ-chế-ô-chữ-chung-kết--thuật-toán-sinh)
9. [Bảng Xếp Hạng & Đồng Hạng](#9-bảng-xếp-hạng--đồng-hạng)
10. [Sao lưu & Phục hồi dữ liệu](#10-sao-lưu--phục-hồi-dữ-liệu)
11. [Giới hạn kiến trúc đơn tiến trình](#11-giới-hạn-kiến-trúc-đơn-tiến-trình)
12. [Phân biệt hồ sơ trải nghiệm & Xác minh danh tính](#12-phân-biệt-hồ-sơ-trải-nghiệm--xác-minh-danh-tính)

---

## 1. Giới thiệu & Tính năng
- **Chủ đề**: Kiến thức tiếng Việt toàn diện (Chính tả, Nghĩa của từ, Thành ngữ - Tục ngữ, Ca dao - Thơ ca, Ngữ pháp).
- **Hình thức trải nghiệm cá nhân**: Thí sinh tự trải nghiệm lần lượt đủ 4 vòng:
  1. **Khởi động**: 10 câu trắc nghiệm (+10 điểm/câu đúng).
  2. **Tranh tài**: 10 câu trắc nghiệm (+20 điểm/câu đúng).
  3. **Bán kết**: 10 câu trắc nghiệm (+30 điểm/câu đúng).
  4. **Chung kết**: 10 câu trắc nghiệm (+40 điểm/câu đúng) tương ứng 10 hàng ngang ô chữ + 1 lượt đoán Từ khóa bí mật 10 chữ cái (+100 điểm thưởng).
- **Tổng điểm tối đa**: 1.100 điểm (1.000 điểm trắc nghiệm + 100 điểm từ khóa ô chữ).
- **Thời gian nghiêm ngặt**: Đúng 10 giây/câu và 10 giây đoán từ khóa, server quyết định deadline, chống hack timer, idempotent (refresh không mất thời gian).
- **Hồ sơ & Mã khôi phục**: Đăng nhập bằng tên, cấp mã khôi phục bí mật (DTNN-XXXX-XXXX) để chuyển thiết bị, hỗ trợ đổi người chơi trên thiết bị công cộng.

---

## 2. Yêu cầu & Công nghệ
- **Node.js**: Phiên bản 18.x trở lên (đã kiểm thử ổn định trên Node.js v22).
- **Database**: MongoDB Atlas (kết nối qua Mongoose với Replica Set, hỗ trợ index chuyên dụng). Hệ thống đồng thời duy trì sao lưu song song (Dual-write) vào JSON File qua hàng đợi Atomic Write Queue an toàn trên máy chủ.
- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System, Dark Mode `#0B0F16`, Cam `#FF7A18`), Vanilla JavaScript ES Modules (không dùng framework nặng).
- **Backend**: Node.js & Express.
- **Bảo mật**: Cookie HttpOnly, SameSite=Lax, SHA-256 hash mã khôi phục, Bcrypt hash mật khẩu Admin, CSV export có BOM UTF-8 chống Formula Injection.

---

## 3. Cài đặt & Khởi động

### Bước 1: Cài đặt thư viện dependencies
```bash
npm install
```

### Bước 2: Cấu hình biến môi trường kết nối MongoDB Atlas
Tạo hoặc kiểm tra file `.env` tại thư mục gốc:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://thayhoweb_db_user:Tuong29042011@cluster0.uafqmya.mongodb.net/dautruongngonngu?retryWrites=true&w=majority
```

### Bước 3: Khởi tạo dữ liệu câu hỏi, ô chữ và mùa giải vào MongoDB Atlas
```bash
npm run seed
```

### Bước 4: Khởi động máy chủ
```bash
npm start
```
Truy cập ứng dụng:
- **Người chơi**: [http://localhost:3000](http://localhost:3000)
- **Trang Quản trị Admin**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

---

## 4. Tài khoản Quản trị (Admin) & Cài đặt hệ thống
Tài khoản Admin mặc định ban đầu:
- **Tài khoản**: `admin`
- **Mật khẩu**: `AdminPoly@2026`

Để thay đổi mật khẩu hoặc tạo mới Admin qua dòng lệnh:
```bash
node scripts/setup_admin.js <username> <mat_khau_moi>
```
*Ví dụ:*
```bash
node scripts/setup_admin.js admin Poly@2026StrongPass
```

### ⏱️ Cài đặt thời gian đếm ngược (Countdown Timer) của câu hỏi
Quản trị viên có thể tùy ý điều chỉnh thời gian trả lời cho từng câu hỏi và thời gian đoán từ khóa:
1. Đăng nhập vào trang Admin tại [http://localhost:3000/admin](http://localhost:3000/admin).
2. Chuyển sang tab **Cài đặt & Mùa**.
3. Tại card **Cài đặt thời gian đếm ngược**:
   - Nhập hoặc bấm các nút chọn nhanh thời gian mỗi câu hỏi: **5s**, **10s** (mặc định), **15s**, **20s**, **30s** (từ 3 đến 120 giây).
   - Nhập thời gian đoán từ khóa vòng Chung kết: **10s**, **15s**, **20s**, **30s**.
4. Nhấn **Lưu Cài Đặt Thời Gian ⏱️**.
5. Cài đặt có hiệu lực ngay lập tức với đồng hồ đếm ngược trên màn hình người chơi và tự động ghi nhận vào nhật ký quản trị (Audit Logs).

---

## 5. Truy cập trên điện thoại cùng mạng Wi-Fi
Để mở ứng dụng trên điện thoại di động trong cùng mạng nội bộ:
1. Mở Command Prompt hoặc PowerShell trên máy tính chạy server, gõ: `ipconfig`.
2. Tìm địa chỉ **IPv4 Address** của máy tính (ví dụ: `192.168.1.15`).
3. Mở trình duyệt (Safari / Chrome) trên điện thoại và truy cập: `http://192.168.1.15:3000`.

---

## 6. Cấu trúc mã nguồn & Dữ liệu JSON

```
DauTruongNgonNgu/
├── data/                       # Thư mục cơ sở dữ liệu JSON (không công khai qua web)
│   ├── questions/              # 4 kho câu hỏi chuẩn
│   │   ├── round1_khoi_dong.json (100 câu: 60 dễ, 30 vừa, 10 khó)
│   │   ├── round2_tranh_tai.json (100 câu: 30 dễ, 50 vừa, 20 khó)
│   │   ├── round3_ban_ket.json   (100 câu: 20 dễ, 40 vừa, 40 khó)
│   │   └── round4_chung_ket.json (100 câu: 10 dễ, 30 vừa, 60 khó)
│   ├── crosswords.json         # Danh sách các bộ ô chữ Chung kết đã duyệt
│   ├── seasons.json            # Cấu hình mùa giải & luật thi đấu
│   ├── players.json            # Danh sách hồ sơ người chơi
│   ├── attempts.json           # Toàn bộ lịch sử các lượt thi đấu
│   ├── audit_logs.json         # Nhật ký thay đổi quản trị
│   └── admin_config.json       # Cấu hình đăng nhập Admin (Bcrypt hash)
├── public/                     # Thư mục tài nguyên tĩnh Frontend
│   ├── css/
│   │   └── style.css           # Design system mobile-first 480px
│   ├── js/
│   │   ├── api.js              # Module giao tiếp REST API
│   │   ├── audio.js            # Synthesizer Web Audio API
│   │   ├── app.js              # Logic Single Page App người chơi
│   │   └── admin.js            # Logic trang quản trị viên
│   ├── index.html              # Màn hình chính người chơi
│   └── admin.html              # Màn hình quản trị Admin
├── server/                     # Kiến trúc máy chủ Backend
│   ├── auth/                   # Quản lý xác thực người chơi & Admin
│   ├── storage/jsonStore.js    # Hàng đợi ghi JSON an toàn (Atomic Queue)
│   ├── services/               # Nghiệp vụ: đề thi, ô chữ, tính điểm, xếp hạng
│   ├── routes/                 # Các API Endpoints
│   └── app.js                  # Khởi tạo Express App bảo mật
├── scripts/                    # Scripts công cụ
│   ├── seed_data.js            # Nạp dữ liệu 400 câu + 5 bộ ô chữ
│   ├── validate_questions.js   # Kiểm tra nghiệm thu tự động ngân hàng câu
│   ├── seed_demo.js            # Tạo/xóa kết quả mẫu demo
│   ├── setup_admin.js          # Cấu hình tài khoản admin
│   └── backup.js               # Sao lưu và phục hồi dữ liệu
├── tests/                      # Bộ kiểm thử tự động toàn diện
├── server.js                   # Entry point chạy server
├── package.json
└── README.md
```

---

## 7. Ngân hàng 400 câu hỏi & Quản lý đề
- Hệ thống có đúng **400 câu hỏi chuẩn xác tiếng Việt**, chia đều cho 4 vòng (mỗi vòng 100 câu).
- Phân bố độ khó:
  + Vòng 1 (Khởi động): 60 dễ, 30 vừa, 10 khó. Đề 10 câu: **6 dễ / 3 vừa / 1 khó**.
  + Vòng 2 (Tranh tài): 30 dễ, 50 vừa, 20 khó. Đề 10 câu: **3 dễ / 5 vừa / 2 khó**.
  + Vòng 3 (Bán kết): 20 dễ, 40 vừa, 40 khó. Đề 10 câu: **2 dễ / 4 vừa / 4 khó**.
  + Vòng 4 (Chung kết): 10 dễ, 30 vừa, 60 khó. Đề 10 câu: **1 dễ / 3 vừa / 6 khó**.
- Chạy kiểm tra nghiệm thu câu hỏi:
  ```bash
  npm run validate
  ```

---

## 8. Cơ chế Ô Chữ Chung kết & Thuật toán sinh
- Vòng Chung kết gồm 10 hàng ngang. Khi trả lời xong mỗi câu (kể cả đúng hay sai), chữ cái hàng ngang tương ứng sẽ được mở.
- **Bảo mật**: Trước khi phần đoán từ khóa kết thúc, server **tuyệt đối không gửi vị trí cột dọc hoặc từ khóa bí mật** xuống client.
- Sau câu 10, thí sinh có 10 giây để gõ từ khóa dự đoán (chấp nhận có/không dấu, tự động chuẩn hóa).
- Đúng nhận ngay **+100 điểm thưởng**. Sau khi nộp (hoặc hết giờ), toàn bộ cột dọc của ô chữ sẽ bừng sáng với màu cam rực rỡ!
- **Tạo bộ ô chữ tự động trong trang Admin**:
  Vào tab **Ô Chữ** trong Admin, nhập từ khóa 10 chữ cái mong muốn (ví dụ: `ĐẤT NƯỚC TÔI`, `BẢN SẮC VIỆT`). Hệ thống sẽ chạy thuật toán Backtracking thông minh để ghép 10 câu tương thích từ kho 100 câu Chung kết bảo đảm chính xác tỷ lệ 1 Dễ / 3 Vừa / 6 Khó!

---

## 9. Bảng Xếp Hạng & Đồng Hạng
Bảng xếp hạng áp dụng cho các lượt chơi đã hoàn thành đủ 4 vòng và kết thúc phần đoán từ khóa. Mỗi thí sinh chỉ xuất hiện một lần bằng **lượt chơi tốt nhất**.

Tiêu chí xếp hạng theo thứ tự ưu tiên:
1. **Tổng điểm cao hơn**.
2. **Số câu trắc nghiệm đúng nhiều hơn** (0 đến 40 câu).
3. **Tổng thời gian trả lời 40 câu trắc nghiệm thấp hơn** (tính bằng mili-giây, câu hết giờ tính 10.000ms, không cộng thời gian đọc giải thích hay thời gian đoán từ khóa).
4. Nếu vẫn bằng nhau -> **Đồng hạng chuẩn thể thao** (1, 2, 2, 4).

Bộ lọc thời gian theo múi giờ Việt Nam (`Asia/Ho_Chi_Minh`):
- Mùa này (Toàn thời gian trong mùa).
- Tuần này (Thứ Hai đến Chủ Nhật).
- Tháng này.

---

## 10. Sao lưu & Phục hồi dữ liệu

### Tạo bản sao lưu mới:
```bash
npm run backup
```
File sao lưu sẽ được lưu vào thư mục `data/backups/backup_YYYY-MM-DD...`.

### Khôi phục từ bản sao lưu:
```bash
node scripts/backup.js restore <ten_thu_muc_sao_luu>
```

---

## 11. Giới hạn kiến trúc đơn tiến trình
- Dự án sử dụng mô hình lưu trữ cơ sở dữ liệu trên các tệp tin JSON cục bộ kết hợp hàng đợi bất đồng bộ tuần tự (`writeQueues`).
- **Giới hạn kỹ thuật**: Ứng dụng được thiết kế và cấu hình tối ưu để chạy trên **một tiến trình Node.js duy nhất (Single Process)**. Không chạy đồng thời nhiều instance qua cluster hoặc nhiều tiến trình ghi cùng lúc vào thư mục `data/` để tránh xung đột ghi đè tệp tin trên hệ điều hành.

---

## 12. Phân biệt hồ sơ trải nghiệm & Xác minh danh tính
- Hệ thống hỗ trợ người chơi tham gia nhanh chóng bằng cách nhập tên hiển thị (tùy chọn MSSV và Lớp) mà không cần mật khẩu rườm rà.
- Bảng xếp hạng ghi rõ: **"Xếp hạng trải nghiệm: đề thi ngẫu nhiên theo cùng cấu hình độ khó; danh tính sinh viên tự khai báo chưa được xác minh chính thức"**.
- Hai sinh viên trùng tên nhau vẫn có hồ sơ và `playerId` riêng biệt, độc lập.

---

## 13. Kiểm thử nghiệm thu (Testing)
Chạy toàn bộ 6 test suites kiểm thử tự động:
```bash
npm test
```
Kết quả kiểm thử bao gồm:
- Kiểm tra 400 câu hỏi, cấu trúc, phân bố độ khó, tính duy nhất của ID.
- Kiểm tra 5 bộ ô chữ Chung kết hợp lệ.
- Kiểm tra tính điểm từng vòng, hạn giờ 10s, cơ chế idempotent.
- Kiểm tra toàn bộ luồng chơi 4 vòng và đoán từ khóa tối đa 1.100 điểm.
- Kiểm tra bảng xếp hạng, tiêu chí đồng hạng 1, 2, 2, 4, loại trừ disqualified.
- Kiểm tra an toàn bảo mật, phân biệt trùng tên, mã khôi phục và session.

---
*Phát triển bởi Bộ môn CNTT • Cao đẳng FPT Polytechnic*
