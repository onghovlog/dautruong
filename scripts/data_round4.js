import { normalizeVietnamese } from '../server/services/textUtils.js';

/**
 * 100 câu hỏi Vòng Chung kết (Kho 4)
 * Phân bố: 10 Dễ, 30 Vừa, 60 Khó
 * Mỗi câu đều có horizontalAnswer (có dấu) và normalizedAnswer (chuẩn hóa không dấu A-Z)
 */
export const round4Questions = [
  // ================= 10 CÂU DỄ (CK-001 đến CK-010) =================
  {
    id: "CK-001",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Thể loại văn vần dân gian ngắn gọn, mộc mạc, thường do trẻ em vừa chơi vừa hát gọi là gì?",
    options: [
      { id: "A", text: "Đồng dao" },
      { id: "B", text: "Sử thi" },
      { id: "C", text: "Thần thoại" },
      { id: "D", text: "Truyện thơ" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "ĐỒNG DAO",
    normalizedAnswer: "DONGDAO",
    explanation: "Đồng dao là thơ ca dân gian truyền miệng truyền thống gắn liền với trò chơi thiếu nhi.",
    source: "Văn học dân gian Việt Nam"
  },
  {
    id: "CK-002",
    round: "chung_ket",
    topic: "chinh_ta",
    difficulty: "de",
    question: "Hệ thống quy tắc viết chữ chuẩn xác của một ngôn ngữ được gọi là gì?",
    options: [
      { id: "A", text: "Chính tả" },
      { id: "B", text: "Ngữ pháp" },
      { id: "C", text: "Từ vựng" },
      { id: "D", text: "Phong cách" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "CHÍNH TẢ",
    normalizedAnswer: "CHINHTA",
    explanation: "Chính tả là các chuẩn mực quy định cách viết đúng chữ của một ngôn ngữ.",
    source: "Từ điển Ngôn ngữ học"
  },
  {
    id: "CK-003",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Cuốn sách giải thích ý nghĩa, cách dùng và phát âm của các từ ngữ trong một thứ tiếng gọi là gì?",
    options: [
      { id: "A", text: "Từ điển" },
      { id: "B", text: "Tiểu thuyết" },
      { id: "C", text: "Ký sự" },
      { id: "D", text: "Hồi ký" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "TỪ ĐIỂN",
    normalizedAnswer: "TUDIEN",
    explanation: "Từ điển là công cụ tra cứu ngữ nghĩa và cách dùng chuẩn mực của từ vựng.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-004",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "de",
    question: "Thể thơ dân tộc gồm các cặp câu sáu tiếng và tám tiếng xen kẽ gọi là gì?",
    options: [
      { id: "A", text: "Lục bát" },
      { id: "B", text: "Song thất" },
      { id: "C", text: "Thất ngôn" },
      { id: "D", text: "Tự do" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "LỤC BÁT",
    normalizedAnswer: "LUCBAT",
    explanation: "Lục bát là thể thơ độc đáo và lâu đời nhất của nền thi ca dân tộc Việt Nam.",
    source: "Thi pháp Thơ ca Việt Nam"
  },
  {
    id: "CK-005",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Hệ thống các quy tắc liên kết từ thành câu hoàn chỉnh trong ngôn ngữ gọi là gì?",
    options: [
      { id: "A", text: "Ngữ pháp" },
      { id: "B", text: "Chính tả" },
      { id: "C", text: "Ngữ âm" },
      { id: "D", text: "Biểu cảm" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "NGỮ PHÁP",
    normalizedAnswer: "NGUPHAP",
    explanation: "Ngữ pháp nghiên cứu cấu trúc từ ngữ và các quy tắc kết hợp cú pháp tạo câu.",
    source: "Ngữ pháp Tiếng Việt"
  },
  {
    id: "CK-006",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "de",
    question: "Cụm từ cố định có tính hình tượng và biểu cảm cao trong lời ăn tiếng nói gọi là gì?",
    options: [
      { id: "A", text: "Thành ngữ" },
      { id: "B", text: "Thuật ngữ" },
      { id: "C", text: "Từ lóng" },
      { id: "D", text: "Biệt ngữ" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "THÀNH NGỮ",
    normalizedAnswer: "THANHNGU",
    explanation: "Thành ngữ là đơn vị từ vựng cố định biểu thị ý niệm hoàn chỉnh qua hình tượng bóng bẩy.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-007",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Năng lực nhận thức, suy xét và tư duy sáng tạo đỉnh cao của con người gọi là gì?",
    options: [
      { id: "A", text: "Trí tuệ" },
      { id: "B", text: "Thể lực" },
      { id: "C", text: "Cảm xúc" },
      { id: "D", text: "Vận may" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "TRÍ TUỆ",
    normalizedAnswer: "TRITUE",
    explanation: "Trí tuệ là tổng thể năng lực hiểu biết, phán đoán và giải quyết vấn đề của trí não con người.",
    source: "Tâm lý học Nhận thức"
  },
  {
    id: "CK-008",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "de",
    question: "Tổng thể những giá trị vật chất và tinh thần do con người sáng tạo ra trong lịch sử gọi là gì?",
    options: [
      { id: "A", text: "Văn hóa" },
      { id: "B", text: "Thiên nhiên" },
      { id: "C", text: "Khoáng sản" },
      { id: "D", text: "Sinh thái" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "VĂN HÓA",
    normalizedAnswer: "VANHOA",
    explanation: "Văn hóa là cội nguồn bản sắc, kết tinh tinh hoa lao động và sáng tạo của nhân loại.",
    source: "Cơ sở Văn hóa Việt Nam"
  },
  {
    id: "CK-009",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "de",
    question: "Phương tiện giao tiếp quan trọng nhất của loài người bằng âm thanh và chữ viết gọi là gì?",
    options: [
      { id: "A", text: "Ngôn ngữ" },
      { id: "B", text: "Ánh mắt" },
      { id: "C", text: "Điệu bộ" },
      { id: "D", text: "Hội họa" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "NGÔN NGỮ",
    normalizedAnswer: "NGONNGU",
    explanation: "Ngôn ngữ là hệ thống tín hiệu đặc thù phục vụ tư duy và giao tiếp xã hội.",
    source: "Dẫn luận Ngôn ngữ học"
  },
  {
    id: "CK-010",
    round: "chung_ket",
    topic: "chinh_ta",
    difficulty: "de",
    question: "Đơn vị phát âm nhỏ nhất của lời nói tương ứng với một tiếng trong tiếng Việt gọi là gì?",
    options: [
      { id: "A", text: "Âm tiết" },
      { id: "B", text: "Đoạn văn" },
      { id: "C", text: "Cú pháp" },
      { id: "D", text: "Dấu câu" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "ÂM TIẾT",
    normalizedAnswer: "AMTIET",
    explanation: "Mỗi tiếng phát ra trong tiếng Việt tương ứng với một âm tiết hoàn chỉnh.",
    source: "Ngữ âm Tiếng Việt"
  },

  // ================= 30 CÂU VỪA (CK-011 đến CK-040) =================
  {
    id: "CK-011",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Nghệ thuật sử dụng từ ngữ giàu hình ảnh và nhạc điệu để truyền tải cảm xúc gọi là gì?",
    options: [
      { id: "A", text: "Thi ca" },
      { id: "B", text: "Kịch bản" },
      { id: "C", text: "Báo chí" },
      { id: "D", text: "Biên bản" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "THI CA",
    normalizedAnswer: "THICA",
    explanation: "Thi ca là tiếng nói tình cảm mãnh liệt được tổ chức qua vần điệu và nhạc tính của ngôn từ.",
    source: "Lý luận Văn học"
  },
  {
    id: "CK-012",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Câu đúc kết kinh nghiệm sống và sản xuất của nhân dân dưới dạng cô đọng gọi là gì?",
    options: [
      { id: "A", text: "Tục ngữ" },
      { id: "B", text: "Truyện cười" },
      { id: "C", text: "Thần tích" },
      { id: "D", text: "Hát chèo" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "TỤC NGỮ",
    normalizedAnswer: "TUCNGU",
    explanation: "Tục ngữ là túi khôn dân gian, đúc kết quy luật tự nhiên và bài học đạo đức ứng xử.",
    source: "Tục ngữ Việt Nam"
  },
  {
    id: "CK-013",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Người có học vấn uyên thâm, hiểu biết sâu rộng trong xã hội xưa và nay được tôn vinh là gì?",
    options: [
      { id: "A", text: "Học giả" },
      { id: "B", text: "Thương gia" },
      { id: "C", text: "Lực sĩ" },
      { id: "D", text: "Quan lại" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "HỌC GIẢ",
    normalizedAnswer: "HOCGIA",
    explanation: "Học giả (chữ Hán: 學 者) là bậc trí thức dành trọn tâm huyết cho việc nghiên cứu học thuật.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-014",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Làn điệu dân ca đối đáp trữ tình đặc trưng của vùng quê Bắc Ninh được UNESCO vinh danh là gì?",
    options: [
      { id: "A", text: "Quan họ" },
      { id: "B", text: "Hát xoan" },
      { id: "C", text: "Ca trù" },
      { id: "D", text: "Ví giặm" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "QUAN HỌ",
    normalizedAnswer: "QUANHO",
    explanation: "Dân ca Quan họ Bắc Ninh là di sản văn hóa phi vật thể đại diện của nhân loại với lề lối ca hát tao nhã.",
    source: "Hồ sơ Di sản UNESCO"
  },
  {
    id: "CK-015",
    round: "chung_ket",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Kho tàng các đơn vị từ vựng của một ngôn ngữ được gọi chung là gì?",
    options: [
      { id: "A", text: "Vốn từ" },
      { id: "B", text: "Bảng chữ" },
      { id: "C", text: "Âm luật" },
      { id: "D", text: "Dấu thanh" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "VỐN TỪ",
    normalizedAnswer: "VONTU",
    explanation: "Vốn từ (từ vựng) là kho tài nguyên phong phú phản ánh sự phát triển tư duy của dân tộc.",
    source: "Từ vựng học Tiếng Việt"
  },
  {
    id: "CK-016",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Lời mở đầu trong một cuốn sách hoặc tác phẩm văn học lớn gọi là gì?",
    options: [
      { id: "A", text: "Lời tựa" },
      { id: "B", text: "Mục lục" },
      { id: "C", text: "Phụ lục" },
      { id: "D", text: "Lời bạt" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "LỜI TỰA",
    normalizedAnswer: "LOITUA",
    explanation: "Lời tựa (đề tựa) giới thiệu mục đích, xuất xứ và nội dung cốt lõi của cuốn sách.",
    source: "Từ điển Xuất bản"
  },
  {
    id: "CK-017",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Nét trầm bổng, lên xuống của giọng nói trong tiếng Việt nhờ hệ thống 6 thanh gọi là gì?",
    options: [
      { id: "A", text: "Thanh điệu" },
      { id: "B", text: "Vần thơ" },
      { id: "C", text: "Nhịp điệu" },
      { id: "D", text: "Trọng âm" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "THANH ĐIỆU",
    normalizedAnswer: "THANHDIEU",
    explanation: "Thanh điệu là đặc trưng ngôn ngữ có tính nhạc cao quý báu của tiếng Việt.",
    source: "Ngữ âm học Tiếng Việt"
  },
  {
    id: "CK-018",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Đức tính chân thành, ngay thẳng, không vụ lợi và lừa dối người khác gọi là gì?",
    options: [
      { id: "A", text: "Thành thật" },
      { id: "B", text: "Khôn khéo" },
      { id: "C", text: "Lém lỉnh" },
      { id: "D", text: "Kiêu kỳ" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "THÀNH THẬT",
    normalizedAnswer: "THANHTHAT",
    explanation: "Thành thật là phẩm chất đạo đức cốt lõi tạo nên sự tín nhiệm và nhân cách cao đẹp.",
    source: "Đạo đức học"
  },
  {
    id: "CK-019",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Hành động xem xét, kiểm tra và điều chỉnh câu từ cho hoàn chỉnh trước khi in ấn gọi là gì?",
    options: [
      { id: "A", text: "Biên tập" },
      { id: "B", text: "Phát hành" },
      { id: "C", text: "Quảng cáo" },
      { id: "D", text: "Mua bán" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "BIÊN TẬP",
    normalizedAnswer: "BIENTAP",
    explanation: "Biên tập là khâu then chốt bảo đảm chất lượng nội dung và chuẩn mực ngôn ngữ của ấn phẩm.",
    source: "Nghiệp vụ Biên tập"
  },
  {
    id: "CK-020",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Bút tích ghi chép nhật ký hành trình hoặc sự kiện quan trọng trong quá khứ gọi là gì?",
    options: [
      { id: "A", text: "Ký sự" },
      { id: "B", text: "Tiểu phẩm" },
      { id: "C", text: "Văn xuôi" },
      { id: "D", text: "Hùng biện" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "KÝ SỰ",
    normalizedAnswer: "KYSU",
    explanation: "Ký sự là thể văn ghi chép chân thực sự việc, con người có thật trong đời sống.",
    source: "Lý luận Văn học"
  },
  {
    id: "CK-021",
    round: "chung_ket",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Khả năng diễn đạt ý nghĩ một cách thông suốt, mạch lạc không vấp váp gọi là gì?",
    options: [
      { id: "A", text: "Lưu loát" },
      { id: "B", text: "Ấp úng" },
      { id: "C", text: "Lắp bắp" },
      { id: "D", text: "Ngập ngừng" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "LƯU LOÁT",
    normalizedAnswer: "LUULOAT",
    explanation: "Lưu loát chỉ sự trôi chảy, nhanh nhạy và chuẩn xác trong năng lực ngôn ngữ.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-022",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Phần thưởng tinh thần cao quý trao tặng cho công trình hoặc tác phẩm xuất sắc gọi là gì?",
    options: [
      { id: "A", text: "Giải thưởng" },
      { id: "B", text: "Học phí" },
      { id: "C", text: "Tiền phạt" },
      { id: "D", text: "Thù lao" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "GIẢI THƯỞNG",
    normalizedAnswer: "GIAITHUONG",
    explanation: "Giải thưởng là sự tôn vinh tài năng và cống hiến của cá nhân cho xã hội.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-023",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Nơi lưu giữ, trưng bày các hiện vật lịch sử và tác phẩm nghệ thuật quý giá gọi là gì?",
    options: [
      { id: "A", text: "Bảo tàng" },
      { id: "B", text: "Chợ hoa" },
      { id: "C", text: "Bến xe" },
      { id: "D", text: "Siêu thị" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "BẢO TÀNG",
    normalizedAnswer: "BAOTANG",
    explanation: "Bảo tàng là thiết chế văn hóa giáo dục lưu giữ ký ức và di sản của cộng đồng.",
    source: "Bảo tàng học"
  },
  {
    id: "CK-024",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Thiên nhiên tươi đẹp với non nước, mây trời hùng vĩ gọi chung là gì?",
    options: [
      { id: "A", text: "Sơn thủy" },
      { id: "B", text: "Phố xá" },
      { id: "C", text: "Ruộng đồng" },
      { id: "D", text: "Đầm lầy" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "SƠN THỦY",
    normalizedAnswer: "SONTHUY",
    explanation: "Sơn thủy (núi non và sông nước) là biểu tượng bất tận của thi ca hội họa truyền thống.",
    source: "Từ điển Hán Việt"
  },
  {
    id: "CK-025",
    round: "chung_ket",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Trạng thái tâm hồn trong sáng, không vướng bận lo toan, sầu muộn gọi là gì?",
    options: [
      { id: "A", text: "Thanh thản" },
      { id: "B", text: "U uất" },
      { id: "C", text: "Bồn chồn" },
      { id: "D", text: "Bực bội" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "THANH THẢN",
    normalizedAnswer: "THANHTHAN",
    explanation: "Thanh thản là trạng thái an nhiên, nhẹ nhõm tĩnh lặng của nội tâm.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-026",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Hình thức đố vui dân gian dùng câu chữ ẩn dụ để người nghe phán đoán sự vật gọi là gì?",
    options: [
      { id: "A", text: "Câu đố" },
      { id: "B", text: "Văn tế" },
      { id: "C", text: "Chiếu dời" },
      { id: "D", text: "Sấm ký" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "CÂU ĐỐ",
    normalizedAnswer: "CAUDO",
    explanation: "Câu đố dân gian rèn luyện trí thông minh, khả năng liên tưởng và sự hóm hỉnh.",
    source: "Kho tàng câu đố Việt Nam"
  },
  {
    id: "CK-027",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Thái độ tôn kính, vâng lời và phụng dưỡng cha mẹ lúc tuổi già gọi là gì?",
    options: [
      { id: "A", text: "Hiếu thảo" },
      { id: "B", text: "Bất nghĩa" },
      { id: "C", text: "Vô ơn" },
      { id: "D", text: "Hẹp hòi" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "HIẾU THẢO",
    normalizedAnswer: "HIEUTHAO",
    explanation: "Hiếu thảo là đạo lý làm người hàng đầu trong văn hóa gia đình truyền thống phương Đông.",
    source: "Luân lý học"
  },
  {
    id: "CK-028",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Đoạn văn xuôi giàu cảm xúc, bay bổng và đượm chất thơ của người viết gọi là gì?",
    options: [
      { id: "A", text: "Tùy bút" },
      { id: "B", text: "Tờ trình" },
      { id: "C", text: "Công văn" },
      { id: "D", text: "Hóa đơn" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "TÙY BÚT",
    normalizedAnswer: "TUYBUT",
    explanation: "Tùy bút là thể loại tùy theo cảm hứng ngẫu nhiên mà phóng bút ghi lại suy tư sâu sắc.",
    source: "Lý luận Văn học"
  },
  {
    id: "CK-029",
    round: "chung_ket",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Khu vực biên giới tiếp giáp giữa các vùng đất hoặc quốc gia gọi là gì?",
    options: [
      { id: "A", text: "Địa phận" },
      { id: "B", text: "Khu vườn" },
      { id: "C", text: "Sân bay" },
      { id: "D", text: "Ga tàu" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "ĐỊA PHẬN",
    normalizedAnswer: "DIAPHAN",
    explanation: "Địa phận xác định giới hạn không gian hành chính hoặc chủ quyền lãnh thổ.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-030",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Biểu tượng thiêng liêng đại diện cho độc lập, chủ quyền của một quốc gia gọi là gì?",
    options: [
      { id: "A", text: "Quốc kỳ" },
      { id: "B", text: "Bảng hiệu" },
      { id: "C", text: "Băng rôn" },
      { id: "D", text: "Áp phích" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "QUỐC KỲ",
    normalizedAnswer: "QUOCKY",
    explanation: "Quốc kỳ (lá cờ tổ quốc) là niềm tự hào và danh dự thiêng liêng của toàn thể dân tộc.",
    source: "Hiến pháp Việt Nam"
  },
  {
    id: "CK-031",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Tập hợp các bài thơ được tuyển chọn và in chung trong một ấn bản gọi là gì?",
    options: [
      { id: "A", text: "Tập thơ" },
      { id: "B", text: "Tạp chí" },
      { id: "C", text: "Kỷ yếu" },
      { id: "D", text: "Sổ tay" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "TẬP THƠ",
    normalizedAnswer: "TAPTHO",
    explanation: "Tập thơ là tuyển tập thi phẩm phản ánh trọn vẹn phong cách nghệ thuật của tác giả.",
    source: "Từ điển Văn học"
  },
  {
    id: "CK-032",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Mối quan hệ gắn bó keo sơn giữa những người bạn cùng chung lý tưởng gọi là gì?",
    options: [
      { id: "A", text: "Tình bạn" },
      { id: "B", text: "Đối thủ" },
      { id: "C", text: "Cạnh tranh" },
      { id: "D", text: "Xã giao" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "TÌNH BẠN",
    normalizedAnswer: "TINHBAN",
    explanation: "Tình bạn chân chính là điểm tựa tinh thần vững chắc giúp con người vượt qua thử thách.",
    source: "Tâm lý học Đời sống"
  },
  {
    id: "CK-033",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Thái độ khiêm tốn, biết trước biết sau trong giao tiếp ứng xử gọi là gì?",
    options: [
      { id: "A", text: "Nhã nhặn" },
      { id: "B", text: "Cộc lốc" },
      { id: "C", text: "Hống hách" },
      { id: "D", text: "Huênh hoang" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "NHÃ NHẶN",
    normalizedAnswer: "NHANHAN",
    explanation: "Nhã nhặn là vẻ đẹp văn hóa trong lời ăn tiếng nói và cử chỉ lịch thiệp.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-034",
    round: "chung_ket",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Cách phát âm chuẩn mực không pha tạp âm địa phương gọi là gì?",
    options: [
      { id: "A", text: "Chuẩn âm" },
      { id: "B", text: "Nói ngọng" },
      { id: "C", text: "Nói lắp" },
      { id: "D", text: "Phát âm sai" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "CHUẨN ÂM",
    normalizedAnswer: "CHUANAM",
    explanation: "Chuẩn âm giữ gìn sự trong sáng và đồng nhất của tiếng nói quốc gia.",
    source: "Ngôn ngữ học Tiếng Việt"
  },
  {
    id: "CK-035",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Âm thanh vang dội của tiếng sóng biển vỗ vào ghềnh đá được gọi là gì?",
    options: [
      { id: "A", text: "Sóng vỗ" },
      { id: "B", text: "Mưa rơi" },
      { id: "C", text: "Gió thoảng" },
      { id: "D", text: "Nắng rọi" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "SÓNG VỖ",
    normalizedAnswer: "SONGVO",
    explanation: "Sóng vỗ rì rào là âm thanh quen thuộc của đại dương bao la.",
    source: "Văn học miêu tả thiên nhiên"
  },
  {
    id: "CK-036",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Tấm lòng trong sạch, không vướng bụi trần của bậc quân tử gọi là gì?",
    options: [
      { id: "A", text: "Thanh cao" },
      { id: "B", text: "Tầm thường" },
      { id: "C", text: "Nhỏ mọn" },
      { id: "D", text: "Bủn xỉn" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "THANH CAO",
    normalizedAnswer: "THANHCAO",
    explanation: "Thanh cao là khí tiết giữ mình trong sạch, không màng danh lợi tầm thường.",
    source: "Đạo đức học Phương Đông"
  },
  {
    id: "CK-037",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "vua",
    question: "Sự tiếp nối và phát huy các giá trị tốt đẹp của thế hệ đi trước gọi là gì?",
    options: [
      { id: "A", text: "Kế thừa" },
      { id: "B", text: "Đoạn tuyệt" },
      { id: "C", text: "Bỏ rơi" },
      { id: "D", text: "Lãng quên" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "KẾ THỪA",
    normalizedAnswer: "KETHUA",
    explanation: "Kế thừa truyền thống là nền tảng để phát triển văn hóa bền vững cho tương lai.",
    source: "Xã hội học"
  },
  {
    id: "CK-038",
    round: "chung_ket",
    topic: "chinh_ta",
    difficulty: "vua",
    question: "Sự phân chia câu từ theo trật tự hợp lý, rõ ràng gọi là gì?",
    options: [
      { id: "A", text: "Cú pháp" },
      { id: "B", text: "Hỗn loạn" },
      { id: "C", text: "Tùy tiện" },
      { id: "D", text: "Lộn xộn" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "CÚ PHÁP",
    normalizedAnswer: "CUPHAP",
    explanation: "Cú pháp là quy tắc kết hợp các từ thành ngữ đoạn và câu hoàn chỉnh.",
    source: "Ngữ pháp Tiếng Việt"
  },
  {
    id: "CK-039",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "vua",
    question: "Hình ảnh quê hương yên bình với cây đa, bến nước, mái đình gọi chung là gì?",
    options: [
      { id: "A", text: "Làng quê" },
      { id: "B", text: "Đô thị" },
      { id: "C", text: "Hải cảng" },
      { id: "D", text: "Khu công nghiệp" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "LÀNG QUÊ",
    normalizedAnswer: "LANGQUE",
    explanation: "Làng quê Việt Nam là cái nôi nuôi dưỡng tâm hồn và văn hóa dân tộc.",
    source: "Văn hóa làng xã Việt Nam"
  },
  {
    id: "CK-040",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "vua",
    question: "Niềm tin tưởng sâu sắc vào lẽ phải và tương lai tươi sáng gọi là gì?",
    options: [
      { id: "A", text: "Lạc quan" },
      { id: "B", text: "Bi quan" },
      { id: "C", text: "Tuyệt vọng" },
      { id: "D", text: "Hoang mang" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "LẠC QUAN",
    normalizedAnswer: "LACQUAN",
    explanation: "Lạc quan là tinh thần yêu đời, tin tưởng vào điều thiện và sự phát triển tốt đẹp.",
    source: "Từ điển Tiếng Việt"
  },

  // ================= 60 CÂU KHÓ (CK-041 đến CK-100) =================
  {
    id: "CK-041",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Phép tu từ gọi tên sự vật, hiện tượng này bằng tên sự vật, hiện tượng khác có nét tương đồng gọi là gì?",
    options: [
      { id: "A", text: "Ẩn dụ" },
      { id: "B", text: "Hoán dụ" },
      { id: "C", text: "Điệp từ" },
      { id: "D", text: "Liệt kê" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "ẨN DỤ",
    normalizedAnswer: "ANDU",
    explanation: "Ẩn dụ là so sánh ngầm dựa trên mối liên hệ tương đồng giữa hai đối tượng.",
    source: "Phong cách học Tiếng Việt"
  },
  {
    id: "CK-042",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Phép tu từ gọi tên sự vật bằng tên sự vật khác có quan hệ gần gũi, đi liền với nó gọi là gì?",
    options: [
      { id: "A", text: "Hoán dụ" },
      { id: "B", text: "Ẩn dụ" },
      { id: "C", text: "Chơi chữ" },
      { id: "D", text: "Phản đề" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "HOÁN DỤ",
    normalizedAnswer: "HOANDU",
    explanation: "Hoán dụ dựa trên mối quan hệ tương cận (gần gũi thực tế) giữa hai sự vật.",
    source: "Phong cách học Tiếng Việt"
  },
  {
    id: "CK-043",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Thể văn nghị luận cổ do vua chúa ban ra để ban bố mệnh lệnh hoặc khuyến dụ thiên hạ gọi là gì?",
    options: [
      { id: "A", text: "Chiếu thư" },
      { id: "B", text: "Thơ phú" },
      { id: "C", text: "Tản văn" },
      { id: "D", text: "Truyện ký" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "CHIẾU THƯ",
    normalizedAnswer: "CHIEUTHU",
    explanation: "Chiếu thư (như Chiếu dời đô của Lý Công Uẩn) là văn bản quyền lực tối cao của hoàng đế thời phong kiến.",
    source: "Văn học trung đại Việt Nam"
  },
  {
    id: "CK-044",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Thể văn cổ của vua chúa hoặc tướng lĩnh dùng để công bố đại sự quốc gia sau khi dẹp yên giặc giã gọi là gì?",
    options: [
      { id: "A", text: "Đại cáo" },
      { id: "B", text: "Truyện thơ" },
      { id: "C", text: "Văn tế" },
      { id: "D", text: "Phú Đường luật" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "ĐẠI CÁO",
    normalizedAnswer: "DAICAO",
    explanation: "Thể Cáo (như Bình Ngô đại cáo của Nguyễn Trãi) tổng kết thắng lợi lịch sử huy hoàng của dân tộc.",
    source: "Văn học trung đại Việt Nam"
  },
  {
    id: "CK-045",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Văn bản cúng tế đọc trước vong linh người đã khuất nhằm ca ngợi công đức và xót thương gọi là gì?",
    options: [
      { id: "A", text: "Văn tế" },
      { id: "B", text: "Tụng ca" },
      { id: "C", text: "Ngâm khúc" },
      { id: "D", text: "Thần thoại" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "VĂN TẾ",
    normalizedAnswer: "VANTE",
    explanation: "Văn tế (tiêu biểu như Văn tế nghĩa sĩ Cần Giuộc của Nguyễn Đình Chiểu) thấm đẫm cảm xúc bi tráng.",
    source: "Văn học sử Việt Nam"
  },
  {
    id: "CK-046",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Khúc ca dài than thở nỗi cô đơn sầu muộn của người phụ nữ trong văn học cổ gọi là gì?",
    options: [
      { id: "A", text: "Ngâm khúc" },
      { id: "B", text: "Sử thi" },
      { id: "C", text: "Đồng dao" },
      { id: "D", text: "Truyện cười" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "NGÂM KHÚC",
    normalizedAnswer: "NGAMKHUC",
    explanation: "Thể Ngâm khúc (như Chinh phụ ngâm, Cung oán ngâm khúc) thể hiện chiều sâu bi kịch nội tâm con người.",
    source: "Văn học trung đại Việt Nam"
  },
  {
    id: "CK-047",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Sự am hiểu sâu rộng, thông tỏ kim cổ của bậc trí giả uyên bác gọi là gì?",
    options: [
      { id: "A", text: "Uyên thâm" },
      { id: "B", text: "Nông cạn" },
      { id: "C", text: "Hời hợt" },
      { id: "D", text: "Thô thiển" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "UYÊN THÂM",
    normalizedAnswer: "UYENTHAM",
    explanation: "Uyên thâm (uyên: sâu thẳm, thâm: sâu sắc) biểu thị trình độ học thuật đỉnh cao.",
    source: "Từ điển Hán Việt"
  },
  {
    id: "CK-048",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Văn bia chạm khắc trên đá ghi nhận công trạng tiền nhân hoặc danh tánh các vị đỗ tiến sĩ gọi là gì?",
    options: [
      { id: "A", text: "Bia đá" },
      { id: "B", text: "Tranh vẽ" },
      { id: "C", text: "Tượng gỗ" },
      { id: "D", text: "Gốm sứ" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "BIA ĐÁ",
    normalizedAnswer: "BIADA",
    explanation: "Bia tiến sĩ Văn Miếu Quốc Tử Giám là di sản ký ức thế giới vinh danh hiền tài - nguyên khí quốc gia.",
    source: "Di sản Văn Miếu Quốc Tử Giám"
  },
  {
    id: "CK-049",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Nghệ thuật sử dụng từ ngữ có âm điệu, vần luật để tăng sức biểu cảm trong văn chương gọi là gì?",
    options: [
      { id: "A", text: "Nhạc tính" },
      { id: "B", text: "Kích thước" },
      { id: "C", text: "Màu sắc" },
      { id: "D", text: "Khối lượng" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "NHẠC TÍNH",
    normalizedAnswer: "NHACTINH",
    explanation: "Nhạc tính là phẩm chất đặc biệt của ngôn từ thi ca tạo rung động thẩm mỹ trong tâm hồn người đọc.",
    source: "Thi pháp học"
  },
  {
    id: "CK-050",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Năng lực cảm thụ và rung động sâu sắc trước vẻ đẹp của nghệ thuật và đời sống gọi là gì?",
    options: [
      { id: "A", text: "Thẩm mỹ" },
      { id: "B", text: "Vô cảm" },
      { id: "C", text: "Đơ sững" },
      { id: "D", text: "Lạnh lùng" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "THẨM MỸ",
    normalizedAnswer: "THAMMY",
    explanation: "Thẩm mỹ là khoa học và khả năng cảm nhận cái đẹp trong tự nhiên và nghệ thuật.",
    source: "Mỹ học đại cương"
  },
  {
    id: "CK-051",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Nghệ thuật đối ngẫu cân xứng về từ loại và bằng trắc trong thơ phú cổ gọi là gì?",
    options: [
      { id: "A", text: "Phép đối" },
      { id: "B", text: "Gieo vần" },
      { id: "C", text: "Ngắt nhịp" },
      { id: "D", text: "Chêm xen" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "PHÉP ĐỐI",
    normalizedAnswer: "PHEPDOI",
    explanation: "Phép đối (ngẫu đối) tạo nên vẻ đẹp trang trọng, đăng đối hài hòa trong văn chương trung đại.",
    source: "Thi pháp Thơ Đường luật"
  },
  {
    id: "CK-052",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Kho tàng các sự tích, câu chuyện xưa được mượn làm hình ảnh biểu trưng trong văn học gọi là gì?",
    options: [
      { id: "A", text: "Điển cố" },
      { id: "B", text: "Tin đồn" },
      { id: "C", text: "Phỏng vấn" },
      { id: "D", text: "Báo cáo" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "ĐIỂN CỐ",
    normalizedAnswer: "DIENCO",
    explanation: "Điển cố, điển tích giúp cô đọng hàm súc ý niệm và thể hiện bề dày tri thức của tác giả.",
    source: "Từ điển Điển cố Văn học"
  },
  {
    id: "CK-053",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Phẩm chất trong sạch, giữ trọn thanh danh không màng phú quý của kẻ sĩ xưa gọi là gì?",
    options: [
      { id: "A", text: "Khí tiết" },
      { id: "B", text: "Cơ hội" },
      { id: "C", text: "Tham lam" },
      { id: "D", text: "Vị kỷ" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "KHÍ TIẾT",
    normalizedAnswer: "KHITIET",
    explanation: "Khí tiết của người trí thức là kiên định bảo vệ chính đạo dù đối mặt nghèo khó hay đe dọa.",
    source: "Nho học Việt Nam"
  },
  {
    id: "CK-054",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Quy tắc phối hợp thanh Bằng và thanh Trắc trong các câu thơ Đường luật gọi là gì?",
    options: [
      { id: "A", text: "Luật bằng trắc" },
      { id: "B", text: "Lối nói lái" },
      { id: "C", text: "Thơ tự do" },
      { id: "D", text: "Văn xuôi" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "BẰNG TRẮC",
    normalizedAnswer: "BANGTRAC",
    explanation: "Quy luật Bằng - Trắc tạo nên âm hưởng bổng trầm nghiêm cẩn của thơ cổ điển.",
    source: "Luật thi Đường luật"
  },
  {
    id: "CK-055",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Sự hòa hợp, tương thích tuyệt vời giữa các yếu tố nghệ thuật trong một chỉnh thể gọi là gì?",
    options: [
      { id: "A", text: "Hài hòa" },
      { id: "B", text: "Xung khắc" },
      { id: "C", text: "Hỗn loạn" },
      { id: "D", text: "Rời rạc" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "HÀI HÒA",
    normalizedAnswer: "HAIHOA",
    explanation: "Hài hòa là đỉnh cao của sự cân bằng và vẻ đẹp hoàn thiện trong cấu trúc ngôn ngữ.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-056",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Tập hợp các chuẩn mực đạo lý ứng xử tốt đẹp giữa con người với con người gọi là gì?",
    options: [
      { id: "A", text: "Luân thường" },
      { id: "B", text: "Lợi ích" },
      { id: "C", text: "Tranh đoạt" },
      { id: "D", text: "Thủ đoạn" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "LUÂN THƯỜNG",
    normalizedAnswer: "LUANTHUONG",
    explanation: "Luân thường (tam cương ngũ thường) định hình nền tảng đạo đức gia đình và cộng đồng.",
    source: "Đạo đức học Phương Đông"
  },
  {
    id: "CK-057",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Biện pháp tu từ lặp lại từ ngữ đầu các câu thơ để nhấn mạnh cảm xúc gọi là gì?",
    options: [
      { id: "A", text: "Điệp từ" },
      { id: "B", text: "Nói quá" },
      { id: "C", text: "So sánh" },
      { id: "D", text: "Nói mỉa" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "ĐIỆP TỪ",
    normalizedAnswer: "DIEPTU",
    explanation: "Phép điệp từ (điệp ngữ) tạo nhịp điệu dồn dập và khắc sâu ấn tượng tư tưởng tác phẩm.",
    source: "Phong cách học Tiếng Việt"
  },
  {
    id: "CK-058",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Tình cảm tha thiết, gắn bó sâu nặng với mảnh đất chôn nhau cắt rốn gọi là gì?",
    options: [
      { id: "A", text: "Quê hương" },
      { id: "B", text: "Đất khách" },
      { id: "C", text: "Xứ lạ" },
      { id: "D", text: "Phương xa" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "QUÊ HƯƠNG",
    normalizedAnswer: "QUEHUONG",
    explanation: "Quê hương là ngọn nguồn nuôi dưỡng tâm hồn và bản sắc thiêng liêng của mỗi con người.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-059",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Năng lực nhìn nhận thấu suốt mọi bản chất của sự vật hiện tượng trong đời gọi là gì?",
    options: [
      { id: "A", text: "Minh triết" },
      { id: "B", text: "Mê muội" },
      { id: "C", text: "U tối" },
      { id: "D", text: "Hồ đồ" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "MINH TRIẾT",
    normalizedAnswer: "MINHTRIET",
    explanation: "Minh triết là đỉnh cao của sự thấu hiểu chân lý và thái độ sống sáng suốt, an nhiên.",
    source: "Triết học Phương Đông"
  },
  {
    id: "CK-060",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Tác phẩm văn học dân gian kể về chiến công của người anh hùng bộ tộc gọi là gì?",
    options: [
      { id: "A", text: "Sử thi" },
      { id: "B", text: "Thơ mới" },
      { id: "C", text: "Truyện ngắn" },
      { id: "D", text: "Kịch bản" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "SỬ THI",
    normalizedAnswer: "SUTHI",
    explanation: "Sử thi (như Đăm Săn, Xinh Nhã) là tượng đài anh hùng ca rực rỡ của đồng bào Tây Nguyên.",
    source: "Văn học dân gian Việt Nam"
  },
  {
    id: "CK-061",
    round: "chung_ket",
    topic: "chinh_ta",
    difficulty: "kho",
    question: "Sự trong sáng, thuần khiết và tinh tế của tiếng mẹ đẻ được gọi là gì?",
    options: [
      { id: "A", text: "Thuần Việt" },
      { id: "B", text: "Lai căng" },
      { id: "C", text: "Hỗn tạp" },
      { id: "D", text: "Thô ráp" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "THUẦN VIỆT",
    normalizedAnswer: "THUANVIET",
    explanation: "Vốn từ thuần Việt là cái nôi gìn giữ bản sắc và sức sống trường tồn của tiếng nói dân tộc.",
    source: "Lịch sử Tiếng Việt"
  },
  {
    id: "CK-062",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Biện pháp tu từ gắn thuộc tính, cảm xúc của con người cho loài vật hoặc đồ vật gọi là gì?",
    options: [
      { id: "A", text: "Nhân hóa" },
      { id: "B", text: "So sánh" },
      { id: "C", text: "Nói giảm" },
      { id: "D", text: "Liệt kê" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "NHÂN HÓA",
    normalizedAnswer: "NHANHOA",
    explanation: "Nhân hóa làm cho thế giới loài vật và thiên nhiên trở nên sống động, gần gũi với con người.",
    source: "Phong cách học Tiếng Việt"
  },
  {
    id: "CK-063",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Hình thức gieo vần ở cuối câu thơ trong các thể thơ truyền thống gọi là gì?",
    options: [
      { id: "A", text: "Vần chân" },
      { id: "B", text: "Vần lưng" },
      { id: "C", text: "Vần gián cách" },
      { id: "D", text: "Vần chéo" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "VẦN CHÂN",
    normalizedAnswer: "VANCHAN",
    explanation: "Vần chân (cước vận) đặt ở âm tiết cuối cùng của câu thơ, tạo nên âm hưởng ngân vang.",
    source: "Thi pháp Thơ Việt Nam"
  },
  {
    id: "CK-064",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Phẩm hạnh cao quý, lòng nhân ái bao la của con người gọi là gì?",
    options: [
      { id: "A", text: "Đức hạnh" },
      { id: "B", text: "Độc ác" },
      { id: "C", text: "Nhẫn tâm" },
      { id: "D", text: "Bạc bẽo" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "ĐỨC HẠNH",
    normalizedAnswer: "DUCHANH",
    explanation: "Đức hạnh là vẻ đẹp cao quý nhất của nhân cách con người được xã hội kính trọng.",
    source: "Đạo đức học"
  },
  {
    id: "CK-065",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Hình thức gieo vần nằm ở giữa câu thơ trong thể thơ lục bát gọi là gì?",
    options: [
      { id: "A", text: "Vần lưng" },
      { id: "B", text: "Vần chân" },
      { id: "C", text: "Vần liền" },
      { id: "D", text: "Vần chéo" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "VẦN LƯNG",
    normalizedAnswer: "VANLUNG",
    explanation: "Vần lưng (yêu vận) gieo giữa câu (tiếng thứ sáu của câu tám hiệp với tiếng thứ sáu câu sáu).",
    source: "Thi pháp Thơ lục bát"
  },
  {
    id: "CK-066",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Thể văn nghị luận cổ dùng lập luận sắc bén để thuyết phục người nghe về một chủ trương gọi là gì?",
    options: [
      { id: "A", text: "Nghị luận" },
      { id: "B", text: "Trữ tình" },
      { id: "C", text: "Tự sự" },
      { id: "D", text: "Hài hước" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "NGHỊ LUẬN",
    normalizedAnswer: "NGHILUAN",
    explanation: "Văn nghị luận vận dụng luận điểm, luận cứ và luận chứng chặt chẽ để sáng tỏ chân lý.",
    source: "Lý luận Văn học"
  },
  {
    id: "CK-067",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Sự trung kiên, giữ trọn lời thề son sắt trước sau như một gọi là gì?",
    options: [
      { id: "A", text: "Thủy chung" },
      { id: "B", text: "Bội bạc" },
      { id: "C", text: "Thay lòng" },
      { id: "D", text: "Bạc tình" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "THỦY CHUNG",
    normalizedAnswer: "THUYCHUNG",
    explanation: "Thủy chung (đầu cuối vẹn tròn) là phẩm chất cao đẹp trong tình yêu và nghĩa đồng bào.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-068",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Sự biến ảo tài tình của ngôn từ tạo nên nét hóm hỉnh, sâu cay trong dân gian gọi là gì?",
    options: [
      { id: "A", text: "Chơi chữ" },
      { id: "B", text: "Đố mẹo" },
      { id: "C", text: "Nói lắp" },
      { id: "D", text: "Nói thầm" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "CHƠI CHỮ",
    normalizedAnswer: "CHOICHU",
    explanation: "Chơi chữ (như đồng âm, điệp âm, nói lái) thể hiện sự tài hoa và tinh nghịch của tiếng Việt.",
    source: "Phong cách học Tiếng Việt"
  },
  {
    id: "CK-069",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Lòng dũng cảm vô song, hiên ngang không sợ hiểm nguy trước quân thù gọi là gì?",
    options: [
      { id: "A", text: "Hào khí" },
      { id: "B", text: "Nhát gan" },
      { id: "C", text: "Khiếp sợ" },
      { id: "D", text: "Rụt rè" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "HÀO KHÍ",
    normalizedAnswer: "HAOKHI",
    explanation: "Hào khí Đông A thời Trần là biểu tượng sức mạnh quật cường đánh tan ba lần giặc Nguyên Mông.",
    source: "Lịch sử Việt Nam"
  },
  {
    id: "CK-070",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Đức tính bao dung, tha thứ và rộng lượng với lỗi lầm của người khác gọi là gì?",
    options: [
      { id: "A", text: "Khoan dung" },
      { id: "B", text: "Hẹp hòi" },
      { id: "C", text: "Đố kỵ" },
      { id: "D", text: "Hiểm độc" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "KHOAN DUNG",
    normalizedAnswer: "KHOANDUNG",
    explanation: "Khoan dung là thước đo của tâm hồn cao thượng và tấm lòng nhân ái vị tha.",
    source: "Đạo đức học"
  },
  {
    id: "CK-071",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Biện pháp tu từ nói giảm mức độ nghiêm trọng để tránh gây tổn thương tình cảm gọi là gì?",
    options: [
      { id: "A", text: "Uyển ngữ" },
      { id: "B", text: "Nói quá" },
      { id: "C", text: "Chơi chữ" },
      { id: "D", text: "Cường điệu" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "UYỂN NGỮ",
    normalizedAnswer: "UYENNGU",
    explanation: "Uyển ngữ (nói giảm nói tránh) thể hiện sự tế nhị, nhã nhặn và lòng trắc ẩn của người nói.",
    source: "Phong cách học Tiếng Việt"
  },
  {
    id: "CK-072",
    round: "chung_ket",
    topic: "chinh_ta",
    difficulty: "kho",
    question: "Lối nói đảo ngược vị trí các phụ âm đầu hoặc vần để tạo tiếng lóng hóm hỉnh gọi là gì?",
    options: [
      { id: "A", text: "Nói lái" },
      { id: "B", text: "Nói ngọng" },
      { id: "C", text: "Nói vần" },
      { id: "D", text: "Nói dối" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "NÓI LÁI",
    normalizedAnswer: "NOILAI",
    explanation: "Nói lái là nét độc đáo bậc thầy trong nghệ thuật ngôn từ dân gian của người Việt.",
    source: "Ngôn ngữ học Dân gian"
  },
  {
    id: "CK-073",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Nơi tụ họp đông đúc kẻ chợ, giao lưu hàng hóa và văn hóa của đất kinh đô xưa gọi là gì?",
    options: [
      { id: "A", text: "Phố thị" },
      { id: "B", text: "Rừng sâu" },
      { id: "C", text: "Nương rẫy" },
      { id: "D", text: "Đảo xa" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "PHỐ THỊ",
    normalizedAnswer: "PHOTHI",
    explanation: "Phố thị Thăng Long Kẻ Chợ xưa 36 phố phường là bức tranh phồn hoa sầm uất.",
    source: "Lịch sử Hà Nội"
  },
  {
    id: "CK-074",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Trạng thái con người sống hòa thuận, tôn trọng và yêu thương lẫn nhau trong một tập thể gọi là gì?",
    options: [
      { id: "A", text: "Đoàn kết" },
      { id: "B", text: "Chia rẽ" },
      { id: "C", text: "Tranh giành" },
      { id: "D", text: "Bất hòa" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "ĐOÀN KẾT",
    normalizedAnswer: "DOANKET",
    explanation: "Đoàn kết là cội nguồn tạo nên sức mạnh vô địch giúp dân tộc chiến thắng mọi thiên tai, giặc giã.",
    source: "Tư tưởng Hồ Chí Minh"
  },
  {
    id: "CK-075",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Hệ thống vần luật được kết hợp linh hoạt, phóng khoáng trong thơ ca đương đại gọi là gì?",
    options: [
      { id: "A", text: "Thơ tự do" },
      { id: "B", text: "Thơ thất ngôn" },
      { id: "C", text: "Thơ tứ tuyệt" },
      { id: "D", text: "Phú cổ thể" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "THƠ TỰ DO",
    normalizedAnswer: "THOTUDO",
    explanation: "Thơ tự do giải phóng ngòi bút khỏi gông cùm niêm luật gò bó để cảm xúc tuôn trào tự nhiên.",
    source: "Lý luận Văn học"
  },
  {
    id: "CK-076",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Sự tinh tường, nhạy bén trong suy xét và đánh giá mọi vấn đề sâu sắc gọi là gì?",
    options: [
      { id: "A", text: "Sáng suốt" },
      { id: "B", text: "U mê" },
      { id: "C", text: "Mù quáng" },
      { id: "D", text: "Thiển cận" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "SÁNG SUỐT",
    normalizedAnswer: "SANGSUOT",
    explanation: "Sáng suốt là phẩm chất lãnh đạo và tư duy lý trí giúp vượt qua mọi cám dỗ sai lầm.",
    source: "Từ điển Tiếng Việt"
  },
  {
    id: "CK-077",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Sự kiên định, son sắt của tấm lòng trung nghĩa với giang sơn đất nước gọi là gì?",
    options: [
      { id: "A", text: "Trung thành" },
      { id: "B", text: "Phản bội" },
      { id: "C", text: "Đầu hàng" },
      { id: "D", text: "Bán nước" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "TRUNG THÀNH",
    normalizedAnswer: "TRUNGTHANH",
    explanation: "Lòng trung thành với tổ quốc là danh dự và bổn phận cao cả nhất của mỗi công dân.",
    source: "Đạo đức học Công dân"
  },
  {
    id: "CK-078",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Những bài ca dao, dân ca thể hiện tình cảm lứa đôi và lời hẹn thề tha thiết gọi là gì?",
    options: [
      { id: "A", text: "Giao duyên" },
      { id: "B", text: "Vè chúc tết" },
      { id: "C", text: "Hát chèo đò" },
      { id: "D", text: "Hát then" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "GIAO DUYÊN",
    normalizedAnswer: "GIAODUYEN",
    explanation: "Hát giao duyên là nét đẹp văn hóa đối đáp tình tứ trong các hội làng mùa xuân truyền thống.",
    source: "Ca dao dân ca Việt Nam"
  },
  {
    id: "CK-079",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Sự thanh nhã, tao nhã trong cử chỉ và phong thái giao tiếp ứng xử của con người gọi là gì?",
    options: [
      { id: "A", text: "Lịch thiệp" },
      { id: "B", text: "Thô lỗ" },
      { id: "C", text: "Cộc cằn" },
      { id: "D", text: "Vô phép" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "LỊCH THIỆP",
    normalizedAnswer: "LICHTHIEP",
    explanation: "Lịch thiệp tạo nên ấn tượng văn minh, sự tôn trọng và hòa ái trong các mối quan hệ xã hội.",
    source: "Nghi thức Giao tiếp"
  },
  {
    id: "CK-080",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Lòng yêu chuộng tự do, không chịu khuất phục trước áp bức xiềng xích gọi là gì?",
    options: [
      { id: "A", text: "Bất khuất" },
      { id: "B", text: "Hèn yếu" },
      { id: "C", text: "Qùy lụy" },
      { id: "D", text: "Nhu nhược" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "BẤT KHUẤT",
    normalizedAnswer: "BATKHUAT",
    explanation: "Tinh thần bất khuất là truyền thống hào hùng hàng nghìn năm dựng nước và giữ nước.",
    source: "Lịch sử Việt Nam"
  },
  {
    id: "CK-081",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Hình ảnh ước lệ miêu tả vẻ đẹp cốt cách thanh cao của bậc chính nhân quân tử gọi là gì?",
    options: [
      { id: "A", text: "Tùng bách" },
      { id: "B", text: "Rau má" },
      { id: "C", text: "Cỏ dại" },
      { id: "D", text: "Bèo tấm" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "TÙNG BÁCH",
    normalizedAnswer: "TUNGBACH",
    explanation: "Cây tùng, cây bách giữa bão tuyết tượng trưng cho phẩm cách hiên ngang không đổi thay của người nghĩa khí.",
    source: "Thi pháp Văn học cổ điển"
  },
  {
    id: "CK-082",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Kinh nghiệm thực tiễn phong phú được tích lũy qua nhiều năm tháng hoạt động gọi là gì?",
    options: [
      { id: "A", text: "Trải nghiệm" },
      { id: "B", text: "Lý thuyết" },
      { id: "C", text: "Sách vở" },
      { id: "D", text: "Hoang tưởng" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "TRẢI NGHIỆM",
    normalizedAnswer: "TRAINGHIEM",
    explanation: "Trải nghiệm thực tế biến tri thức thành năng lực sống và sự chín chắn trong tư duy.",
    source: "Tâm lý học Thực hành"
  },
  {
    id: "CK-083",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Tinh thần dũng cảm, dám nghĩ dám làm và chấp nhận thử thách khó khăn gọi là gì?",
    options: [
      { id: "A", text: "Bản lĩnh" },
      { id: "B", text: "E sợ" },
      { id: "C", text: "Rụt rè" },
      { id: "D", text: "Bảo thủ" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "BẢN LĨNH",
    normalizedAnswer: "BANLINH",
    explanation: "Bản lĩnh kiên cường giúp con người đứng vững trước sóng gió và làm chủ vận mệnh chính mình.",
    source: "Kỹ năng sống hiện đại"
  },
  {
    id: "CK-084",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Thể loại kịch hát sân khấu truyền thống độc đáo có nguồn gốc từ vùng đồng bằng Bắc Bộ gọi là gì?",
    options: [
      { id: "A", text: "Chèo cổ" },
      { id: "B", text: "Tuồng" },
      { id: "C", text: "Cải lương" },
      { id: "D", text: "Xiếc" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "CHÈO CỔ",
    normalizedAnswer: "CHEOCO",
    explanation: "Chèo cổ gắn liền với hội hè đình làng, phản ánh tâm tư ước vọng của người nông dân bình dị.",
    source: "Nghệ thuật Sân khấu Dân tộc"
  },
  {
    id: "CK-085",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Khả năng nhìn thấu thời cuộc và dự liệu trước những biến cố tương lai gọi là gì?",
    options: [
      { id: "A", text: "Tiên tri" },
      { id: "B", text: "Hậu nghiệm" },
      { id: "C", text: "Mù tịt" },
      { id: "D", text: "Ngơ ngác" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "TIÊN TRI",
    normalizedAnswer: "TIENTRI",
    explanation: "Tiên tri dựa trên sự am hiểu quy luật vận động của lịch sử và sự sắc bén của trí tuệ.",
    source: "Từ điển Triết học"
  },
  {
    id: "CK-086",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Lối sống chan hòa, tương thân tương ái vì cộng đồng mà quên mình gọi là gì?",
    options: [
      { id: "A", text: "Vị tha" },
      { id: "B", text: "Vị kỷ" },
      { id: "C", text: "Vụ lợi" },
      { id: "D", text: "Toan tính" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "VỊ THA",
    normalizedAnswer: "VITHA",
    explanation: "Vị tha (sống vì người khác) là cảnh giới cao quý của tình thương và lòng nhân đạo.",
    source: "Đạo đức học"
  },
  {
    id: "CK-087",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Thể văn biền ngẫu có vần điệu dùng tả cảnh, ngâm vịnh cảm tác nhân sinh gọi là gì?",
    options: [
      { id: "A", text: "Phú Đường" },
      { id: "B", text: "Ký sự" },
      { id: "C", text: "Truyện cổ" },
      { id: "D", text: "Hài kịch" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "PHÚ ĐƯỜNG",
    normalizedAnswer: "PHUDUONG",
    explanation: "Thể Phú (tiêu biểu như Bạch Đằng giang phú của Trương Hán Siêu) mang âm hưởng hào sảng, tráng lệ.",
    source: "Văn học trung đại Việt Nam"
  },
  {
    id: "CK-088",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Ngôi trường đào tạo nhân tài hàng đầu thời phong kiến được xem là trường đại học đầu tiên ở Việt Nam?",
    options: [
      { id: "A", text: "Quốc Tử Giám" },
      { id: "B", text: "Trường Đông Kinh" },
      { id: "C", text: "Trường Bưởi" },
      { id: "D", text: "Học viện Quân sự" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "QUỐC TỬ GIÁM",
    normalizedAnswer: "QUOCTUGIAM",
    explanation: "Quốc Tử Giám xây dựng năm 1076 dưới triều Lý là cái nôi khoa bảng vẻ vang của nước nhà.",
    source: "Đại Việt Sử Ký Toàn Thư"
  },
  {
    id: "CK-089",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Sự bình đẳng, công minh chính trực không thiên vị trong phân xử việc đời gọi là gì?",
    options: [
      { id: "A", text: "Công bằng" },
      { id: "B", text: "Bất công" },
      { id: "C", text: "Thiên vị" },
      { id: "D", text: "Khuất tất" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "CÔNG BẰNG",
    normalizedAnswer: "CONGBANG",
    explanation: "Công bằng là nền tảng cốt lõi của pháp luật và lương tri xã hội văn minh.",
    source: "Pháp luật đại cương"
  },
  {
    id: "CK-090",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Hội thề kết nghĩa huynh đệ thề sống chết có nhau trong điển tích cổ gọi là gì?",
    options: [
      { id: "A", text: "Kết nghĩa" },
      { id: "B", text: "Kình địch" },
      { id: "C", text: "Ganh đua" },
      { id: "D", text: "Bất hòa" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "KẾT NGHĨA",
    normalizedAnswer: "KETNGHIA",
    explanation: "Kết nghĩa đào viên (như Lưu - Quan - Trương) là biểu tượng bất hủ của tình bằng hữu trung kiên.",
    source: "Điển tích cổ điển"
  },
  {
    id: "CK-091",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Sự gắn kết bền vững của các thành viên trong cộng đồng chung một cội nguồn gọi là gì?",
    options: [
      { id: "A", text: "Đồng bào" },
      { id: "B", text: "Người dưng" },
      { id: "C", text: "Ngoại kiều" },
      { id: "D", text: "Kẻ thù" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "ĐỒNG BÀO",
    normalizedAnswer: "DONGBAO",
    explanation: "Từ 'Đồng bào' (cùng chung bọc trăm trứng mẹ Âu Cơ) là cách xưng hô thiêng liêng nhất của người Việt.",
    source: "Truyền thuyết Con Rồng Cháu Tiên"
  },
  {
    id: "CK-092",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Hành động dũng cảm hy sinh thân mình vì độc lập tự do của dân tộc gọi là gì?",
    options: [
      { id: "A", text: "Cứu quốc" },
      { id: "B", text: "Đầu hàng" },
      { id: "C", text: "Cầu an" },
      { id: "D", text: "Trốn tránh" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "CỨU QUỐC",
    normalizedAnswer: "CUUQUOC",
    explanation: "Sự nghiệp cứu quốc vẻ vang của tiền nhân đã đổi lấy nền hòa bình độc lập cho thế hệ hôm nay.",
    source: "Lịch sử đấu tranh giải phóng dân tộc"
  },
  {
    id: "CK-093",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Hệ thống tri thức dân gian truyền khẩu qua muôn đời về cuộc sống gọi chung là gì?",
    options: [
      { id: "A", text: "Dân gian" },
      { id: "B", text: "Cung đình" },
      { id: "C", text: "Ngoại lai" },
      { id: "D", text: "Tây học" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "DÂN GIAN",
    normalizedAnswer: "DANGIAN",
    explanation: "Văn hóa dân gian là cội nguồn phù sa màu mỡ bồi đắp cho nền văn hóa bác học phát triển.",
    source: "Văn hóa học"
  },
  {
    id: "CK-094",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Khát vọng vươn lên chiếm lĩnh đỉnh cao tri thức và sáng tạo của tuổi trẻ gọi là gì?",
    options: [
      { id: "A", text: "Ý chí" },
      { id: "B", text: "Thoái chí" },
      { id: "C", text: "Nản lòng" },
      { id: "D", text: "Bỏ cuộc" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "Ý CHÍ",
    normalizedAnswer: "YCHI",
    explanation: "Ý chí và nghị lực là đôi cánh giúp thanh niên vượt qua mọi giới hạn để thành công.",
    source: "Tâm lý học Nhân cách"
  },
  {
    id: "CK-095",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Sự chân thật, không tô vẽ màu mè trong tác phẩm văn học hiện thực gọi là gì?",
    options: [
      { id: "A", text: "Chân thực" },
      { id: "B", text: "Hư cấu quá đà" },
      { id: "C", text: "Bịa đặt" },
      { id: "D", text: "Sáo rỗng" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "CHÂN THỰC",
    normalizedAnswer: "CHANTHUC",
    explanation: "Tính chân thực là linh hồn của chủ nghĩa hiện thực phê phán trong văn học.",
    source: "Lý luận Văn học"
  },
  {
    id: "CK-096",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Âm hưởng hào tráng, bi tráng của các bài thơ ca cách mạng thời kháng chiến gọi là gì?",
    options: [
      { id: "A", text: "Hùng ca" },
      { id: "B", text: "Ai oán" },
      { id: "C", text: "Ủ rũ" },
      { id: "D", text: "Rầu rĩ" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "HÙNG CA",
    normalizedAnswer: "HUNGCA",
    explanation: "Bản hùng ca thời đại thổi bùng ngọn lửa yêu nước và niềm tin chiến thắng trong muôn triệu con tim.",
    source: "Thơ ca Kháng chiến"
  },
  {
    id: "CK-097",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Lòng tự hào chính đáng về cội nguồn và thành tựu của dân tộc mình gọi là gì?",
    options: [
      { id: "A", text: "Tự hào" },
      { id: "B", text: "Tự ti" },
      { id: "C", text: "Mặc cảm" },
      { id: "D", text: "Sùng ngoại" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "TỰ HÀO",
    normalizedAnswer: "TUHAO",
    explanation: "Lòng tự hào dân tộc tiếp thêm sức mạnh tinh thần to lớn để hội nhập và phát triển cùng thế giới.",
    source: "Giáo dục Công dân"
  },
  {
    id: "CK-098",
    round: "chung_ket",
    topic: "thanh_ngu_tuc_ngu",
    difficulty: "kho",
    question: "Sự bền bỉ, kiên gan vượt qua muôn ngàn gian lao thử thách gọi là gì?",
    options: [
      { id: "A", text: "Kiên trì" },
      { id: "B", text: "Bỏ cuộc" },
      { id: "C", text: "Nản lòng" },
      { id: "D", text: "Chùn bước" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "KIÊN TRÌ",
    normalizedAnswer: "KIENTRI",
    explanation: "Có công mài sắt có ngày nên kim, kiên trì là chìa khóa mở cánh cửa mọi thành công.",
    source: "Tục ngữ Việt Nam"
  },
  {
    id: "CK-099",
    round: "chung_ket",
    topic: "ca_dao_tho_ca",
    difficulty: "kho",
    question: "Bản sắc văn hóa độc đáo của 54 dân tộc anh em trên dải đất Việt Nam gọi là gì?",
    options: [
      { id: "A", text: "Bản sắc" },
      { id: "B", text: "Đồng nhất" },
      { id: "C", text: "Nhạt nhòa" },
      { id: "D", text: "Rập khuôn" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "BẢN SẮC",
    normalizedAnswer: "BANSAC",
    explanation: "Bản sắc văn hóa dân tộc là căn cước tinh thần giúp phân biệt dân tộc này với dân tộc khác trên thế giới.",
    source: "Cơ sở Văn hóa Việt Nam"
  },
  {
    id: "CK-100",
    round: "chung_ket",
    topic: "nghia_tu",
    difficulty: "kho",
    question: "Trạng thái đất nước thái bình, nhân dân ấm no hạnh phúc gọi là gì?",
    options: [
      { id: "A", text: "Thái bình" },
      { id: "B", text: "Chiến tranh" },
      { id: "C", text: "Loạn lạc" },
      { id: "D", text: "Đói nghèo" }
    ],
    correctOptionId: "A",
    horizontalAnswer: "THÁI BÌNH",
    normalizedAnswer: "THAIBINH",
    explanation: "Quốc thái dân an, thiên hạ thái bình là khát vọng muôn đời của nhân dân ta.",
    source: "Từ điển Hán Việt"
  }
];
