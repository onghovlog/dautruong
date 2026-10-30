/**
 * 100 câu hỏi Vòng Tranh tài (Kho 2)
 * Phân bố: 30 Dễ, 50 Vừa, 20 Khó
 */
export const round2Questions = [
  // --- 30 CÂU DỄ (TT-001 đến TT-030) ---
  {
    id: "TT-001",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "de",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Trôi chảy" },
      { id: "B", text: "Chôi chảy" },
      { id: "C", text: "Trôi trảy" },
      { id: "D", text: "Chôi trảy" }
    ],
    correctOptionId: "A",
    explanation: "'Trôi chảy' viết với 'tr' ở tiếng đầu và 'ch' ở tiếng sau, chỉ sự thông suốt, không bị ngắc ngứ.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-002",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "de",
    question: "Điền từ vào thành ngữ: 'Kính trên nhường ...'.",
    options: [
      { id: "A", text: "dưới" },
      { id: "B", text: "sau" },
      { id: "C", text: "bạn" },
      { id: "D", text: "em" }
    ],
    correctOptionId: "A",
    explanation: "'Kính trên nhường dưới' dạy cách đối nhân xử thế văn minh, tôn trọng người lớn và yêu thương người nhỏ.",
    source: "Từ điển Thành ngữ Việt Nam"
  },
  {
    id: "TT-003",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Từ nào đồng nghĩa với từ 'chăm chỉ'?",
    options: [
      { id: "A", text: "Cần cù" },
      { id: "B", text: "Lười biếng" },
      { id: "C", text: "Chểnh mảng" },
      { id: "D", text: "Thảnh thơi" }
    ],
    correctOptionId: "A",
    explanation: "'Cần cù' và 'chăm chỉ' đều biểu thị tinh thần nỗ lực siêng năng làm việc.",
    source: "Từ điển Từ đồng nghĩa"
  },
  {
    id: "TT-004",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "de",
    question: "Câu ca dao: 'Nhiễu điều phủ lấy giá gương / Người trong một nước phải ... nhau cùng'.",
    options: [
      { id: "A", text: "thương" },
      { id: "B", text: "yêu" },
      { id: "C", text: "giúp" },
      { id: "D", text: "đùm" }
    ],
    correctOptionId: "A",
    explanation: "Truyền thống yêu thương đùm bọc đồng bào của dân tộc Việt Nam: 'phải thương nhau cùng'.",
    source: "Ca dao dân ca Việt Nam"
  },
  {
    id: "TT-005",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "de",
    question: "Chọn từ viết ĐÚNG chính tả:",
    options: [
      { id: "A", text: "Xúc tích" },
      { id: "B", text: "Súc tích" },
      { id: "C", text: "Xúc trích" },
      { id: "D", text: "Súc trích" }
    ],
    correctOptionId: "B",
    explanation: "'Súc tích' (chữ Hán: 蓄 積 nghĩa là tích lũy dồi dào, hàm súc ngắn gọn). Viết 'xúc tích' là sai âm.",
    source: "Từ điển Tiếng Việt Hoàng Phê"
  },
  {
    id: "TT-006",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "de",
    question: "'Giấy rách phải giữ lấy ...'. Điền từ còn thiếu vào câu tục ngữ:",
    options: [
      { id: "A", text: "lề" },
      { id: "B", text: "bìa" },
      { id: "C", text: "chữ" },
      { id: "D", text: "trang" }
    ],
    correctOptionId: "A",
    explanation: "'Giấy rách phải giữ lấy lề' khuyên con người dù trong hoàn cảnh khốn khó vẫn phải giữ gìn nhân phẩm, khí tiết.",
    source: "Kho tàng tục ngữ người Việt"
  },
  {
    id: "TT-007",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Từ 'ngoa dụ' dùng để chỉ phép:",
    options: [
      { id: "A", text: "Nói quá / Cường điệu" },
      { id: "B", text: "Nói giảm nói tránh" },
      { id: "C", text: "Chơi chữ" },
      { id: "D", text: "So sánh ngầm" }
    ],
    correctOptionId: "A",
    explanation: "'Ngoa dụ' là thuật ngữ chỉ biện pháp phóng đại, nói quá trong văn học.",
    source: "Thuật ngữ Văn học"
  },
  {
    id: "TT-008",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "de",
    question: "'Tháp Mười đẹp nhất bông sen / Việt Nam đẹp nhất có tên ...'. Điền tên nhân vật:",
    options: [
      { id: "A", text: "Bác Hồ" },
      { id: "B", text: "Quang Trung" },
      { id: "C", text: "Lê Lợi" },
      { id: "D", text: "Võ Nguyên Giáp" }
    ],
    correctOptionId: "A",
    explanation: "Hai câu thơ nổi tiếng của nhà thơ Bảo Định Giang ca ngợi Chủ tịch Hồ Chí Minh vĩ đại.",
    source: "Thơ ca cách mạng Việt Nam"
  },
  {
    id: "TT-009",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "de",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Giả thiết" },
      { id: "B", text: "Giả thuyết" },
      { id: "C", text: "Cả A và B đều đúng nhưng có nghĩa khoa học khác nhau" },
      { id: "D", text: "Cả A và B đều sai" }
    ],
    correctOptionId: "C",
    explanation: "'Giả thiết' dùng trong toán học/logic (tiền đề chứng minh); 'Giả thuyết' dùng trong khoa học lý thuyết (luận điểm giả định cần kiểm chứng).",
    source: "Từ điển Thuật ngữ Khoa học"
  },
  {
    id: "TT-010",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "de",
    question: "Thành ngữ nào sau đây biểu thị tình trạng bất hòa sâu sắc, không đội trời chung?",
    options: [
      { id: "A", text: "Như nước với lửa" },
      { id: "B", text: "Như cá gặp nước" },
      { id: "C", text: "Như hình với bóng" },
      { id: "D", text: "Như tay với chân" }
    ],
    correctOptionId: "A",
    explanation: "'Như nước với lửa' tượng trưng cho sự xung khắc triệt để, không thể dung hòa.",
    source: "Từ điển Thành ngữ Việt Nam"
  },
  {
    id: "TT-011",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Từ nào sau đây là từ tượng hình?",
    options: [
      { id: "A", text: "Lêu nghêu" },
      { id: "B", text: "Rì rầm" },
      { id: "C", text: "Ào ào" },
      { id: "D", text: "Lộp độp" }
    ],
    correctOptionId: "A",
    explanation: "'Lêu nghêu' gợi tả dáng người cao lêu khêu gầy gò (hình ảnh), còn 3 từ kia là tượng thanh.",
    source: "Ngữ pháp Tiếng Việt"
  },
  {
    id: "TT-012",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "de",
    question: "Truyện thơ 'Lục Vân Tiên' là kiệt tác của danh nhân văn hóa nào?",
    options: [
      { id: "A", text: "Nguyễn Đình Chiểu" },
      { id: "B", text: "Cao Bá Quát" },
      { id: "C", text: "Nguyễn Khuyến" },
      { id: "D", text: "Phan Văn Trị" }
    ],
    correctOptionId: "A",
    explanation: "Nhà thơ mù yêu nước Nguyễn Đình Chiểu (Đồ Chiểu) sáng tác Truyện Lục Vân Tiên thấm đẫm tinh thần trượng nghĩa.",
    source: "Văn học sử Việt Nam"
  },
  {
    id: "TT-013",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "de",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Chắt chiu" },
      { id: "B", text: "Trắt triu" },
      { id: "C", text: "Chắt triu" },
      { id: "D", text: "Trắt chiu" }
    ],
    correctOptionId: "A",
    explanation: "'Chắt chiu' (dành dụm, nâng niu từng chút) viết với âm đầu 'ch' ở cả hai tiếng.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-014",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "de",
    question: "Điền từ: 'Tốt gỗ hơn tốt ...'.",
    options: [
      { id: "A", text: "sơn" },
      { id: "B", text: "bóng" },
      { id: "C", text: "màu" },
      { id: "D", text: "bàn" }
    ],
    correctOptionId: "A",
    explanation: "'Tốt gỗ hơn tốt sơn' nhắc nhở coi trọng phẩm chất bên trong hơn vẻ hào nhoáng bề ngoài.",
    source: "Kho tàng tục ngữ người Việt"
  },
  {
    id: "TT-015",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Từ 'nghĩa vụ' mang ý nghĩa là gì?",
    options: [
      { id: "A", text: "Điều bắt buộc phải làm theo pháp luật hoặc đạo đức xã hội" },
      { id: "B", text: "Quyền lợi cá nhân được hưởng thụ" },
      { id: "C", text: "Sở thích riêng tư lúc rảnh rỗi" },
      { id: "D", text: "Công việc kinh doanh kiếm lời" }
    ],
    correctOptionId: "A",
    explanation: "'Nghĩa vụ' là trách nhiệm pháp lý hoặc luân lý mà cá nhân bắt buộc phải thực hiện đối với cộng đồng.",
    source: "Từ điển Luật học & Tiếng Việt"
  },
  {
    id: "TT-016",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "de",
    question: "'Học ăn, học nói, học ... , học mở'. Điền từ còn thiếu vào câu tục ngữ:",
    options: [
      { id: "A", text: "gói" },
      { id: "B", text: "viết" },
      { id: "C", text: "đọc" },
      { id: "D", text: "nghe" }
    ],
    correctOptionId: "A",
    explanation: "'Học gói' là kỹ năng sống và cư xử khéo léo, kín đáo, biết sắp xếp chu tất mọi việc.",
    source: "Tục ngữ Việt Nam"
  },
  {
    id: "TT-017",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "de",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Bẽ bàng" },
      { id: "B", text: "Bẻ bàng" },
      { id: "C", text: "Bẽ bàn" },
      { id: "D", text: "Bẻ bàn" }
    ],
    correctOptionId: "A",
    explanation: "'Bẽ bàng' (xấu hổ, tủi hổ vì sự việc không như ý) viết bằng dấu ngã 'bẽ'.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-018",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "de",
    question: "Thành ngữ 'Ngựa quen đường cũ' chỉ thói quen nào?",
    options: [
      { id: "A", text: "Trí nhớ tốt của động vật" },
      { id: "B", text: "Chứng nào tật nấy, quay lại lỗi lầm hoặc thói xấu cũ" },
      { id: "C", text: "Tính trung thành với chủ" },
      { id: "D", text: "Khả năng tìm đường khéo léo" }
    ],
    correctOptionId: "B",
    explanation: "'Ngựa quen đường cũ' chê trách những kẻ không chịu sửa đổi thói hư tật xấu dù đã nhiều lần khuyên bảo.",
    source: "Từ điển Thành ngữ Việt Nam"
  },
  {
    id: "TT-019",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Từ nào sau đây trái nghĩa với 'hào phóng'?",
    options: [
      { id: "A", text: "Rộng lượng" },
      { id: "B", text: "Keo kiệt" },
      { id: "C", text: "Xởi lởi" },
      { id: "D", text: "Cởi mở" }
    ],
    correctOptionId: "B",
    explanation: "'Hào phóng' (rộng rãi tiền của) trái ngược với 'keo kiệt' (bủn xỉn, bần tiện).",
    source: "Từ điển Từ trái nghĩa"
  },
  {
    id: "TT-020",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "de",
    question: "Ai là tác giả bài thơ 'Quê hương' với câu thơ: 'Quê hương là chùm khế ngọt / Cho con trèo hái mỗi ngày'?",
    options: [
      { id: "A", text: "Đỗ Trung Quân" },
      { id: "B", text: "Giang Nam" },
      { id: "C", text: "Tế Hanh" },
      { id: "D", text: "Nguyễn Duy" }
    ],
    correctOptionId: "A",
    explanation: "Bài thơ 'Quê hương' của nhà thơ Đỗ Trung Quân (nhạc sĩ Giáp Văn Thạch phổ nhạc) đi sâu vào lòng nhiều thế hệ.",
    source: "Thơ Việt Nam thế kỷ XX"
  },
  {
    id: "TT-021",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "de",
    question: "Chọn từ viết ĐÚNG chính tả tiếng Việt:",
    options: [
      { id: "A", text: "Ngoại lệ" },
      { id: "B", text: "Ngoại nệ" },
      { id: "C", text: "Ngoài lệ" },
      { id: "D", text: "Ngoài nệ" }
    ],
    correctOptionId: "A",
    explanation: "'Ngoại lệ' (trường hợp nằm ngoài lệ thường) viết với âm 'l'.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-022",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "de",
    question: "'Thuốc đắng dã tật, sự thật mất ...'. Điền từ còn thiếu vào câu tục ngữ:",
    options: [
      { id: "A", text: "lòng" },
      { id: "B", text: "tiền" },
      { id: "C", text: "bạn" },
      { id: "D", text: "công" }
    ],
    correctOptionId: "A",
    explanation: "'Sự thật mất lòng' có nghĩa là lời nói thẳng thắn, chân thật tuy khó nghe nhưng lại rất có ích.",
    source: "Kho tàng tục ngữ người Việt"
  },
  {
    id: "TT-023",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Từ 'nghĩa bộc' trong văn học cổ có nghĩa là gì?",
    options: [
      { id: "A", text: "Người đầy tớ trung thành, tận tụy vì nghĩa" },
      { id: "B", text: "Người bạn hữu kết nghĩa" },
      { id: "C", text: "Vị quan thanh liêm" },
      { id: "D", text: "Người lính dũng cảm" }
    ],
    correctOptionId: "A",
    explanation: "'Bộc' nghĩa là kẻ hầu, gia nhân; 'nghĩa bộc' là tôi tớ trung nghĩa, hết lòng phò tá chủ nhân.",
    source: "Từ điển Hán Việt"
  },
  {
    id: "TT-024",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "de",
    question: "'Thuyền về có nhớ bến chăng / Bến thì một dạ khăng khăng ... thuyền'. Điền từ đúng:",
    options: [
      { id: "A", text: "đợi" },
      { id: "B", text: "chờ" },
      { id: "C", text: "trông" },
      { id: "D", text: "mong" }
    ],
    correctOptionId: "A",
    explanation: "Câu ca dao mượn hình ảnh thuyền và bến để khẳng định tấm lòng thủy chung son sắt trong tình yêu.",
    source: "Ca dao dân ca Việt Nam"
  },
  {
    id: "TT-025",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "de",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "San sẻ" },
      { id: "B", text: "San xẻ" },
      { id: "C", text: "Xan sẻ" },
      { id: "D", text: "Xan xẻ" }
    ],
    correctOptionId: "A",
    explanation: "'San sẻ' (chia sẻ bớt niềm vui nỗi buồn) cả hai tiếng đều viết bằng 's'.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-026",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "de",
    question: "Thành ngữ 'Vắt cổ chày ra nước' châm biếm đối tượng nào?",
    options: [
      { id: "A", text: "Kẻ bủn xỉn, keo kiệt đến cùng cực" },
      { id: "B", text: "Người chăm chỉ giặt giũ" },
      { id: "C", text: "Người có sức khỏe phi thường" },
      { id: "D", text: "Kẻ nói nhiều làm ít" }
    ],
    correctOptionId: "A",
    explanation: "Cái chày gỗ khô khốc không thể có nước, 'vắt cổ chày ra nước' ví thói keo kiệt đến mức phi lý.",
    source: "Từ điển Thành ngữ Việt Nam"
  },
  {
    id: "TT-027",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Từ 'ngoa ngôn' mang ý nghĩa là gì?",
    options: [
      { id: "A", text: "Lời nói phóng đại, khoác lác hoặc xấc xược" },
      { id: "B", text: "Lời nói nhã nhặn, dịu dàng" },
      { id: "C", text: "Lời phát biểu trước hội nghị" },
      { id: "D", text: "Lời hứa chân thành" }
    ],
    correctOptionId: "A",
    explanation: "'Ngoa ngôn' là lời nói sai sự thật, thổi phồng hoặc ngoan cố bướng bỉnh.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-028",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "de",
    question: "'Rủ nhau xuống bể mò cua / Đem về nấu quả mơ chua ...'. Điền từ thích hợp:",
    options: [
      { id: "A", text: "nấu canh" },
      { id: "B", text: "rừng" },
      { id: "C", text: "đắng cay" },
      { id: "D", text: "chua cay" }
    ],
    correctOptionId: "A",
    explanation: "'Rủ nhau xuống bể mò cua / Đem về nấu quả mơ chua nấu canh' là câu ca dao dân dã quen thuộc.",
    source: "Ca dao cổ truyền"
  },
  {
    id: "TT-029",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "de",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Gọn gàng" },
      { id: "B", text: "Gọn gàn" },
      { id: "C", text: "Rọn ràng" },
      { id: "D", text: "Dọn dàng" }
    ],
    correctOptionId: "A",
    explanation: "'Gọn gàng' viết với âm đầu 'g' và vần 'ang' ở tiếng thứ hai.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-030",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "de",
    question: "Thành ngữ 'Tay bắt mặt mừng' biểu lộ cảm xúc gì?",
    options: [
      { id: "A", text: "Sự mừng rỡ, niềm nở và thân mật khi hội ngộ" },
      { id: "B", text: "Thái độ nghi kỵ, cảnh giác" },
      { id: "C", text: "Sự xã giao gượng gạo" },
      { id: "D", text: "Nỗi sợ hãi lo âu" }
    ],
    correctOptionId: "A",
    explanation: "'Tay bắt mặt mừng' diễn tả niềm vui chân thành khi người thân quen gặp lại nhau.",
    source: "Từ điển Thành ngữ Việt Nam"
  },

  // --- 50 CÂU VỪA (TT-031 đến TT-080) ---
  {
    id: "TT-031",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Bạt tiệp" },
      { id: "B", text: "Bạt thiệp" },
      { id: "C", text: "Bát thiệp" },
      { id: "D", text: "Bát tiệp" }
    ],
    correctOptionId: "C",
    explanation: "Từ đúng là 'Bát thiệp' (chữ Hán: 八 涉, nghĩa là giao thiệp rộng rãi, khéo léo trong ứng xử).",
    source: "Từ điển Hán Việt Đào Duy Anh"
  },
  {
    id: "TT-032",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Ý nghĩa của từ 'ngao du' là gì?",
    options: [
      { id: "A", text: "Đi chơi nhàn tản, tự do tự tại khắp nơi không vướng bận" },
      { id: "B", text: "Đi tuần tra bảo vệ biên cương" },
      { id: "C", text: "Đi buôn bán đường dài" },
      { id: "D", text: "Bỏ nhà đi bụi" }
    ],
    correctOptionId: "A",
    explanation: "'Ngao du' (chữ Hán: 遨 遊) là đi du ngoạn thong dong, thưởng ngoạn cảnh sắc thiên nhiên non nước.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-033",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Thành ngữ 'Vô tiền khoáng hậu' có hàm ý gì?",
    options: [
      { id: "A", text: "Chưa từng có trước đây và cũng sẽ không bao giờ có sau này" },
      { id: "B", text: "Trước sau không có một đồng tiền dính túi" },
      { id: "C", text: "Việc làm không có kế hoạch rõ ràng" },
      { id: "D", text: "Mối quan hệ không phân biệt trên dưới" }
    ],
    correctOptionId: "A",
    explanation: "'Vô tiền' (trước không có), 'khoáng hậu' (sau cũng vắng bóng), ca ngợi thành tựu phi thường kỳ diệu.",
    source: "Từ điển Thành ngữ Hán Việt"
  },
  {
    id: "TT-034",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Bài thơ 'Đây thôn Vĩ Dạ' của Hàn Mặc Tử lấy cảm hứng từ mối tình đơn phương với ai?",
    options: [
      { id: "A", text: "Hoàng Thị Kim Cúc" },
      { id: "B", text: "Mộng Cầm" },
      { id: "C", text: "Mai Đình" },
      { id: "D", text: "Ngọc Sương" }
    ],
    correctOptionId: "A",
    explanation: "Bức bưu thiếp phong cảnh xứ Huế kèm lời hỏi thăm của Hoàng Cúc đã khơi nguồn cảm hứng sáng tác bài thơ tuyệt phẩm này.",
    source: "Hàn Mặc Tử - Cuộc đời và thơ"
  },
  {
    id: "TT-035",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Chọn từ viết ĐÚNG chính tả chỉ sự xem xét cẩn thận:",
    options: [
      { id: "A", text: "Dò xét" },
      { id: "B", text: "Giò xét" },
      { id: "C", text: "Dò sét" },
      { id: "D", text: "Giò sét" }
    ],
    correctOptionId: "A",
    explanation: "'Dò xét' viết bằng 'd' (dò la, thăm dò) và 'xét' (xem xét).",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-036",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Từ 'nguyên tiêu' chỉ thời điểm nào trong năm âm lịch?",
    options: [
      { id: "A", text: "Đêm rằm tháng Giêng" },
      { id: "B", text: "Đêm Giao thừa 30 Tết" },
      { id: "C", text: "Đêm rằm tháng Bảy" },
      { id: "D", text: "Đêm rằm Trung thu" }
    ],
    correctOptionId: "A",
    explanation: "'Nguyên' là đầu tiên, 'tiêu' là đêm. 'Nguyên tiêu' là đêm trăng tròn đầu tiên trong năm mới (Rằm tháng Giêng).",
    source: "Từ điển Lễ hội và Phong tục Á Đông"
  },
  {
    id: "TT-037",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "'Tránh vỏ dưa gặp vỏ dừa' nói lên quy luật tâm lý hoặc hoàn cảnh nào?",
    options: [
      { id: "A", text: "Cố tránh một tai họa nhỏ lại đụng phải tai họa khác còn nặng nề hơn" },
      { id: "B", text: "Sự vụng về khi đi mua trái cây" },
      { id: "C", text: "Người may mắn thoát hiểm trong gang tấc" },
      { id: "D", text: "Hai tai họa giống hệt nhau về bản chất" }
    ],
    correctOptionId: "A",
    explanation: "'Vỏ dừa' cứng và nguy hiểm hơn 'vỏ dưa', ý nói né mối nguy này lại rơi vào mối nguy hiểm hơn.",
    source: "Kho tàng tục ngữ người Việt"
  },
  {
    id: "TT-038",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Trong bài 'Bình Ngô đại cáo', Nguyễn Trãi viết: 'Độc ác thay, trúc Lam Sơn không ghi hết tội / Dơ bẩn thay, nước ... không rửa sạch mùi'. Điền địa danh:",
    options: [
      { id: "A", text: "Đông Hải" },
      { id: "B", text: "Bạch Đằng" },
      { id: "C", text: "Nhị Hà" },
      { id: "D", text: "Hồng Hà" }
    ],
    correctOptionId: "A",
    explanation: "'Quyết Đông Hải chi thủy, bất túc dĩ trấp kỳ ô' (Nước Đông Hải không rửa sạch mùi).",
    source: "Bình Ngô đại cáo - Nguyễn Trãi"
  },
  {
    id: "TT-039",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Từ nào sau đây viết ĐÚNG chính tả tiếng Việt?",
    options: [
      { id: "A", text: "Sơ sài" },
      { id: "B", text: "Sơ xài" },
      { id: "C", text: "Xơ sài" },
      { id: "D", text: "Xơ xài" }
    ],
    correctOptionId: "A",
    explanation: "'Sơ sài' (đơn giản, thiếu thốn, không chu đáo) viết với 's' ở cả hai tiếng.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-040",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Từ 'ngoa ngắt' thường được dùng phổ biến để miêu tả tiếng gáy của loài chim nào trong thơ xưa?",
    options: [
      { id: "A", text: "Chim tu hú kêu vào mùa hè" },
      { id: "B", text: "Tiếng gà gáy trưa gay gắt" },
      { id: "C", text: "Tiếng chim quốc (cuốc) kêu đêm" },
      { id: "D", text: "Tiếng chim chích chòe" }
    ],
    correctOptionId: "B",
    explanation: "Từ 'ngoa ngắt' trong ngữ cảnh tiếng động thường dùng chỉ tiếng gà gáy dội lên gắt gao giữa trưa hè.",
    source: "Từ điển Văn học Dân gian"
  },
  {
    id: "TT-041",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Thành ngữ 'Văn hóa phi vật thể' bao gồm những yếu tố nào?",
    options: [
      { id: "A", text: "Các công trình kiến trúc đền đài kiên cố" },
      { id: "B", text: "Lễ hội, diễn xướng dân gian, tiếng nói, chữ viết, nghề thủ công truyền thống" },
      { id: "C", text: "Cổ vật và bảo vật quốc gia" },
      { id: "D", text: "Danh lam thắng cảnh tự nhiên" }
    ],
    correctOptionId: "B",
    explanation: "Di sản phi vật thể tồn tại dưới dạng ký ức, thực hành xã hội, kỹ năng và nghệ thuật biểu diễn.",
    source: "Luật Di sản Văn hóa Việt Nam"
  },
  {
    id: "TT-042",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "'Tiếng suối trong như tiếng hát xa / Ánh trăng lồng cổ thụ, bóng lồng hoa'. Hai câu thơ trích từ bài thơ nào của Hồ Chí Minh?",
    options: [
      { id: "A", text: "Cảnh khuya" },
      { id: "B", text: "Rằm tháng giêng" },
      { id: "C", text: "Tin thắng trận" },
      { id: "D", text: "Đi thuyền trên sông Đáy" }
    ],
    correctOptionId: "A",
    explanation: "Bài thơ tứ tuyệt 'Cảnh khuya' sáng tác năm 1947 tại chiến khu Việt Bắc thể hiện tâm hồn thi sĩ và tinh thần chiến sĩ.",
    source: "Thơ Hồ Chí Minh"
  },
  {
    id: "TT-043",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Chưng cất" },
      { id: "B", text: "Trưng cất" },
      { id: "C", text: "Chưng cất" },
      { id: "D", text: "Trưng cấc" }
    ],
    correctOptionId: "A",
    explanation: "'Chưng cất' (phương pháp đun sôi tách chất) viết bằng 'ch'.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-044",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Từ 'ngẫu nhiên' biểu đạt ý niệm gì?",
    options: [
      { id: "A", text: "Hiện tượng xảy ra bất ngờ, không do quy luật tất yếu định trước" },
      { id: "B", text: "Việc đã được dự báo từ lâu" },
      { id: "C", text: "Hành động có chủ đích rõ rệt" },
      { id: "D", text: "Hiện tượng diễn ra theo chu kỳ cố định" }
    ],
    correctOptionId: "A",
    explanation: "'Ngẫu nhiên' là phạm trù triết học chỉ cái diễn ra không do mối liên hệ bản chất bên trong quyết định.",
    source: "Từ điển Triết học & Ngôn ngữ"
  },
  {
    id: "TT-045",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Ý nghĩa của thành ngữ 'Dâu hiền rể thảo' là gì?",
    options: [
      { id: "A", text: "Người con dâu nết na và người con rể hiếu nghĩa với cha mẹ" },
      { id: "B", text: "Lễ vật thách cưới thời phong kiến" },
      { id: "C", text: "Sự phân chia tài sản thừa kế" },
      { id: "D", text: "Gia đình làm nghề trồng dâu nuôi tằm" }
    ],
    correctOptionId: "A",
    explanation: "'Hiền' (hiền thục, nết na), 'thảo' (hiếu thảo), ngợi ca con dâu con rể biết hiếu kính phụng dưỡng gia đình.",
    source: "Thành ngữ Việt Nam"
  },
  {
    id: "TT-046",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Tác giả của bài thơ 'Ánh trăng' ('Hồi nhỏ sống với đồng / với sông rồi với bể...') là ai?",
    options: [
      { id: "A", text: "Nguyễn Duy" },
      { id: "B", text: "Phạm Tiến Duật" },
      { id: "C", text: "Thanh Hải" },
      { id: "D", text: "Hữu Thỉnh" }
    ],
    correctOptionId: "A",
    explanation: "'Ánh trăng' là bài thơ triết lý sâu sắc của Nguyễn Duy sáng tác năm 1978 tại TP.HCM.",
    source: "SGK Ngữ văn lớp 9"
  },
  {
    id: "TT-047",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Chọn từ viết ĐÚNG chính tả tiếng Việt:",
    options: [
      { id: "A", text: "Bàng quang" },
      { id: "B", text: "Bàng quan" },
      { id: "C", text: "Cả A và B đều đúng tùy nghĩa: A là cơ quan bài tiết, B là thái độ thờ ơ" },
      { id: "D", text: "Cả A và B đều sai" }
    ],
    correctOptionId: "C",
    explanation: "'Bàng quang' là bọng chứa nước tiểu; 'Bàng quan' là đứng ngoài cuộc, dửng dưng không dính líu.",
    source: "Từ điển Tiếng Việt Hoàng Phê"
  },
  {
    id: "TT-048",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Từ 'nghĩa khí' và 'dũng khí' khác biệt ở điểm nào?",
    options: [
      { id: "A", text: "'Nghĩa khí' hướng tới lý tưởng công lý, đạo lý chính nghĩa; 'dũng khí' nhấn mạnh sự can đảm không sợ hãi" },
      { id: "B", text: "'Nghĩa khí' chỉ dùng cho phụ nữ" },
      { id: "C", text: "'Dũng khí' luôn mang ý xấu" },
      { id: "D", text: "Hai từ hoàn toàn không có sự khác biệt" }
    ],
    correctOptionId: "A",
    explanation: "'Nghĩa' gắn liền với chuẩn mực đạo đức lẽ phải, còn 'dũng' là sức mạnh tinh thần vượt qua nguy sợ.",
    source: "Từ điển Từ đồng nghĩa Tiếng Việt"
  },
  {
    id: "TT-049",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "'Qua cầu rút ván' dùng để chỉ hành vi đáng khinh bỉ nào?",
    options: [
      { id: "A", text: "Qua sông rồi phá vỡ lối đi, phụ bạc người đã giúp đỡ mình khi đạt được mục đích" },
      { id: "B", text: "Kỹ thuật phá hủy cầu ngăn quân giặc đuổi theo" },
      { id: "C", text: "Sự thận trọng quá mức khi di chuyển" },
      { id: "D", text: "Cách đóng cầu gỗ truyền thống" }
    ],
    correctOptionId: "A",
    explanation: "'Qua cầu rút ván' lên án những kẻ vong ân bội nghĩa, vừa xong việc là quay lưng phản bội ân nhân.",
    source: "Kho tàng thành ngữ người Việt"
  },
  {
    id: "TT-050",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Nhà thơ nào viết hai câu thơ nổi tiếng: 'Đầu súng trăng treo' trong bài 'Đồng chí'?",
    options: [
      { id: "A", text: "Chính Hữu" },
      { id: "B", text: "Hồng Nguyên" },
      { id: "C", text: "Tố Hữu" },
      { id: "D", text: "Vũ Cao" }
    ],
    correctOptionId: "A",
    explanation: "Hình ảnh thơ 'Đầu súng trăng treo' của Chính Hữu là biểu tượng đẹp đẽ kết hợp hiện thực chiến đấu và lãng mạn thi ca.",
    source: "Tác phẩm Đồng chí - Chính Hữu"
  },
  {
    id: "TT-051",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Tận tụy" },
      { id: "B", text: "Tận tuỵ" },
      { id: "C", text: "Cả A và B đều được chấp nhận trong từ điển" },
      { id: "D", text: "Tận trị" }
    ],
    correctOptionId: "C",
    explanation: "Cách viết 'tận tụy' (y dài) hay 'tận tuỵ' (i ngắn/y) đều xuất hiện trong các ấn bản từ điển quy chuẩn.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-052",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Thành ngữ 'Vạn sự khởi đầu nan' có nghĩa là:",
    options: [
      { id: "A", text: "Mọi công việc khi mới bắt đầu đều gặp nhiều khó khăn, thử thách" },
      { id: "B", text: "Mười nghìn việc bắt đầu đều dễ dàng" },
      { id: "C", text: "Làm việc nan giải không có kết quả" },
      { id: "D", text: "Bắt đầu việc gì cũng cần tiền tài" }
    ],
    correctOptionId: "A",
    explanation: "'Nan' là gian nan, vất vả; câu này động viên con người kiên trì vượt qua bước đầu chông gai.",
    source: "Từ điển Thành ngữ Hán Việt"
  },
  {
    id: "TT-053",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "'Đi một ngày đàng, học một ... khôn'. Điền từ đúng:",
    options: [
      { id: "A", text: "sàng" },
      { id: "B", text: "gang" },
      { id: "C", text: "bát" },
      { id: "D", text: "nồi" }
    ],
    correctOptionId: "A",
    explanation: "'Sàng' là dụng cụ đan bằng tre dùng sàng thóc, ở đây ẩn dụ cho lượng tri thức thu lượm được.",
    source: "Tục ngữ Việt Nam"
  },
  {
    id: "TT-054",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Bài ca dao: 'Hỡi cô tát nước bên đàng / Sao cô múc ánh trăng vàng ... đi'?",
    options: [
      { id: "A", text: "đổ" },
      { id: "B", text: "vứt" },
      { id: "C", text: "quăng" },
      { id: "D", text: "chia" }
    ],
    correctOptionId: "A",
    explanation: "Câu ca dao giao duyên lãng mạn, thi vị hóa công việc lao động tát nước đêm trăng của người thôn nữ.",
    source: "Ca dao trữ tình Việt Nam"
  },
  {
    id: "TT-055",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Ngoại cảm" },
      { id: "B", text: "Ngoại cản" },
      { id: "C", text: "Loại cảm" },
      { id: "D", text: "Loại cản" }
    ],
    correctOptionId: "A",
    explanation: "'Ngoại cảm' (khả năng cảm nhận siêu giác quan bên ngoài ngũ quan bình thường) viết với âm đầu 'ng'.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-056",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Từ 'ngoa ngữ' trong ngữ học chỉ loại ngôn ngữ nào?",
    options: [
      { id: "A", text: "Tiếng nước ngoài (ngoa là bên ngoài)" },
      { id: "B", text: "Lời nói dối trá" },
      { id: "C", text: "Tiếng địa phương hẹp hòi" },
      { id: "D", text: "Từ lóng giới trẻ" }
    ],
    correctOptionId: "A",
    explanation: "'Ngoa' (訛) có nghĩa là sai lệch, nhưng chữ 'Ngoại ngữ' thường viết là 外 語. Từ 'Ngoa ngữ' (ngoại quốc ngữ) theo nghĩa cổ là tiếng ngoại quốc.",
    source: "Từ điển Hán Việt Cổ"
  },
  {
    id: "TT-057",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Thành ngữ 'Vụng chèo khéo chống' tương tự với thành ngữ nào sau đây?",
    options: [
      { id: "A", text: "Giấu đầu lòi đuôi" },
      { id: "B", text: "Được đằng chân lân đằng đầu" },
      { id: "C", text: "Tay làm hàm nhai" },
      { id: "D", text: "Được mùa chê cơm nguội" }
    ],
    correctOptionId: "A",
    explanation: "'Vụng chèo khéo chống' chỉ sự giảo biện che giấu cái sai vụng về, rất gần với việc lúng túng che đậy.",
    source: "Từ điển Thành ngữ Việt Nam"
  },
  {
    id: "TT-058",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Nhà thơ nào viết tập thơ 'Nhật ký trong tù' (Ngục trung nhật ký)?",
    options: [
      { id: "A", text: "Hồ Chí Minh" },
      { id: "B", text: "Phan Bội Châu" },
      { id: "C", text: "Phan Chu Trinh" },
      { id: "D", text: "Tố Hữu" }
    ],
    correctOptionId: "A",
    explanation: "'Ngục trung nhật ký' gồm 133 bài thơ bằng chữ Hán được Bác Hồ sáng tác trong các nhà lao tỉnh Quảng Tây (1942-1943).",
    source: "Nhật ký trong tù - Hồ Chí Minh"
  },
  {
    id: "TT-059",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Chân ướt chân ráo" },
      { id: "B", text: "Chân ướt chân dáo" },
      { id: "C", text: "Trân ướt trân ráo" },
      { id: "D", text: "Chân ước chân ráo" }
    ],
    correctOptionId: "A",
    explanation: "'Chân ướt chân ráo' viết bằng 'ch' và 'r', ví người mới đến một nơi lạ chưa kịp thích nghi.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-060",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Từ 'ngu dốt' khác từ 'ngây thơ' ở chỗ nào?",
    options: [
      { id: "A", text: "'Ngu dốt' chỉ sự thiếu tri thức năng lực nhận thức; 'ngây thơ' là sự hồn nhiên, trong sáng chưa trải đời" },
      { id: "B", text: "'Ngây thơ' luôn có nghĩa tiêu cực xấu xa" },
      { id: "C", text: "'Ngu dốt' chỉ dùng trong trường học" },
      { id: "D", text: "Hai từ không có điểm khác nhau" }
    ],
    correctOptionId: "A",
    explanation: "'Ngây thơ' mang sắc thái tích cực, đáng yêu của tâm hồn trong trẻo; 'ngu dốt' mang sắc thái phê phán sự tối tăm về trí tuệ.",
    source: "Từ điển Từ đồng nghĩa Tiếng Việt"
  },
  {
    id: "TT-061",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "'Thùng rỗng kêu ...'. Điền từ đúng vào câu thành ngữ:",
    options: [
      { id: "A", text: "to" },
      { id: "B", text: "vang" },
      { id: "C", text: "lớn" },
      { id: "D", text: "xa" }
    ],
    correctOptionId: "A",
    explanation: "'Thùng rỗng kêu to' châm biếm người ít hiểu biết, tài năng kém cỏi nhưng lại hay huênh hoang khoác lác.",
    source: "Kho tàng thành ngữ Việt Nam"
  },
  {
    id: "TT-062",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Hai câu thơ: 'Mai sau dù có bao giờ / Đốt lò hương ấy so tơ phím này' là lời của ai nói với ai?",
    options: [
      { id: "A", text: "Thúy Kiều dặn dò Thúy Vân trong đêm trao duyên" },
      { id: "B", text: "Thúy Kiều nói với Kim Trọng dưới bóng trăng" },
      { id: "C", text: "Hoạn Thư khuyên bảo Thúc Sinh" },
      { id: "D", text: "Từ Hải chia tay Thúy Kiều lên đường" }
    ],
    correctOptionId: "A",
    explanation: "Đoạn trích 'Trao duyên' cảm động khi Thúy Kiều nhờ cậy em gái thay mình nối duyên với chàng Kim.",
    source: "Truyện Kiều - Nguyễn Du"
  },
  {
    id: "TT-063",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Chưng diện" },
      { id: "B", text: "Trưng diện" },
      { id: "C", text: "Chưng viện" },
      { id: "D", text: "Trưng viện" }
    ],
    correctOptionId: "A",
    explanation: "'Chưng diện' (ăn mặc diện đẹp lộng lẫy) viết với âm đầu 'ch'.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-064",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Từ 'ngẫu lực' trong vật lý học có nghĩa là:",
    options: [
      { id: "A", text: "Hệ hai lực song song, ngược chiều, có độ lớn bằng nhau và cùng tác dụng vào một vật" },
      { id: "B", text: "Lực xuất hiện một cách tình cờ" },
      { id: "C", text: "Sức mạnh bộc phát ngẫu hứng" },
      { id: "D", text: "Lực hấp dẫn của trái đất" }
    ],
    correctOptionId: "A",
    explanation: "'Ngẫu' (cặp đôi). Ngẫu lực tạo ra mômen quay làm vật thể chuyển động quay quanh trục.",
    source: "Từ điển Thuật ngữ Vật lý"
  },
  {
    id: "TT-065",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Thành ngữ 'Vô công rỗi nghề' chỉ người:",
    options: [
      { id: "A", text: "Không có công việc, ăn không ngồi rồi lêu lổng" },
      { id: "B", text: "Làm nhiều nghề thủ công truyền thống" },
      { id: "C", text: "Người đã nghỉ hưu an nhàn" },
      { id: "D", text: "Công nhân viên chức gương mẫu" }
    ],
    correctOptionId: "A",
    explanation: "'Vô công' (không có công trạng/việc làm), chỉ lối sống nhàn rỗi, lười biếng vô tích sự.",
    source: "Từ điển Thành ngữ Việt Nam"
  },
  {
    id: "TT-066",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Tập thơ 'Từ ấy' (1937 - 1946) đánh dấu chặng đường đầu sáng tác của nhà thơ cách mạng nào?",
    options: [
      { id: "A", text: "Tố Hữu" },
      { id: "B", text: "Chế Lan Viên" },
      { id: "C", text: "Xuân Diệu" },
      { id: "D", text: "Lưu Trọng Lư" }
    ],
    correctOptionId: "A",
    explanation: "'Từ ấy' là tập thơ đầu tay của Tố Hữu, mở ra con đường thơ gắn liền với lý tưởng cách mạng của Đảng.",
    source: "Văn học Việt Nam hiện đại"
  },
  {
    id: "TT-067",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Chắt bóp" },
      { id: "B", text: "Trắt bóp" },
      { id: "C", text: "Chắt bóc" },
      { id: "D", text: "Trắt bóc" }
    ],
    correctOptionId: "A",
    explanation: "'Chắt bóp' (dành dụm khắt khe từng đồng) viết bằng âm đầu 'ch'.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-068",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Từ 'ngao ngán' diễn tả cảm xúc nào?",
    options: [
      { id: "A", text: "Chán nản, ngấy ngán đến mức không còn muốn đoái hoài" },
      { id: "B", text: "Sợ hãi run rẩy" },
      { id: "C", text: "Ngỡ ngàng vì bất ngờ thú vị" },
      { id: "D", text: "Vui vẻ phấn khởi tột độ" }
    ],
    correctOptionId: "A",
    explanation: "'Ngao ngán' là tâm trạng chán chường, bế tắc và thất vọng trước một hoàn cảnh dai dẳng.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-069",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "'Được voi đòi ...'. Điền từ thích hợp vào câu tục ngữ chỉ lòng tham lam:",
    options: [
      { id: "A", text: "Tiên" },
      { id: "B", text: "ngựa" },
      { id: "C", text: "tiền" },
      { id: "D", text: "vàng" }
    ],
    correctOptionId: "A",
    explanation: "'Được voi đòi Tiên' phê phán thói tham lam vô độ, vừa được điều may mắn lớn đã lập tức đòi hỏi cái viển vông hơn.",
    source: "Tục ngữ Việt Nam"
  },
  {
    id: "TT-070",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Trong bài 'Đất Nước' (trích trường ca 'Mặt đường khát vọng'), Nguyễn Khoa Điềm định nghĩa: 'Đất Nước bắt đầu với miếng ... bây giờ bà ăn'?",
    options: [
      { id: "A", text: "trầu" },
      { id: "B", text: "cau" },
      { id: "C", text: "cơm" },
      { id: "D", text: "bánh" }
    ],
    correctOptionId: "A",
    explanation: "'Đất Nước bắt đầu với miếng trầu bây giờ bà ăn / Đất Nước lớn lên khi dân mình biết trồng tre mà đánh giặc...'.",
    source: "Trường ca Mặt đường khát vọng"
  },
  {
    id: "TT-071",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Rực rỡ" },
      { id: "B", text: "Dực dỡ" },
      { id: "C", text: "Giực giỡ" },
      { id: "D", text: "Rực dỡ" }
    ],
    correctOptionId: "A",
    explanation: "'Rực rỡ' (tươi sáng chói lọi) viết với âm đầu 'r' ở cả hai tiếng.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-072",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Từ 'ngẫu tượng' trong tôn giáo và văn hóa học có nghĩa là:",
    options: [
      { id: "A", text: "Bức tượng thần linh được tôn thờ một cách mù quáng (idol)" },
      { id: "B", text: "Tượng điêu khắc ngẫu hứng ngoài trời" },
      { id: "C", text: "Bức tranh vẽ phong cảnh" },
      { id: "D", text: "Tượng đài kỷ niệm chiến thắng" }
    ],
    correctOptionId: "A",
    explanation: "'Ngẫu tượng' dịch từ idol trong thần học, chỉ bức tượng hoặc thần tượng được người đời sùng kính thái quá.",
    source: "Từ điển Triết học & Tôn giáo"
  },
  {
    id: "TT-073",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Thành ngữ 'Vung vít' thường dùng để mô tả:",
    options: [
      { id: "A", text: "Nói năng lung tung, ba hoa khoác lác không căn cứ" },
      { id: "B", text: "Nấu nướng thức ăn thơm ngon" },
      { id: "C", text: "Quét dọn nhà cửa sạch sẽ" },
      { id: "D", text: "Cột chặt đồ đạc khi di chuyển" }
    ],
    correctOptionId: "A",
    explanation: "'Nói vung vít' chỉ thói khua môi múa mép, kể chuyện thêu dệt không đâu vào đâu.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-074",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "'Thân em như tấm lụa đào / Phất phơ giữa chợ biết vào tay ...'. Điền từ còn thiếu vào câu ca dao:",
    options: [
      { id: "A", text: "ai" },
      { id: "B", text: "chàng" },
      { id: "C", text: "người" },
      { id: "D", text: "thầy" }
    ],
    correctOptionId: "A",
    explanation: "Mô típ ca dao thân phận người phụ nữ trong xã hội cũ: 'biết vào tay ai'.",
    source: "Ca dao than thân"
  },
  {
    id: "TT-075",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Dằng xé" },
      { id: "B", text: "Giằng xé" },
      { id: "C", text: "Giằng sé" },
      { id: "D", text: "Dằng sé" }
    ],
    correctOptionId: "B",
    explanation: "'Giằng xé' (lôi kéo mạnh bạo làm rách hoặc tâm trạng đấu tranh gay gắt) viết bằng 'gi' và 'x'.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-076",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Từ 'ngộ nhận' có nghĩa là gì?",
    options: [
      { id: "A", text: "Nhận thức sai lầm, tưởng lầm điều gì đó là đúng hoặc thuộc về mình" },
      { id: "B", text: "Giác ngộ ra chân lý cuộc đời" },
      { id: "C", text: "Chấp nhận lời khen ngợi" },
      { id: "D", text: "Nhận tiền thù lao xứng đáng" }
    ],
    correctOptionId: "A",
    explanation: "'Ngộ' (lầm lạc), 'nhận' (tiếp nhận/nhận biết). Ngộ nhận là hiểu lầm hoặc tự huyễn hoặc bản thân.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-077",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "'Mật ngọt chết ...'. Điền từ còn thiếu vào câu thành ngữ răn dạy sự tỉnh táo:",
    options: [
      { id: "A", text: "ruồi" },
      { id: "B", text: "kiến" },
      { id: "C", text: "ong" },
      { id: "D", text: "chuột" }
    ],
    correctOptionId: "A",
    explanation: "'Mật ngọt chết ruồi' cảnh tỉnh trước những lời nịnh hót bùi tai nhưng ẩn chứa cạm bẫy nguy hiểm.",
    source: "Kho tàng tục ngữ người Việt"
  },
  {
    id: "TT-078",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Nhà thơ nào là tác giả của thi phẩm 'Sóng' ('Dữ dội và dịu êm / Ồn ào và lặng lẽ...')?",
    options: [
      { id: "A", text: "Xuân Quỳnh" },
      { id: "B", text: "Lâm Thị Mỹ Dạ" },
      { id: "C", text: "Anh Thơ" },
      { id: "D", text: "Đoàn Thị Điểm" }
    ],
    correctOptionId: "A",
    explanation: "'Sóng' được nữ sĩ Xuân Quỳnh sáng tác năm 1967 tại vùng biển Diêm Điền (Thái Bình).",
    source: "Thơ Xuân Quỳnh"
  },
  {
    id: "TT-079",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Cọ xoè" },
      { id: "B", text: "Cọ xòe" },
      { id: "C", text: "Cọ soè" },
      { id: "D", text: "Cọ sòe" }
    ],
    correctOptionId: "B",
    explanation: "'Cọ xòe' (như câu 'Rừng cọ xòe ô che nắng') viết bằng âm 'x'.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-080",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Từ 'nghịch lý' diễn tả điều gì?",
    options: [
      { id: "A", text: "Một mệnh đề thoạt nghe có vẻ vô lý hoặc tự mâu thuẫn nhưng lại chứa đựng sự thật sâu xa" },
      { id: "B", text: "Tính cách nghịch ngợm của trẻ con" },
      { id: "C", text: "Quy luật vật lý về trọng lực" },
      { id: "D", text: "Sự phản nghịch chống lại nhà nước" }
    ],
    correctOptionId: "A",
    explanation: "'Nghịch lý' (paradox) là luận điểm mâu thuẫn bề ngoài với nhận thức thông thường nhưng gợi mở chân lý.",
    source: "Từ điển Triết học"
  },

  // --- 20 CÂU KHÓ (TT-081 đến TT-100) ---
  {
    id: "TT-081",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Từ 'truân chuyên' có nguồn gốc từ hai quẻ nào trong Kinh Dịch?",
    options: [
      { id: "A", text: "Quẻ Truân (khó khăn ban đầu) và quẻ Kiển (trắc trở gian nan)" },
      { id: "B", text: "Quẻ Càn và quẻ Khôn" },
      { id: "C", text: "Quẻ Khảm và quẻ Ly" },
      { id: "D", text: "Quẻ Thái và quẻ Bĩ" }
    ],
    correctOptionId: "A",
    explanation: "'Truân' (屯) và 'Kiển' (hoặc quẻ Đồn/Truân biểu thị gian nan, vất vả dồn dập trong cuộc đời).",
    source: "Kinh Dịch và Văn hóa ngôn ngữ"
  },
  {
    id: "TT-082",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "kho",
    question: "Từ nào sau đây viết ĐÚNG chính tả Hán-Việt?",
    options: [
      { id: "A", text: "Khắc cốt ghi tâm" },
      { id: "B", text: "Khắc cốt minh tâm" },
      { id: "C", text: "Cả A và B đều đúng (minh là ghi khắc)" },
      { id: "D", text: "Khắc cốt minh tinh" }
    ],
    correctOptionId: "C",
    explanation: "'Khắc cốt minh tâm' (刻 骨 銘 心) là thành ngữ Hán-Việt gốc (minh là khắc vào bia đá/lòng dạ). Tiếng Việt biến âm thành 'ghi tâm'. Cả hai đều chuẩn xác.",
    source: "Từ điển Thành ngữ Hán Việt"
  },
  {
    id: "TT-083",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Bài thơ chữ Hán 'Độc Tiểu Thanh ký' của Nguyễn Du thể hiện nỗi xót thương cho nàng Tiểu Thanh sống vào triều đại nào ở Trung Quốc?",
    options: [
      { id: "A", text: "Đầu thời nhà Minh" },
      { id: "B", text: "Thời nhà Đường" },
      { id: "C", text: "Thời nhà Tống" },
      { id: "D", text: "Thời nhà Thanh" }
    ],
    correctOptionId: "A",
    explanation: "Tiểu Thanh (Phùng Tiểu Thanh) là cô gái tài sắc bạc mệnh sống vào đầu thời Minh, mộ nàng ở Tây Hồ (Hàng Châu).",
    source: "Thơ chữ Hán Nguyễn Du"
  },
  {
    id: "TT-084",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Thành ngữ 'Hồ mã tê bắc phong, việt điểu sào nam chi' (Ngựa hồ hý gió bấc, chim việt làm tổ cành nam) diễn tả tình cảm gì?",
    options: [
      { id: "A", text: "Lòng hoài hương, gắn bó tha thiết với quê cha đất tổ" },
      { id: "B", text: "Tập tính di cư sinh học của muông thú" },
      { id: "C", text: "Thời tiết khắc nghiệt giao mùa" },
      { id: "D", text: "Tình cảnh chiến tranh loạn lạc chia cắt" }
    ],
    correctOptionId: "A",
    explanation: "Điển cố trong Cổ thi thập cửu thủ ca ngợi bản năng muông thú còn hướng về cố hương, huống chi con người.",
    source: "Điển cố Văn học cổ điển"
  },
  {
    id: "TT-085",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Từ 'u hoài' có ý nghĩa sâu sắc là:",
    options: [
      { id: "A", text: "Nỗi nhớ nhung thầm kín, buồn thương man mác lắng đọng trong tâm tưởng" },
      { id: "B", text: "Sự giận dữ không nói ra miệng" },
      { id: "C", text: "Niềm hân hoan thầm kín" },
      { id: "D", text: "Bệnh tật đau đớn về thể xác" }
    ],
    correctOptionId: "A",
    explanation: "'U' (sâu kín, u uẩn), 'hoài' (nhớ mong, ôm ấp), tả tâm trạng hoài niệm trầm tư sâu lắng.",
    source: "Từ điển Tiếng Việt Hoàng Phê"
  },
  {
    id: "TT-086",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "kho",
    question: "Chọn từ viết ĐÚNG chính tả chỉ sự xem xét cẩn trọng:",
    options: [
      { id: "A", text: "Săm soi" },
      { id: "B", text: "Xăm soi" },
      { id: "C", text: "Săm xoi" },
      { id: "D", text: "Xăm xoi" }
    ],
    correctOptionId: "A",
    explanation: "'Săm soi' (nhìn ngắm kỹ càng từng li từng tí) viết bằng 's' ở cả hai tiếng.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-087",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Khúc ca 'Hịch tướng sĩ' của Trần Quốc Tuấn được viết bằng thể loại văn học chức năng nào thời trung đại?",
    options: [
      { id: "A", text: "Hịch (thể văn nghị luận cổ dùng cổ vũ sĩ khí quân sĩ)" },
      { id: "B", text: "Cáo (công bố đại sự quốc gia)" },
      { id: "C", text: "Chiếu (lệnh của vua ban)" },
      { id: "D", text: "Biểu (văn thần dân dâng lên vua)" }
    ],
    correctOptionId: "A",
    explanation: "Thể Hịch (chữ Hán: 檄) là thể văn kích lệ tinh thần chiến đấu chống giặc ngoại xâm của tướng lĩnh.",
    source: "Văn học trung đại Việt Nam"
  },
  {
    id: "TT-088",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Thành ngữ 'Vọng ngoại' và 'Tự ti dân tộc' thường đi đôi để phản ánh hiện tượng gì?",
    options: [
      { id: "A", text: "Sùng bái một cách mù quáng văn hóa ngoại lai và coi nhẹ giá trị truyền thống bản xứ" },
      { id: "B", text: "Chính sách đối ngoại mở rộng hợp tác quốc tế" },
      { id: "C", text: "Khao khát học tập khoa học kỹ thuật tiên tiến" },
      { id: "D", text: "Phong trào du học nước ngoài" }
    ],
    correctOptionId: "A",
    explanation: "Tâm lý sùng ngoại thái quá, xem rẻ cội nguồn dân tộc là thái độ văn hóa cần phê phán.",
    source: "Xã hội học Văn hóa"
  },
  {
    id: "TT-089",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Từ 'bách tính' trong văn bản cổ nghĩa là gì?",
    options: [
      { id: "A", text: "Trăm họ, tức toàn thể nhân dân bá tánh" },
      { id: "B", text: "Một trăm tính cách khác nhau của con người" },
      { id: "C", text: "Một trăm vị quan trong triều" },
      { id: "D", text: "Trăm năm tính toán" }
    ],
    correctOptionId: "A",
    explanation: "'Bách' (trăm), 'tính' (họ trong gia phả), bách tính chỉ quần chúng nhân dân trăm họ.",
    source: "Từ điển Hán Việt"
  },
  {
    id: "TT-090",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "kho",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Chắp cánh" },
      { id: "B", text: "Chấp cánh" },
      { id: "C", text: "Trắp cánh" },
      { id: "D", text: "Trấp cánh" }
    ],
    correctOptionId: "A",
    explanation: "'Chắp cánh' (gắn thêm đôi cánh để bay cao) viết với âm 'ch' và vần 'ắp'. Khác với 'chấp bút'.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-091",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Trong bài 'Chân quê' của Nguyễn Bính, chàng trai dặn dò cô gái giữ gìn nét đẹp truyền thống: 'Hoa chanh nở giữa vườn chanh / Thầy u mình với chúng mình ...'. Điền từ:",
    options: [
      { id: "A", text: "chân quê" },
      { id: "B", text: "làng quê" },
      { id: "C", text: "thôn quê" },
      { id: "D", text: "nông dân" }
    ],
    correctOptionId: "A",
    explanation: "'Hoa chanh nở giữa vườn chanh / Thầy u mình với chúng mình chân quê / Hôm qua em đi tỉnh về / Hương đồng gió nội bay đi ít nhiều'.",
    source: "Thơ Nguyễn Bính"
  },
  {
    id: "TT-092",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Thành ngữ 'Vân cẩu biến suy' (Mây trôi chó chạy) ẩn dụ cho điều gì?",
    options: [
      { id: "A", text: "Sự biến thiên, đổi thay nhanh chóng khôn lường của cuộc đời thế sự" },
      { id: "B", text: "Hiện tượng mây tích điện tạo mưa giông" },
      { id: "C", text: "Tình bạn lúc vinh lúc nhục" },
      { id: "D", text: "Cảnh đẹp vùng núi cao mây phủ" }
    ],
    correctOptionId: "A",
    explanation: "Đỗ Phủ có câu 'Thiên thượng phù vân như bạch y, tư tu biến huyễn vi thương cẩu' (Mây trắng chốc biến thành chó xanh), ví sự đời đổi thay.",
    source: "Đỗ Phủ thi tập - Khả thán"
  },
  {
    id: "TT-093",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Từ 'lâm chung' nghĩa là gì?",
    options: [
      { id: "A", text: "Lúc sắp qua đời, phút giây cuối cùng của đời người" },
      { id: "B", text: "Tiếng chuông ngân trong rừng vắng" },
      { id: "C", text: "Lúc kết thúc một bữa tiệc" },
      { id: "D", text: "Lúc bước vào rừng sâu" }
    ],
    correctOptionId: "A",
    explanation: "'Lâm' (đến gần, đối mặt), 'chung' (kết thúc cuộc sống). Lâm chung là giờ phút hấp hối trước lúc tạ thế.",
    source: "Từ điển Hán Việt"
  },
  {
    id: "TT-094",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "kho",
    question: "Từ nào sau đây viết ĐÚNG chính tả?",
    options: [
      { id: "A", text: "Sơ cua" },
      { id: "B", text: "Xơ cua" },
      { id: "C", text: "Xơ qua" },
      { id: "D", text: "Sơ qua" }
    ],
    correctOptionId: "A",
    explanation: "'Sơ cua' (mượn từ secours của tiếng Pháp, nghĩa là phụ tùng dự phòng) thường được viết theo chuẩn là 'sơ cua'.",
    source: "Từ điển Từ ngoại lai tiếng Việt"
  },
  {
    id: "TT-095",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Thi sĩ nào là người khởi xướng phong trào Thơ mới với bài thơ 'Tình già' đăng trên báo Phụ nữ Tân văn năm 1932?",
    options: [
      { id: "A", text: "Phan Khôi" },
      { id: "B", text: "Thế Lữ" },
      { id: "C", text: "Lưu Trọng Lư" },
      { id: "D", text: "Nguyễn Thị Manh Manh" }
    ],
    correctOptionId: "A",
    explanation: "Học giả Phan Khôi với bài thơ 'Tình già' (1932) đã mở phát súng lệnh đầu tiên khai sinh phong trào Thơ mới Việt Nam.",
    source: "Thi nhân Việt Nam - Hoài Thanh"
  },
  {
    id: "TT-096",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Thành ngữ 'Vạc dầu cột đồng' là hình phạt gắn liền với huyền tích nào?",
    options: [
      { id: "A", text: "Các cực hình tàn khốc nơi thập điện Diêm La dưới âm phủ" },
      { id: "B", text: "Thời kỳ An Dương Vương xây thành Cổ Loa" },
      { id: "C", text: "Chiến thuật của nhà Đinh răn đe kẻ phản loạn" },
      { id: "D", text: "Hình phạt nấu dầu thời nhà Hán áp đặt" }
    ],
    correctOptionId: "A",
    explanation: "Trong tín ngưỡng dân gian, 'vạc dầu, cột đồng nung đỏ' là hình phạt dành cho kẻ độc ác gian tà nơi địa ngục.",
    source: "Văn hóa dân gian Việt Nam"
  },
  {
    id: "TT-097",
    round: "tranh_tai",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Từ 'ngoa truyền' có nghĩa là gì?",
    options: [
      { id: "A", text: "Truyền tụng tin đồn sai lệch, thất thiệt không đúng sự thật" },
      { id: "B", text: "Truyền nghề truyền thống cho con cháu" },
      { id: "C", text: "Bí quyết gia truyền" },
      { id: "D", text: "Ghi chép sử liệu chân thực" }
    ],
    correctOptionId: "A",
    explanation: "'Ngoa' là sai ngoa, sai lạc; 'ngoa truyền' là đồn đại truyền miệng những thông tin sai quấy làm hoang mang dư luận.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "TT-098",
    round: "tranh_tai",
    topic: "chinh_ta",
    difficulty: "kho",
    question: "Chọn cách viết ĐÚNG chính tả của từ ngữ sau:",
    options: [
      { id: "A", text: "Trùng tu" },
      { id: "B", text: "Chùng tu" },
      { id: "C", text: "Trùng tư" },
      { id: "D", text: "Chùng tư" }
    ],
    correctOptionId: "A",
    explanation: "'Trùng tu' (chữ Hán: 重 修, nghĩa là sửa chữa, tôn tạo lại công trình đã xuống cấp) viết với 'tr'.",
    source: "Từ điển Hán Việt"
  },
  {
    id: "TT-099",
    round: "tranh_tai",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Tập thơ chữ Hán 'Bắc hành thi tập' của thi hào Nguyễn Du được sáng tác trong hoàn cảnh nào?",
    options: [
      { id: "A", text: "Trên đường ông đi sứ sang Trung Quốc (1813 - 1814)" },
      { id: "B", text: "Thời gian ông ẩn cư ở quê vợ Thái Bình" },
      { id: "C", text: "Lúc ông làm quan tri huyện Phú Xuyên" },
      { id: "D", text: "Khi ông chuẩn bị viết Đoạn trường tân thanh" }
    ],
    correctOptionId: "A",
    explanation: "'Bắc hành thi tập' gồm 131 bài thơ chữ Hán viết trong chuyến đi sứ sang triều Thanh của đại thi hào Nguyễn Du.",
    source: "Thơ chữ Hán Nguyễn Du"
  },
  {
    id: "TT-100",
    round: "tranh_tai",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Thành ngữ 'Vong niên chi giao' (Quên năm tháng mà kết bạn) chỉ mối quan hệ bạn bè thế nào?",
    options: [
      { id: "A", text: "Tình bạn vong niên thân thiết bất chấp sự chênh lệch tuổi tác thế hệ" },
      { id: "B", text: "Bạn bè quen nhau lâu năm nhưng không nhớ ngày sinh" },
      { id: "C", text: "Tình bạn nhất thời mau tàn theo năm tháng" },
      { id: "D", text: "Bạn cùng sinh cùng năm cùng tháng" }
    ],
    correctOptionId: "A",
    explanation: "'Vong niên' là quên đi tuổi tác; tình bạn vong niên là bạn bè tâm đầu ý hợp giữa một người già và một người trẻ tuổi.",
    source: "Từ điển Điển tích Hán Việt"
  }
];
