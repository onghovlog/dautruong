/**
 * Ngân hàng từ vựng & câu hỏi chuyên biệt cho Ô chữ Tiếng Việt
 * Hỗ trợ thuật toán tự động phát triển câu hỏi cho mọi từ khóa tiếng Việt
 */

export const LEXICON_QUESTIONS = [
  // ================= KÝ TỰ T =================
  {
    targetChar: 'T',
    horizontalAnswer: 'KIẾN TẠO',
    normalizedAnswer: 'KIENTAO',
    charIndex: 4, // K-I-E-N-[T]-A-O
    question: 'Điền từ còn thiếu trong thông điệp: “Thầy cô truyền cảm hứng, sinh viên ... tương lai”.',
    explanation: '“Thầy cô truyền cảm hứng, sinh viên kiến tạo tương lai” là thông điệp giáo dục tích cực.',
    difficulty: 'vua',
    options: [
      { id: 'A', text: 'Kiến tạo' },
      { id: 'B', text: 'Xây đắp' },
      { id: 'C', text: 'Chờ đợi' },
      { id: 'D', text: 'Mơ ước' }
    ]
  },
  {
    targetChar: 'T',
    horizontalAnswer: 'TỐT NGHIỆP',
    normalizedAnswer: 'TOTNGHIEP',
    charIndex: 2, // T-O-[T]-N-G-H-I-E-P
    question: 'Hoàn thành chương trình học và được công nhận đủ điều kiện ra trường gọi là gì?',
    explanation: 'Tốt nghiệp là dấu mốc hoàn tất khóa đào tạo và nhận văn bằng chứng chỉ.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Tốt nghiệp' },
      { id: 'B', text: 'Nhập học' },
      { id: 'C', text: 'Thực tập' },
      { id: 'D', text: 'Bảo lưu' }
    ]
  },
  {
    targetChar: 'T',
    horizontalAnswer: 'TRI THỨC',
    normalizedAnswer: 'TRITHUC',
    charIndex: 0, // [T]-R-I-T-H-U-C
    question: 'Hiểu biết và vốn kiến thức sâu rộng tích lũy qua học tập, trải nghiệm được gọi là gì?',
    explanation: 'Tri thức là tài sản quý báu của mỗi cá nhân và của cả nhân loại.',
    difficulty: 'vua',
    options: [
      { id: 'A', text: 'Tri thức' },
      { id: 'B', text: 'Tài sản' },
      { id: 'C', text: 'Của cải' },
      { id: 'D', text: 'Thực nghiệm' }
    ]
  },
  {
    targetChar: 'T',
    horizontalAnswer: 'TIẾNG VIỆT',
    normalizedAnswer: 'TIENGVIET',
    charIndex: 0, // [T]-I-E-N-G-V-I-E-T
    question: 'Ngôn ngữ quốc gia chính thức của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là gì?',
    explanation: 'Tiếng Việt là tiếng mẹ đẻ và ngôn ngữ giao tiếp chính thức của dân tộc ta.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Tiếng Việt' },
      { id: 'B', text: 'Tiếng Anh' },
      { id: 'C', text: 'Tiếng Pháp' },
      { id: 'D', text: 'Tiếng Hán' }
    ]
  },
  {
    targetChar: 'T',
    horizontalAnswer: 'TẬP TRUNG',
    normalizedAnswer: 'TAPTRUNG',
    charIndex: 0,
    question: 'Khả năng dồn toàn bộ sự chú ý và trí lực vào một việc để đạt hiệu quả cao nhất gọi là gì?',
    explanation: 'Sự tập trung là bí quyết rèn luyện then chốt giúp sinh viên làm chủ việc học.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Tập trung' },
      { id: 'B', text: 'Phân tán' },
      { id: 'C', text: 'Mất tập trung' },
      { id: 'D', text: 'Thụ động' }
    ]
  },
  {
    targetChar: 'T',
    horizontalAnswer: 'SÁNG TẠO',
    normalizedAnswer: 'SANGTAO',
    charIndex: 4, // S-A-N-G-[T]-A-O
    question: 'Năng lực tư duy tạo ra những ý tưởng mới mẻ, độc đáo và ứng dụng thực tế gọi là gì?',
    explanation: 'Sáng tạo là một trong những giá trị cốt lõi hàng đầu của sinh viên thời đại mới.',
    difficulty: 'vua',
    options: [
      { id: 'A', text: 'Sáng tạo' },
      { id: 'B', text: 'Sao chép' },
      { id: 'C', text: 'Rập khuôn' },
      { id: 'D', text: 'Bắt chước' }
    ]
  },

  // ================= KÝ TỰ R =================
  {
    targetChar: 'R',
    horizontalAnswer: 'TRI ÂN',
    normalizedAnswer: 'TRIAN',
    charIndex: 1, // T-[R]-I-A-N
    question: 'Tình cảm biết ơn sâu sắc mà sinh viên gửi đến thầy cô nhân ngày 20/11 được gọi là gì?',
    explanation: 'Tri ân thể hiện truyền thống đạo lý uống nước nhớ nguồn, tôn sư trọng đạo.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Tri ân' },
      { id: 'B', text: 'Thương tiếc' },
      { id: 'C', text: 'Chào hỏi' },
      { id: 'D', text: 'Hẹn ước' }
    ]
  },
  {
    targetChar: 'R',
    horizontalAnswer: 'TRƯỜNG HỌC',
    normalizedAnswer: 'TRUONGHOC',
    charIndex: 1, // T-[R]-U-O-N-G-H-O-C
    question: 'Môi trường giáo dục nơi thầy cô giảng dạy và sinh viên tiếp thu tri thức gọi là gì?',
    explanation: 'Trường học là cái nôi nuôi dưỡng tài năng và nhân cách của mỗi thế hệ.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Trường học' },
      { id: 'B', text: 'Công xưởng' },
      { id: 'C', text: 'Thương trường' },
      { id: 'D', text: 'Bệnh viện' }
    ]
  },
  {
    targetChar: 'R',
    horizontalAnswer: 'RÈN LUYỆN',
    normalizedAnswer: 'RENLUYEN',
    charIndex: 0, // [R]-E-N-L-U-Y-E-N
    question: 'Quá trình thực hành kiên trì nhằm nâng cao phẩm chất và kỹ năng bản thân gọi là gì?',
    explanation: 'Rèn luyện mỗi ngày là con đường ngắn nhất dẫn tới sự tinh thông nghề nghiệp.',
    difficulty: 'vua',
    options: [
      { id: 'A', text: 'Rèn luyện' },
      { id: 'B', text: 'Nghỉ ngơi' },
      { id: 'C', text: 'Chờ đợi' },
      { id: 'D', text: 'Xem xét' }
    ]
  },
  {
    targetChar: 'R',
    horizontalAnswer: 'TRỌNG ĐẠO',
    normalizedAnswer: 'TRONGDAO',
    charIndex: 1, // T-[R]-O-N-G-D-A-O
    question: 'Thành ngữ bốn chữ nói về truyền thống kính trọng người thầy: “Tôn sư ...”?',
    explanation: '“Tôn sư trọng đạo” là nét đẹp văn hóa ngàn đời của dân tộc Việt Nam.',
    difficulty: 'vua',
    options: [
      { id: 'A', text: 'Trọng đạo' },
      { id: 'B', text: 'Kính bạn' },
      { id: 'C', text: 'Yêu nghề' },
      { id: 'D', text: 'Mến đức' }
    ]
  },

  // ================= KÝ TỰ I =================
  {
    targetChar: 'I',
    horizontalAnswer: 'SINH VIÊN',
    normalizedAnswer: 'SINHVIEN',
    charIndex: 5, // S-I-N-H-V-[I]-E-N
    question: 'Tại FPT Polytechnic, người học thường được gọi bằng danh xưng nào?',
    explanation: 'Sinh viên là người đang theo học tại các trường cao đẳng, đại học.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Sinh viên' },
      { id: 'B', text: 'Học sinh' },
      { id: 'C', text: 'Nghiên cứu sinh' },
      { id: 'D', text: 'Giáo viên' }
    ]
  },
  {
    targetChar: 'I',
    horizontalAnswer: 'TIN HỌC',
    normalizedAnswer: 'TINHOC',
    charIndex: 1, // T-[I]-N-H-O-C
    question: 'Ngành khoa học nghiên cứu việc xử lý thông tin tự động bằng máy vi tính gọi là gì?',
    explanation: 'Tin học đóng vai trò then chốt trong kỷ nguyên số và công nghệ 4.0.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Tin học' },
      { id: 'B', text: 'Vật lý' },
      { id: 'C', text: 'Hóa học' },
      { id: 'D', text: 'Sinh học' }
    ]
  },
  {
    targetChar: 'I',
    horizontalAnswer: 'KỸ NĂNG',
    normalizedAnswer: 'KYNANG',
    charIndex: 2, // K-Y-N-A-N-G (hoặc K-I-N-A-N-G)
    question: 'Khả năng vận dụng kiến thức lý thuyết để thực hiện thành thạo công việc gọi là gì?',
    explanation: 'Kỹ năng thực hành là thế mạnh vượt trội của sinh viên trường nghề.',
    difficulty: 'vua',
    options: [
      { id: 'A', text: 'Kỹ năng' },
      { id: 'B', text: 'Khái niệm' },
      { id: 'C', text: 'Định nghĩa' },
      { id: 'D', text: 'Hình thức' }
    ]
  },
  {
    targetChar: 'I',
    horizontalAnswer: 'NIỀM TIN',
    normalizedAnswer: 'NIEMTIN',
    charIndex: 1, // N-[I]-E-M-T-I-N
    question: 'Sự tin tưởng vững vàng vào năng lực bản thân và lý tưởng theo đuổi gọi là gì?',
    explanation: 'Niềm tin chính là động lực thắp sáng ngọn lửa nhiệt huyết của tuổi trẻ.',
    difficulty: 'vua',
    options: [
      { id: 'A', text: 'Niềm tin' },
      { id: 'B', text: 'Nghi ngờ' },
      { id: 'C', text: 'Hoang mang' },
      { id: 'D', text: 'Lo âu' }
    ]
  },

  // ================= KÝ TỰ H =================
  {
    targetChar: 'H',
    horizontalAnswer: 'THẦY CÔ',
    normalizedAnswer: 'THAYCO',
    charIndex: 1, // T-[H]-A-Y-C-O
    question: 'Người hướng dẫn, truyền đạt kiến thức và đồng hành cùng sinh viên được gọi chung là gì?',
    explanation: 'Thầy cô là người lái đò thầm lặng đưa bao thế hệ sinh viên cập bến thành công.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Thầy cô' },
      { id: 'B', text: 'Bạn bè' },
      { id: 'C', text: 'Đồng nghiệp' },
      { id: 'D', text: 'Thực tập sinh' }
    ]
  },
  {
    targetChar: 'H',
    horizontalAnswer: 'HỌC TẬP',
    normalizedAnswer: 'HOCTAP',
    charIndex: 0, // [H]-O-C-T-A-P
    question: 'Hoạt động tiếp thu kiến thức và rèn luyện kỹ năng mỗi ngày của sinh viên là gì?',
    explanation: 'Học tập là nhiệm vụ trung tâm và hành trình suốt đời của mỗi người.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Học tập' },
      { id: 'B', text: 'Vui chơi' },
      { id: 'C', text: 'Nghỉ dưỡng' },
      { id: 'D', text: 'Du lịch' }
    ]
  },
  {
    targetChar: 'H',
    horizontalAnswer: 'HÀNH TRANG',
    normalizedAnswer: 'HANHTRANG',
    charIndex: 0, // [H]-A-N-H-T-R-A-N-G
    question: 'Những hiểu biết, bản lĩnh và kỹ năng chuẩn bị trước khi bước vào đời gọi là gì?',
    explanation: 'Hành trang tri thức vững chắc sẽ mở ra tương lai xán lạn cho người trẻ.',
    difficulty: 'vua',
    options: [
      { id: 'A', text: 'Hành trang' },
      { id: 'B', text: 'Tư trang' },
      { id: 'C', text: 'Quà cáp' },
      { id: 'D', text: 'Vật dụng' }
    ]
  },

  // ================= KÝ TỰ U =================
  {
    targetChar: 'U',
    horizontalAnswer: 'THỰC HÀNH',
    normalizedAnswer: 'THUCHANH',
    charIndex: 2, // T-H-[U]-C-H-A-N-H
    question: 'Phương pháp học gắn với thao tác, làm bài tập và tạo sản phẩm thực tế gọi là gì?',
    explanation: 'Triết lý đào tạo “Thực học - Thực nghiệp” lấy thực hành làm trung tâm.',
    difficulty: 'vua',
    options: [
      { id: 'A', text: 'Thực hành' },
      { id: 'B', text: 'Học vẹt' },
      { id: 'C', text: 'Đoán mò' },
      { id: 'D', text: 'Lý thuyết suông' }
    ]
  },
  {
    targetChar: 'U',
    horizontalAnswer: 'TƯ DUY',
    normalizedAnswer: 'TUDUY',
    charIndex: 1, // T-[U]-D-U-Y
    question: 'Năng lực suy nghĩ, phân tích, phán đoán logic để giải quyết vấn đề gọi là gì?',
    explanation: 'Tư duy logic và phản biện là chìa khóa then chốt của người học hiện đại.',
    difficulty: 'vua',
    options: [
      { id: 'A', text: 'Tư duy' },
      { id: 'B', text: 'Cảm giác' },
      { id: 'C', text: 'Bản năng' },
      { id: 'D', text: 'Thói quen' }
    ]
  },
  {
    targetChar: 'U',
    horizontalAnswer: 'ỨNG DỤNG',
    normalizedAnswer: 'UNGDUNG',
    charIndex: 0, // [U]-N-G-D-U-N-G
    question: 'Việc đem tri thức đã học áp dụng vào thực tế công việc và cuộc sống gọi là gì?',
    explanation: 'Học để ứng dụng, học để làm được việc là mục tiêu đào tạo của FPT Polytechnic.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Ứng dụng' },
      { id: 'B', text: 'Bỏ quên' },
      { id: 'C', text: 'Cất giữ' },
      { id: 'D', text: 'Sao chép' }
    ]
  },

  // ================= KÝ TỰ C =================
  {
    targetChar: 'C',
    horizontalAnswer: 'HỌC TẬP',
    normalizedAnswer: 'HOCTAP',
    charIndex: 2, // H-O-[C]-T-A-P
    question: 'Hoạt động tiếp thu kiến thức và rèn luyện kỹ năng mỗi ngày của sinh viên là gì?',
    explanation: 'Học tập là kim chỉ nam giúp người trẻ vươn tới đỉnh cao sự nghiệp.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Học tập' },
      { id: 'B', text: 'Tranh luận' },
      { id: 'C', text: 'Xem phim' },
      { id: 'D', text: 'Mua sắm' }
    ]
  },
  {
    targetChar: 'C',
    horizontalAnswer: 'CÔNG NGHỆ',
    normalizedAnswer: 'CONGNGHE',
    charIndex: 0, // [C]-O-N-G-N-G-H-E
    question: 'Ngành mũi nhọn ứng dụng khoa học kỹ thuật hiện đại để đổi mới cuộc sống con người?',
    explanation: 'Công nghệ thông tin là một trong những thế mạnh hàng đầu tại FPT.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Công nghệ' },
      { id: 'B', text: 'Nông nghiệp' },
      { id: 'C', text: 'Thủ công' },
      { id: 'D', text: 'Giao thương' }
    ]
  },
  {
    targetChar: 'C',
    horizontalAnswer: 'THÀNH CÔNG',
    normalizedAnswer: 'THANHCONG',
    charIndex: 5, // T-H-A-N-H-[C]-O-N-G
    question: 'Kết quả tốt đẹp sau chuỗi ngày nỗ lực học hỏi, rèn luyện và cống hiến gọi là gì?',
    explanation: 'Thành công chỉ đến với những ai không ngừng vươn lên và bền bỉ theo đuổi ước mơ.',
    difficulty: 'de',
    options: [
      { id: 'A', text: 'Thành công' },
      { id: 'B', text: 'Thất bại' },
      { id: 'C', text: 'Chùn bước' },
      { id: 'D', text: 'Trì hoãn' }
    ]
  },

  // ================= CÁC KÝ TỰ KHÁC TRONG TIẾNG VIỆT =================
  // Ký tự A
  {
    targetChar: 'A',
    horizontalAnswer: 'TỰ HÀO',
    normalizedAnswer: 'TUHAO',
    charIndex: 3, // T-U-H-[A]-O
    question: 'Cảm giác phấn khởi, vinh dự khi bản thân hoặc tập thể đạt thành tích xuất sắc gọi là gì?',
    explanation: 'Tự hào là sinh viên FPT Polytechnic bản lĩnh, tự tin và sáng tạo.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Tự hào' }, { id: 'B', text: 'Tự ti' }, { id: 'C', text: 'Mặc cảm' }, { id: 'D', text: 'Tự phụ' }]
  },
  {
    targetChar: 'A',
    horizontalAnswer: 'BẢN LĨNH',
    normalizedAnswer: 'BANLINH',
    charIndex: 1, // B-[A]-N-L-I-N-H
    question: 'Sự kiên định, dũng cảm đối mặt và vượt qua mọi khó khăn thử thách gọi là gì?',
    explanation: 'Bản lĩnh tuổi trẻ giúp sinh viên sẵn sàng dấn thân vào những dự án lớn.',
    difficulty: 'vua',
    options: [{ id: 'A', text: 'Bản lĩnh' }, { id: 'B', text: 'Nhút nhát' }, { id: 'C', text: 'Rụt rè' }, { id: 'D', text: 'Dao động' }]
  },

  // Ký tự N
  {
    targetChar: 'N',
    horizontalAnswer: 'NGÔN NGỮ',
    normalizedAnswer: 'NGONNGU',
    charIndex: 0,
    question: 'Hệ thống âm thanh và ký hiệu chữ viết dùng để tư duy và giao tiếp trong xã hội gọi là gì?',
    explanation: 'Ngôn ngữ là công cụ diệu kỳ kết nối con người và truyền tải tri thức.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Ngôn ngữ' }, { id: 'B', text: 'Âm nhạc' }, { id: 'C', text: 'Hội họa' }, { id: 'D', text: 'Hình tượng' }]
  },
  {
    targetChar: 'N',
    horizontalAnswer: 'TRẢI NGHIỆM',
    normalizedAnswer: 'TRAINGHIEM',
    charIndex: 4, // T-R-A-I-[N]-G-H-I-E-M
    question: 'Quá trình cọ xát trực tiếp với thực tế dự án để tích lũy bài học kinh nghiệm gọi là gì?',
    explanation: 'Trải nghiệm thực tế tại doanh nghiệp là điểm nhấn đào tạo của FPT.',
    difficulty: 'vua',
    options: [{ id: 'A', text: 'Trải nghiệm' }, { id: 'B', text: 'Suy ngẫm' }, { id: 'C', text: 'Nghe kể' }, { id: 'D', text: 'Đọc sách' }]
  },

  // Ký tự G
  {
    targetChar: 'G',
    horizontalAnswer: 'GIẢNG VIÊN',
    normalizedAnswer: 'GIANGVIEN',
    charIndex: 0,
    question: 'Người trực tiếp giảng dạy và nghiên cứu khoa học tại các trường cao đẳng, đại học gọi là gì?',
    explanation: 'Giảng viên là người dẫn dắt sinh viên tiếp cận đỉnh cao nghề nghiệp.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Giảng viên' }, { id: 'B', text: 'Học viên' }, { id: 'C', text: 'Thí sinh' }, { id: 'D', text: 'Giám thị' }]
  },
  {
    targetChar: 'G',
    horizontalAnswer: 'GẮN KẾT',
    normalizedAnswer: 'GANKET',
    charIndex: 0,
    question: 'Mối quan hệ đoàn kết, thấu hiểu và phối hợp nhịp nhàng giữa các thành viên gọi là gì?',
    explanation: 'Sự gắn kết tạo nên sức mạnh vững vàng của một tập thể sinh viên.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Gắn kết' }, { id: 'B', text: 'Rời rạc' }, { id: 'C', text: 'Chia rẽ' }, { id: 'D', text: 'Xa cách' }]
  },

  // Ký tự D / Đ
  {
    targetChar: 'D',
    horizontalAnswer: 'ĐẤT NƯỚC',
    normalizedAnswer: 'DATNUOC',
    charIndex: 0,
    question: 'Tổ quốc thân yêu, nơi chôn rau cắt rốn của bao thế hệ người dân Việt Nam?',
    explanation: 'Đất nước là nguồn cảm hứng thiêng liêng và niềm tự hào của dân tộc.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Đất nước' }, { id: 'B', text: 'Hành tinh' }, { id: 'C', text: 'Thành phố' }, { id: 'D', text: 'Làng quê' }]
  },
  {
    targetChar: 'D',
    horizontalAnswer: 'DỰ ÁN',
    normalizedAnswer: 'DUAN',
    charIndex: 0,
    question: 'Phương pháp đào tạo “Học qua ...” (Project-based Learning) là đặc trưng của FPT Polytechnic?',
    explanation: 'Học qua dự án giúp sinh viên cọ xát với bài toán thực tế của doanh nghiệp.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Dự án' }, { id: 'B', text: 'Sách giáo khoa' }, { id: 'C', text: 'Trắc nghiệm' }, { id: 'D', text: 'Học thuộc' }]
  },

  // Ký tự P
  {
    targetChar: 'P',
    horizontalAnswer: 'PHÁT TRIỂN',
    normalizedAnswer: 'PHATTRIEN',
    charIndex: 0,
    question: 'Sự vận động đi lên, tiến bộ hơn về cả chất và lượng của một cá nhân hay tổ chức gọi là gì?',
    explanation: 'Phát triển toàn diện là tôn chỉ giáo dục hướng tới tương lai.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Phát triển' }, { id: 'B', text: 'Thụt lùi' }, { id: 'C', text: 'Đứng yên' }, { id: 'D', text: 'Tiêu biến' }]
  },
  {
    targetChar: 'P',
    horizontalAnswer: 'POLYTECHNIC',
    normalizedAnswer: 'POLYTECHNIC',
    charIndex: 0,
    question: 'Trường Cao đẳng FPT ... - Nơi đào tạo thực học, thực nghiệp hàng đầu Việt Nam?',
    explanation: 'FPT Polytechnic là hệ thống đào tạo nghề uy tín thuộc Tập đoàn FPT.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Polytechnic' }, { id: 'B', text: 'University' }, { id: 'C', text: 'Academy' }, { id: 'D', text: 'College' }]
  },

  // Ký tự O
  {
    targetChar: 'O',
    horizontalAnswer: 'TIẾP SỨC',
    normalizedAnswer: 'TIEPSUC',
    charIndex: 5,
    question: 'Phong trào tình nguyện đồng hành, giúp đỡ thí sinh trong mùa thi cử gọi là “... mùa thi”?',
    explanation: 'Tiếp sức mùa thi là hoạt động nhân văn thắm đượm tình người của sinh viên.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Tiếp sức' }, { id: 'B', text: 'Tham gia' }, { id: 'C', text: 'Đón tiếp' }, { id: 'D', text: 'Cổ vũ' }]
  },
  {
    targetChar: 'O',
    horizontalAnswer: 'ĐOÀN KẾT',
    normalizedAnswer: 'DOANKET',
    charIndex: 1, // D-[O]-A-N-K-E-T
    question: 'Truyền thống quý báu: “Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao”?',
    explanation: 'Đoàn kết là cội nguồn tạo nên sức mạnh vô địch của dân tộc Việt Nam.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Đoàn kết' }, { id: 'B', text: 'Tách biệt' }, { id: 'C', text: 'Đơn độc' }, { id: 'D', text: 'Bè phái' }]
  },

  // Ký tự V
  {
    targetChar: 'V',
    horizontalAnswer: 'VĂN HÓA',
    normalizedAnswer: 'VANHOA',
    charIndex: 0,
    question: 'Toàn bộ những giá trị vật chất và tinh thần do loài người sáng tạo ra trong lịch sử?',
    explanation: 'Văn hóa là linh hồn, là bản sắc cốt lõi của một dân tộc.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Văn hóa' }, { id: 'B', text: 'Công nghiệp' }, { id: 'C', text: 'Kỹ thuật' }, { id: 'D', text: 'Thương nghiệp' }]
  },
  {
    targetChar: 'V',
    horizontalAnswer: 'VƯƠN XA',
    normalizedAnswer: 'VUONXA',
    charIndex: 0,
    question: 'Khát vọng bay cao, mở rộng tầm nhìn hội nhập quốc tế của thế hệ trẻ gọi là gì?',
    explanation: 'Vươn xa ra biển lớn tri thức là khát vọng của sinh viên thời đại mới.',
    difficulty: 'vua',
    options: [{ id: 'A', text: 'Vươn xa' }, { id: 'B', text: 'Thu mình' }, { id: 'C', text: 'Bằng lòng' }, { id: 'D', text: 'Dừng lại' }]
  },

  // Ký tự M
  {
    targetChar: 'M',
    horizontalAnswer: 'MỤC TIÊU',
    normalizedAnswer: 'MUCTIEU',
    charIndex: 0,
    question: 'Cột mốc kết quả cụ thể mà sinh viên đặt ra và phấn đấu đạt được trong học tập gọi là gì?',
    explanation: 'Xác định mục tiêu rõ ràng là bước khởi đầu của mọi thành công.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Mục tiêu' }, { id: 'B', text: 'Ước mơ viển vông' }, { id: 'C', text: 'Rủi ro' }, { id: 'D', text: 'Trở ngại' }]
  },
  {
    targetChar: 'M',
    horizontalAnswer: 'ĐAM MÊ',
    normalizedAnswer: 'DAMME',
    charIndex: 2, // D-A-[M]-M-E
    question: 'Sự yêu thích say sưa, hết lòng theo đuổi một ngành nghề hay lĩnh vực gọi là gì?',
    explanation: 'Đam mê chính là ngọn lửa thắp sáng nhiệt huyết và sức sáng tạo của tuổi trẻ.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Đam mê' }, { id: 'B', text: 'Thờ ơ' }, { id: 'C', text: 'Chán nản' }, { id: 'D', text: 'Gượng ép' }]
  },

  // Ký tự L
  {
    targetChar: 'L',
    horizontalAnswer: 'LÝ TƯỞNG',
    normalizedAnswer: 'LYTUONG',
    charIndex: 0,
    question: 'Mục đích cao đẹp và kim chỉ nam soi sáng con đường cống hiến của người thanh niên gọi là gì?',
    explanation: 'Sống có lý tưởng giúp cuộc đời mỗi con người trở nên ý nghĩa hơn.',
    difficulty: 'vua',
    options: [{ id: 'A', text: 'Lý tưởng' }, { id: 'B', text: 'Ảo tưởng' }, { id: 'C', text: 'Toan tính' }, { id: 'D', text: 'Lợi ích nhỏ' }]
  },

  // Ký tự S
  {
    targetChar: 'S',
    horizontalAnswer: 'SỨ MỆNH',
    normalizedAnswer: 'SUMENH',
    charIndex: 0,
    question: 'Trách nhiệm cao cả, mục đích tồn tại và hành động của một tổ chức hay cá nhân gọi là gì?',
    explanation: 'Sứ mệnh của giáo dục là khai phóng tiềm năng và kiến tạo con người.',
    difficulty: 'vua',
    options: [{ id: 'A', text: 'Sứ mệnh' }, { id: 'B', text: 'Nhiệm vụ tạm thời' }, { id: 'C', text: 'Công việc ngày' }, { id: 'D', text: 'Lợi nhuận' }]
  },

  // Ký tự B
  {
    targetChar: 'B',
    horizontalAnswer: 'BẠN BÈ',
    normalizedAnswer: 'BANBE',
    charIndex: 0,
    question: 'Những người đồng trang lứa cùng học tập, chia sẻ vui buồn trên giảng đường gọi là gì?',
    explanation: 'Tình bạn thời sinh viên là kỷ niệm đẹp đẽ khó quên của mỗi người.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Bạn bè' }, { id: 'B', text: 'Đối thủ' }, { id: 'C', text: 'Người lạ' }, { id: 'D', text: 'Khách hàng' }]
  },

  // Ký tự Y
  {
    targetChar: 'Y',
    horizontalAnswer: 'Ý CHÍ',
    normalizedAnswer: 'YCHI',
    charIndex: 0,
    question: 'Quyết tâm kiên cường vượt qua khó khăn để đi đến cái đích cuối cùng gọi là gì?',
    explanation: 'Có ý chí thì mọi thử thách chông gai đều trở thành bàn đạp tiến bước.',
    difficulty: 'de',
    options: [{ id: 'A', text: 'Ý chí' }, { id: 'B', text: 'Bỏ cuộc' }, { id: 'C', text: 'Yếu đuối' }, { id: 'D', text: 'Sợ hãi' }]
  }
];
