import { api } from './api.js';
import { sound } from './audio.js';

class App {
  constructor() {
    this.user = null;
    this.attempt = null;
    this.currentView = 'loading';
    this.timerInterval = null;
    this.questionStartTime = null;

    this.container = document.getElementById('app-container');
    this.init();
  }

  async init() {
    // Lắng nghe trạng thái Online/Offline
    window.addEventListener('online', () => this.showToast('Đã kết nối lại Internet.', 'success'));
    window.addEventListener('offline', () => this.showToast('Mất kết nối Internet.', 'danger'));

    // Kiểm tra đăng nhập hiện tại
    try {
      const meRes = await api.getMe();
      this.user = meRes.player;
      // Kiểm tra lượt chơi đang dở
      const attRes = await api.getCurrentAttempt();
      if (attRes.hasActive) {
        this.attempt = attRes.attempt;
      }
      this.navigate('home');
    } catch (err) {
      this.navigate('welcome');
    }
  }

  navigate(view, params = {}) {
    this.clearIntervals();
    this.currentView = view;
    this.render(params);
  }

  clearIntervals() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  showToast(message, type = 'danger') {
    const existing = document.querySelector('.toast-banner');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast-banner toast-${type}`;
    toast.innerHTML = `<span>${message}</span><button style="background:none;border:none;color:inherit;font-size:18px;cursor:pointer;">&times;</button>`;
    toast.querySelector('button').onclick = () => toast.remove();
    document.body.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 4000);
  }

  // ================= RENDER CÁC MÀN HÌNH =================
  render(params) {
    this.container.innerHTML = '';
    
    // Header
    const header = this.createHeader();
    this.container.appendChild(header);

    // Main
    const main = document.createElement('main');
    main.className = 'main-content';
    this.container.appendChild(main);

    switch (this.currentView) {
      case 'welcome':
        this.renderWelcome(main);
        break;
      case 'home':
        this.renderHome(main);
        break;
      case 'round_map':
        this.renderRoundMap(main);
        break;
      case 'round_intro':
        this.renderRoundIntro(main, params.roundKey);
        break;
      case 'quiz':
        this.renderQuiz(main, params);
        break;
      case 'round_result':
        this.renderRoundResult(main, params);
        break;
      case 'crossword_arena':
      case 'crossword_guess':
        this.renderCrosswordArena(main, params);
        break;
      case 'game_summary':
        this.renderGameSummary(main, params);
        break;
      case 'leaderboard':
        this.renderLeaderboard(main);
        break;
      case 'profile':
        this.renderProfile(main);
        break;
      default:
        main.innerHTML = `<div class="card skeleton" style="height: 200px;"></div>`;
    }

    // Footer đặc tả
    const footer = document.createElement('footer');
    footer.className = 'app-footer';
    footer.innerHTML = `Bộ môn CNTT • <span>FPT Polytechnic</span>`;
    this.container.appendChild(footer);
  }

  createHeader() {
    const header = document.createElement('header');
    header.className = 'app-header';

    const brand = document.createElement('div');
    brand.className = 'brand-wrapper';
    brand.onclick = () => {
      sound.playClick();
      if (this.user) this.navigate('home');
      else this.navigate('welcome');
    };
    brand.innerHTML = `
      <div class="brand-badge">POLY</div>
      <div class="brand-title">ĐẤU TRƯỜNG NGÔN NGỮ</div>
    `;

    const actions = document.createElement('div');
    actions.className = 'header-actions';

    // Nút Bật/Tắt Âm thanh
    const soundBtn = document.createElement('button');
    soundBtn.className = 'icon-btn';
    soundBtn.title = 'Bật/Tắt âm thanh';
    soundBtn.innerHTML = sound.isEnabled ? '🔊' : '🔇';
    soundBtn.onclick = () => {
      const enabled = sound.toggleSound();
      soundBtn.innerHTML = enabled ? '🔊' : '🔇';
    };

    actions.appendChild(soundBtn);

    if (this.user && this.currentView !== 'welcome') {
      const profileBtn = document.createElement('button');
      profileBtn.className = 'icon-btn';
      profileBtn.title = 'Hồ sơ cá nhân';
      profileBtn.innerHTML = '👤';
      profileBtn.onclick = () => {
        sound.playClick();
        this.navigate('profile');
      };
      actions.appendChild(profileBtn);
    }

    header.appendChild(brand);
    header.appendChild(actions);
    return header;
  }

  // 1. MÀN HÌNH CHÀO MỪNG / NHẬP TÊN
  renderWelcome(container) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 40px; margin-bottom: 10px;">🏆</div>
        <h1 style="font-size: 22px; font-weight: 800; color: #FFF; margin-bottom: 6px;">ĐẤU TRƯỜNG NGÔN NGỮ</h1>
        <p style="font-size: 14px; color: var(--text-muted);">Sân chơi tri thức Tiếng Việt dành riêng cho sinh viên FPT Polytechnic</p>
      </div>

      <div style="display: flex; gap: 8px; margin-bottom: 20px; background: #0E1520; padding: 4px; border-radius: var(--radius-md);">
        <button id="tab-register" class="btn" style="flex:1; min-height: 40px; background: var(--primary-color); color: #FFF;">Tham gia mới</button>
        <button id="tab-recover" class="btn" style="flex:1; min-height: 40px; background: transparent; color: var(--text-muted);">Khôi phục</button>
      </div>

      <!-- FORM ĐĂNG KÝ -->
      <form id="form-register">
        <div class="form-group">
          <label class="form-label">Họ và tên sinh viên <span style="color:var(--danger-color)">*</span></label>
          <input type="text" id="reg-name" class="form-input" placeholder="Ví dụ: Nguyễn Văn An" required maxlength="50" autocomplete="name">
        </div>
        <div class="form-group">
          <label class="form-label">Mã sinh viên (tùy chọn)</label>
          <input type="text" id="reg-id" class="form-input" placeholder="Ví dụ: PH28451" maxlength="20">
        </div>
        <div class="form-group">
          <label class="form-label">Lớp học (tùy chọn)</label>
          <input type="text" id="reg-class" class="form-input" placeholder="Ví dụ: WD18301" maxlength="30">
        </div>
        <div class="form-group">
          <label class="form-checkbox-label">
            <input type="checkbox" id="reg-public" class="form-checkbox">
            <span>Hiển thị tên lớp trên Bảng xếp hạng</span>
          </label>
        </div>
        <button type="submit" class="btn btn-primary" style="margin-top: 10px;">Vào Đấu Trường Ngay ⚔️</button>
      </form>

      <!-- FORM KHÔI PHỤC -->
      <form id="form-recover" style="display: none;">
        <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 14px;">
          Nhập mã khôi phục bạn đã nhận trước đó để đăng nhập lại trên thiết bị này.
        </p>
        <div class="form-group">
          <label class="form-label">Mã khôi phục bí mật <span style="color:var(--danger-color)">*</span></label>
          <input type="text" id="rec-code" class="form-input" placeholder="Ví dụ: DTNN-XXXX-XXXX" required style="letter-spacing: 2px; text-transform: uppercase;">
        </div>
        <button type="submit" class="btn btn-primary" style="margin-top: 10px;">Khôi Phục Hồ Sơ 🔑</button>
      </form>
    `;

    container.appendChild(card);

    // Xử lý chuyển tab
    const tabReg = card.querySelector('#tab-register');
    const tabRec = card.querySelector('#tab-recover');
    const formReg = card.querySelector('#form-register');
    const formRec = card.querySelector('#form-recover');

    tabReg.onclick = () => {
      sound.playClick();
      tabReg.style.background = 'var(--primary-color)';
      tabReg.style.color = '#FFF';
      tabRec.style.background = 'transparent';
      tabRec.style.color = 'var(--text-muted)';
      formReg.style.display = 'block';
      formRec.style.display = 'none';
    };

    tabRec.onclick = () => {
      sound.playClick();
      tabRec.style.background = 'var(--primary-color)';
      tabRec.style.color = '#FFF';
      tabReg.style.background = 'transparent';
      tabReg.style.color = 'var(--text-muted)';
      formReg.style.display = 'none';
      formRec.style.display = 'block';
    };

    // Xử lý submit đăng ký
    formReg.onsubmit = async (e) => {
      e.preventDefault();
      const name = card.querySelector('#reg-name').value.trim();
      const studentId = card.querySelector('#reg-id').value.trim();
      const studentClass = card.querySelector('#reg-class').value.trim();
      const publicClass = card.querySelector('#reg-public').checked;

      if (!name) return;
      try {
        sound.playClick();
        const res = await api.registerPlayer({ displayName: name, studentId, studentClass, publicClass });
        this.user = res.player;
        this.showRecoveryModal(res.recoveryCode);
      } catch (err) {
        this.showToast(err.message);
      }
    };

    // Xử lý submit khôi phục
    formRec.onsubmit = async (e) => {
      e.preventDefault();
      const code = card.querySelector('#rec-code').value.trim();
      if (!code) return;
      try {
        sound.playClick();
        const res = await api.recoverPlayer(code);
        this.user = res.player;
        this.showToast('Khôi phục hồ sơ thành công!', 'success');
        // Kiểm tra lượt dở
        const attRes = await api.getCurrentAttempt();
        if (attRes.hasActive) this.attempt = attRes.attempt;
        this.navigate('home');
      } catch (err) {
        this.showToast(err.message);
      }
    };
  }

  showRecoveryModal(recoveryCode) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-card">
        <div style="font-size: 36px; margin-bottom: 8px;">🔑</div>
        <h3 style="font-size: 18px; margin-bottom: 8px; color: #FFF;">Mã Khôi Phục Hồ Sơ</h3>
        <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 14px;">
          Lưu lại mã này để tiếp tục trải nghiệm hoặc đăng nhập trên điện thoại/máy tính khác:
        </p>
        <div style="background: #0B0F16; border: 1.5px dashed var(--primary-color); border-radius: var(--radius-md); padding: 12px; font-size: 20px; font-weight: 800; letter-spacing: 2px; color: var(--primary-color); margin-bottom: 14px; user-select: all;" id="code-val">
          ${recoveryCode}
        </div>
        <button id="btn-copy" class="btn btn-secondary" style="margin-bottom: 10px;">📋 Sao Chép Mã</button>
        <button id="btn-done" class="btn btn-primary">Bắt Đầu Trải Nghiệm 🚀</button>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#btn-copy').onclick = () => {
      navigator.clipboard.writeText(recoveryCode);
      this.showToast('Đã sao chép mã khôi phục vào bộ nhớ!', 'success');
    };

    modal.querySelector('#btn-done').onclick = () => {
      sound.playClick();
      modal.remove();
      this.navigate('home');
    };
  }

  // 2. MÀN HÌNH TRANG CHỦ
  renderHome(container) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div>
          <span style="font-size: 13px; color: var(--text-muted);">Chào mừng trở lại</span>
          <h2 style="font-size: 20px; font-weight: 800; color: #FFF;">Chào ${this.user.displayName}! 👋</h2>
          ${this.user.studentClass ? `<span style="font-size: 12px; color: var(--primary-color); font-weight: 600;">Lớp: ${this.user.studentClass}</span>` : ''}
        </div>
      </div>

      <!-- KHU VỰC LƯỢT CHƠI -->
      <div id="play-area" style="margin-bottom: 20px;">
        ${this.attempt ? `
          <div style="background: #0E1520; border: 1px solid var(--primary-color); border-radius: var(--radius-md); padding: 16px; margin-bottom: 14px; text-align: left;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--primary-color); text-transform: uppercase;">Lượt chơi đang dở</span>
              <span style="font-size: 14px; font-weight: 800; color: #FFF;">${this.attempt.scores.total} điểm</span>
            </div>
            <div style="font-size: 14px; color: var(--text-muted); margin-bottom: 12px;">
              Đang ở chặng: <strong style="color:#FFF;">${this.attempt.rounds[this.attempt.currentRoundKey]?.name || 'Khởi động'}</strong> (Câu ${this.attempt.currentQuestionIndex + 1}/10)
            </div>
            <button id="btn-resume" class="btn btn-primary" style="margin-bottom: 8px;">Tiếp Tục Lượt Chơi ⚡</button>
            <button id="btn-new-force" class="btn btn-secondary" style="font-size: 14px; min-height: 40px;">Bỏ Lượt Này & Chơi Mới</button>
          </div>
        ` : `
          <button id="btn-start-game" class="btn btn-primary" style="font-size: 18px; padding: 14px 20px; margin-bottom: 12px;">
            Bắt Đầu Chơi Mới 🎮
          </button>
        `}
      </div>

      <!-- CÁC MENU TÙY CHỌN -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
        <button id="btn-leaderboard" class="btn btn-secondary" style="flex-direction: column; padding: 14px 8px; gap: 4px;">
          <span style="font-size: 24px;">🏆</span>
          <span style="font-size: 14px;">Bảng Xếp Hạng</span>
        </button>
        <button id="btn-profile" class="btn btn-secondary" style="flex-direction: column; padding: 14px 8px; gap: 4px;">
          <span style="font-size: 24px;">👤</span>
          <span style="font-size: 14px;">Hồ Sơ & Lịch Sử</span>
        </button>
      </div>

      <button id="btn-switch-user" class="btn btn-secondary" style="color: var(--text-dim); font-size: 13px; min-height: 42px;">
        🔄 Đổi người chơi khác trên thiết bị này
      </button>
    `;

    container.appendChild(card);

    // Sự kiện
    const btnResume = card.querySelector('#btn-resume');
    if (btnResume) {
      btnResume.onclick = () => {
        sound.playClick();
        this.navigate('round_map');
      };
    }

    const btnStart = card.querySelector('#btn-start-game');
    if (btnStart) {
      btnStart.onclick = async () => {
        sound.playClick();
        await this.handleStartNewGame(false);
      };
    }

    const btnNewForce = card.querySelector('#btn-new-force');
    if (btnNewForce) {
      btnNewForce.onclick = () => {
        sound.playClick();
        this.showConfirmModal(
          'Bắt đầu lượt chơi mới?',
          'Lượt chơi đang dở hiện tại sẽ bị hủy bỏ (chuyển thành Đã Bỏ). Bạn có chắc chắn muốn bắt đầu lượt mới?',
          async () => {
            await this.handleStartNewGame(true);
          }
        );
      };
    }

    card.querySelector('#btn-leaderboard').onclick = () => {
      sound.playClick();
      this.navigate('leaderboard');
    };

    card.querySelector('#btn-profile').onclick = () => {
      sound.playClick();
      this.navigate('profile');
    };

    card.querySelector('#btn-switch-user').onclick = async () => {
      sound.playClick();
      await api.switchPlayer();
      this.user = null;
      this.attempt = null;
      this.navigate('welcome');
    };
  }

  showConfirmModal(title, message, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-card">
        <h3 style="font-size: 18px; margin-bottom: 10px; color: #FFF;">${title}</h3>
        <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 18px;">${message}</p>
        <div style="display:flex; gap: 10px;">
          <button id="btn-cancel" class="btn btn-secondary" style="flex:1;">Hủy</button>
          <button id="btn-ok" class="btn btn-primary" style="flex:1;">Xác nhận</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#btn-cancel').onclick = () => modal.remove();
    modal.querySelector('#btn-ok').onclick = async () => {
      modal.remove();
      await onConfirm();
    };
  }

  async handleStartNewGame(forceNew) {
    try {
      const res = await api.startAttempt(forceNew);
      this.attempt = res.attempt;
      this.navigate('round_map');
    } catch (err) {
      this.showToast(err.message);
    }
  }

  // 3. MÀN HÌNH BẢN ĐỒ 4 VÒNG
  renderRoundMap(container) {
    if (!this.attempt) {
      this.navigate('home');
      return;
    }

    const roundList = [
      { key: 'khoi_dong', name: 'Vòng 1: Khởi Động', desc: '10 câu trắc nghiệm • +10đ/câu', icon: '⚡' },
      { key: 'tranh_tai', name: 'Vòng 2: Tranh Tài', desc: '10 câu trắc nghiệm • +20đ/câu', icon: '🔥' },
      { key: 'ban_ket', name: 'Vòng 3: Bán Kết', desc: '10 câu trắc nghiệm • +30đ/câu', icon: '⚔️' },
      { key: 'chung_ket', name: 'Vòng 4: Chung Kết', desc: '10 câu trắc nghiệm + Ô Chữ (+100đ)', icon: '👑' }
    ];

    const currentKey = this.attempt.currentRoundKey;
    const currentIdx = this.attempt.currentRoundIndex;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <button id="btn-back-home" class="btn btn-secondary" style="width: auto; min-height: 40px; padding: 6px 14px; font-size: 14px;">
          ← Trang chủ
        </button>
        <div style="text-align: right;">
          <span style="font-size: 12px; color: var(--text-muted);">Tổng điểm hiện tại</span>
          <div style="font-size: 20px; font-weight: 800; color: var(--primary-color);">${this.attempt.scores.total}</div>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 16px;">
        <h2 style="font-size: 20px; font-weight: 800; color: #FFF;">LỘ TRÌNH THỬ THÁCH</h2>
        <p style="font-size: 13px; color: var(--text-muted);">Vượt qua đủ 4 chặng để ghi danh vào Bảng Vàng Poly</p>
      </div>

      <div class="round-map">
        ${roundList.map((r, i) => {
          const isDone = this.attempt.rounds[r.key]?.isCompleted;
          const isCurrent = (r.key === currentKey);
          const isLocked = (i > currentIdx);
          const roundScore = this.attempt.rounds[r.key]?.score || 0;

          let statusClass = 'locked';
          let statusBadge = `<span style="font-size: 12px; color: var(--text-dim);">Chưa mở</span>`;

          if (isDone) {
            statusClass = 'completed';
            statusBadge = `<span style="font-size: 12px; color: var(--success-color); font-weight: 700;">Đã xong (+${roundScore}đ)</span>`;
          } else if (isCurrent) {
            statusClass = 'active';
            statusBadge = `<span style="font-size: 12px; color: var(--primary-color); font-weight: 700;">Đang diễn ra</span>`;
          }

          return `
            <div class="round-card ${statusClass}" data-key="${r.key}" data-index="${i}">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="font-size: 28px;">${r.icon}</div>
                <div style="text-align: left;">
                  <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 2px;">${r.name}</h3>
                  <p style="font-size: 12px; color: var(--text-muted);">${r.desc}</p>
                </div>
              </div>
              <div>${statusBadge}</div>
            </div>
          `;
        }).join('')}
      </div>

      <button id="btn-continue-round" class="btn btn-primary" style="margin-top: 10px;">
        Vào Chặng Hiện Tại 🚀
      </button>
    `;

    container.appendChild(wrapper);

    wrapper.querySelector('#btn-back-home').onclick = () => {
      sound.playClick();
      this.navigate('home');
    };

    wrapper.querySelector('#btn-continue-round').onclick = () => {
      sound.playClick();
      this.navigate('round_intro', { roundKey: currentKey });
    };
  }

  // 4. MÀN HÌNH GIỚI THIỆU VÒNG
  renderRoundIntro(container, roundKey) {
    const roundData = this.attempt.rounds[roundKey];
    const roundNames = {
      khoi_dong: 'VÒNG 1: KHỞI ĐỘNG',
      tranh_tai: 'VÒNG 2: TRANH TÀI',
      ban_ket: 'VÒNG 3: BÁN KẾT',
      chung_ket: 'VÒNG 4: CHUNG KẾT'
    };

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="font-size: 13px; font-weight: 700; color: var(--primary-color); text-transform: uppercase;">Sẵn sàng bứt phá</span>
        <h2 style="font-size: 22px; font-weight: 800; color: #FFF; margin: 6px 0 10px;">${roundNames[roundKey]}</h2>
        <p style="font-size: 14px; color: var(--text-muted);">
          ${roundKey === 'chung_ket' ? '10 câu hỏi tương ứng 10 hàng ngang ô chữ. Mỗi câu trả lời sẽ mở ra các chữ cái giải mã từ khóa!' : 'Thử thách cá nhân không loại trực tiếp. Hãy vận dụng vốn tiếng Việt phong phú của bạn!'}
        </p>
      </div>

      <div style="background: #0E1520; border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px; text-align: left;">
        <div style="display:flex; justify-content:space-between; margin-bottom: 10px; font-size: 14px;">
          <span style="color:var(--text-muted);">Số lượng câu hỏi:</span>
          <strong style="color:#FFF;">10 câu</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 10px; font-size: 14px;">
          <span style="color:var(--text-muted);">Thời gian mỗi câu:</span>
          <strong style="color:var(--warning-color);">10 giây</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 10px; font-size: 14px;">
          <span style="color:var(--text-muted);">Điểm thưởng mỗi câu đúng:</span>
          <strong style="color:var(--success-color);">+${roundData.pointPerQuestion} điểm</strong>
        </div>
        ${roundKey === 'chung_ket' ? `
          <div style="display:flex; justify-content:space-between; font-size: 14px; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 6px;">
            <span style="color:var(--text-muted);">Giải mã từ khóa Ô Chữ:</span>
            <strong style="color:var(--primary-color);">+100 điểm</strong>
          </div>
        ` : ''}
      </div>

      <div style="font-size: 13px; color: var(--text-dim); margin-bottom: 20px; text-align: left;">
        * Lưu ý: Đồng hồ 10 giây sẽ bắt đầu ngay khi bấm Bắt Đầu. Chạm vào đáp án là gửi ngay, không thể chọn lại!
      </div>

      <button id="btn-start-quiz" class="btn btn-primary" style="font-size: 18px;">
        BẮT ĐẦU VÒNG CHƠI ⏱️
      </button>
    `;

    container.appendChild(card);

    card.querySelector('#btn-start-quiz').onclick = async () => {
      sound.playClick();
      if (roundKey === 'chung_ket') {
        this.navigate('crossword_arena');
      } else {
        // Tìm câu hỏi tiếp theo chưa trả lời
        const currentQIdx = roundData.questions.findIndex(q => !q.isAnswered);
        const qIdx = currentQIdx >= 0 ? currentQIdx : 0;
        await this.loadQuestion(roundKey, qIdx);
      }
    };
  }

  // 5. MÀN HÌNH CÂU HỎI TRẮC NGHIỆM (QUIZ)
  async loadQuestion(roundKey, questionIndex) {
    try {
      this.clearIntervals();
      const res = await api.startQuestion(this.attempt.attemptId, roundKey, questionIndex);
      this.navigate('quiz', {
        roundKey,
        questionIndex,
        questionData: res.question,
        startedAt: res.startedAt,
        deadlineAt: res.deadlineAt,
        timeLimitSeconds: res.timeLimitSeconds,
        serverTime: res.serverTime
      });
    } catch (err) {
      this.showToast(err.message);
    }
  }

  renderQuiz(container, { roundKey, questionIndex, questionData, startedAt, deadlineAt, timeLimitSeconds, serverTime }) {
    const roundData = this.attempt.rounds[roundKey];
    const totalQuestions = 10;
    const clientTimeOffset = Date.now() - serverTime;
    const totalDurationMs = (timeLimitSeconds ? timeLimitSeconds * 1000 : (deadlineAt - startedAt)) || 10000;
    const initialSeconds = Math.ceil(totalDurationMs / 1000);

    const topicLabels = {
      chinh_ta: 'Chính tả',
      nghia_tu: 'Nghĩa của từ',
      thanh_ngu_tuc_ngu: 'Thành ngữ - Tục ngữ',
      ca_dao_tho_ca: 'Ca dao - Thơ ca',
      ngu_phap: 'Ngữ pháp'
    };

    const diffLabels = { de: 'Dễ', vua: 'Vừa', kho: 'Khó' };
    const diffColors = { de: '#10B981', vua: '#F59E0B', kho: '#EF4444' };

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <!-- THANH TRẠNG THÁI TRÊN CÙNG -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 13px; font-weight: 700; color: var(--text-muted);">
          ${roundData.name} • Câu ${questionIndex + 1}/${totalQuestions}
        </span>
        <span style="font-size: 14px; font-weight: 800; color: var(--primary-color);">
          ${this.attempt.scores.total} điểm
        </span>
      </div>

      <!-- TIMER CÂU HỎI -->
      <div class="timer-container">
        <div id="timer-num" class="timer-number">${initialSeconds}</div>
        <div class="timer-bar-bg">
          <div id="timer-bar" class="timer-bar-fill"></div>
        </div>
      </div>

      <!-- CARD CÂU HỎI -->
      <div class="card" style="text-align: left; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 12px; font-weight: 700; background: #0E1520; color: var(--primary-color); padding: 3px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            ${topicLabels[questionData.topic] || 'Tiếng Việt'}
          </span>
          <span style="font-size: 12px; font-weight: 700; color: ${diffColors[questionData.difficulty] || '#FFF'};">
            Độ khó: ${diffLabels[questionData.difficulty] || questionData.difficulty}
          </span>
        </div>

        <h3 style="font-size: 18px; font-weight: 700; line-height: 1.5; color: #FFF; margin-bottom: 16px;">
          ${questionData.question}
        </h3>

        <!-- CÁC NÚT ĐÁP ÁN A, B, C, D LỚN XẾP DỌC -->
        <div class="options-list">
          ${questionData.options.map(opt => `
            <button class="option-btn" data-id="${opt.id}">
              <div class="option-label">${opt.id}</div>
              <div class="option-text">${opt.text}</div>
            </button>
          `).join('')}
        </div>

        <!-- HỘP GIẢI THÍCH (ẨN CHO ĐẾN KHI TRẢ LỜI) -->
        <div id="result-box" style="display: none;"></div>

        <!-- NÚT TIẾP TỤC -->
        <button id="btn-next-action" class="btn btn-primary" style="display: none; margin-top: 14px;">
          ${questionIndex === 9 ? 'Xem Kết Quả Chặng 📊' : 'Câu Tiếp Theo →'}
        </button>
      </div>
    `;

    container.appendChild(wrapper);

    const timerNum = wrapper.querySelector('#timer-num');
    const timerBar = wrapper.querySelector('#timer-bar');
    const optionBtns = wrapper.querySelectorAll('.option-btn');
    const resultBox = wrapper.querySelector('#result-box');
    const btnNext = wrapper.querySelector('#btn-next-action');

    let answered = false;

    // HÀM GỬI ĐÁP ÁN
    const handleAnswer = async (selectedId) => {
      if (answered) return;
      answered = true;
      this.clearIntervals();

      // Khóa tất cả các nút
      optionBtns.forEach(b => b.disabled = true);

      try {
        const res = await api.submitAnswer(this.attempt.attemptId, roundKey, questionIndex, selectedId);
        
        // Cập nhật điểm trong local state
        this.attempt.scores.total = res.totalScore;
        this.attempt.rounds[roundKey].score = res.roundScore;

        // Âm thanh và hiệu ứng
        if (res.isCorrect) {
          sound.playCorrect();
        } else if (res.isTimeout) {
          sound.playTimeout();
        } else {
          sound.playWrong();
        }

        // Tô màu các lựa chọn
        optionBtns.forEach(btn => {
          const optId = btn.dataset.id;
          if (optId === selectedId) {
            btn.classList.add(res.isCorrect ? 'selected-correct' : 'selected-wrong');
          }
          if (optId === res.correctOptionId && !res.isCorrect) {
            btn.classList.add('show-correct');
          }
        });

        // Hiển thị kết quả & giải thích
        resultBox.style.display = 'block';
        let statusTitle = res.isCorrect
          ? `<span style="color:var(--success-color)">✓ CHÍNH XÁC (+${res.pointsAwarded}đ)</span>`
          : (res.isTimeout
              ? `<span style="color:var(--danger-color)">⏱️ HẾT GIỜ (0đ)</span>`
              : `<span style="color:var(--danger-color)">✗ CHƯA CHÍNH XÁC (0đ)</span>`);

        resultBox.innerHTML = `
          <div class="explanation-box">
            <div class="explanation-title">${statusTitle}</div>
            <div style="color:var(--text-main); line-height: 1.5;">${res.explanation}</div>
            ${roundKey === 'chung_ket' && res.horizontalAnswer ? `
              <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--border-color); color: var(--primary-color); font-weight: 700;">
                🧩 Hàng ngang đã mở: <span style="color:#FFF; letter-spacing: 2px;">${res.horizontalAnswer}</span>
              </div>
            ` : ''}
          </div>
        `;

        btnNext.style.display = 'block';

        btnNext.onclick = async () => {
          sound.playClick();
          if (res.isRoundCompleted) {
            this.navigate('round_result', { roundKey });
          } else {
            await this.loadQuestion(roundKey, questionIndex + 1);
          }
        };

      } catch (err) {
        this.showToast(err.message);
      }
    };

    // Gán click cho 4 nút đáp án
    optionBtns.forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        handleAnswer(btn.dataset.id);
      };
    });

    // BẮT ĐẦU ĐỒNG HỒ ĐẾM NGƯỢC
    let lastSecond = initialSeconds;
    this.timerInterval = setInterval(() => {
      const now = Date.now() - clientTimeOffset;
      const timeLeftMs = Math.max(0, deadlineAt - now);
      const seconds = Math.ceil(timeLeftMs / 1000);
      const percent = Math.min(100, Math.max(0, (timeLeftMs / totalDurationMs) * 100));

      timerNum.textContent = seconds;
      timerBar.style.width = `${percent}%`;

      if (seconds <= 3 && seconds > 0) {
        timerNum.classList.add('warning');
        timerBar.classList.add('warning');
        if (seconds !== lastSecond) {
          sound.playWarningTick();
          lastSecond = seconds;
        }
      }

      if (timeLeftMs <= 0) {
        this.clearIntervals();
        timerNum.textContent = '0';
        timerBar.style.width = '0%';
        if (!answered) {
          handleAnswer(null); // Timeout
        }
      }
    }, 100);
  }

  // 6. MÀN HÌNH KẾT QUẢ VÒNG
  renderRoundResult(container, { roundKey }) {
    const roundData = this.attempt.rounds[roundKey];
    const isFinalRound = (roundKey === 'chung_ket');

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 40px; margin-bottom: 8px;">🎉</div>
        <h2 style="font-size: 22px; font-weight: 800; color: #FFF; margin-bottom: 4px;">HOÀN THÀNH ${roundData.name.toUpperCase()}</h2>
        <p style="font-size: 14px; color: var(--text-muted);">Kết quả thi đấu của bạn trong chặng này</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
        <div style="background: #0E1520; border-radius: var(--radius-md); padding: 14px; text-align: center;">
          <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">Điểm Chặng</div>
          <div style="font-size: 26px; font-weight: 800; color: var(--primary-color);">+${roundData.score}</div>
        </div>
        <div style="background: #0E1520; border-radius: var(--radius-md); padding: 14px; text-align: center;">
          <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">Tổng Điểm</div>
          <div style="font-size: 26px; font-weight: 800; color: #FFF;">${this.attempt.scores.total}</div>
        </div>
      </div>

      <div style="background: #0E1520; border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px; text-align: left; font-size: 14px;">
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span style="color:var(--text-muted);">Số câu đúng:</span>
          <strong style="color:var(--success-color);">${roundData.correctCount}/10</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span style="color:var(--text-muted);">Số câu sai:</span>
          <strong style="color:var(--danger-color);">${roundData.wrongCount}/10</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span style="color:var(--text-muted);">Hết giờ:</span>
          <strong style="color:var(--warning-color);">${roundData.timeoutCount}/10</strong>
        </div>
        <div style="display:flex; justify-content:space-between; border-top: 1px solid var(--border-color); padding-top: 8px; margin-top: 6px;">
          <span style="color:var(--text-muted);">Tỷ lệ chính xác:</span>
          <strong style="color:#FFF;">${(roundData.correctCount * 10)}%</strong>
        </div>
      </div>

      ${isFinalRound ? `
        <button id="btn-next-action" class="btn btn-primary" style="font-size: 18px;">
          VÀO PHẦN ĐOÁN TỪ KHÓA Ô CHỮ 🧩
        </button>
      ` : `
        <button id="btn-next-action" class="btn btn-primary">
          Tiếp Tục Sang Vòng Kế Tiếp →
        </button>
      `}
    `;

    container.appendChild(card);

    card.querySelector('#btn-next-action').onclick = async () => {
      sound.playClick();
      if (isFinalRound) {
        this.navigate('crossword_guess');
      } else {
        try {
          const res = await api.nextRound(this.attempt.attemptId);
          this.attempt = res.attempt;
          this.navigate('round_map');
        } catch (err) {
          this.showToast(err.message);
        }
      }
    };
  }

  // 7. MÀN HÌNH ĐẤU TRƯỜNG Ô CHỮ CHUNG KẾT & ĐOÁN TỪ KHÓA BÍ MẬT (VISUAL CHUẨN 100% THEO HÌNH)
  renderCrosswordArena(container) {
    this.clearIntervals();
    const ck = this.attempt.rounds.chung_ket;
    const questions = ck.questions || [];
    const gridMeta = ck.gridMetadata || {
      centerCol: 0,
      rows: questions.map((q, idx) => ({ index: idx, length: 7, startCol: 0, targetColOffset: 0 }))
    };
    const centerCol = gridMeta.centerCol;
    const rowsLayout = gridMeta.rows || [];

    const isCompleted = (this.attempt.status === 'completed');
    let isKeywordGuessed = Boolean(ck.keywordGuess?.isGuessed);
    let isKeywordCorrect = Boolean(ck.keywordGuess?.isCorrect);

    const card = document.createElement('div');
    card.className = 'card';
    card.style.padding = '18px 14px';

    const renderFullBoard = () => {
      const openedCount = questions.filter(q => q.isAnswered).length;
      const allAnswered = questions.every(q => q.isAnswered);

      card.innerHTML = `
        <!-- HEADER VÒNG CHUNG KẾT -->
        <div style="text-align: center; margin-bottom: 14px;">
          <span style="font-size: 12px; font-weight: 800; background: rgba(242, 113, 37, 0.15); color: var(--primary-color); padding: 3px 10px; border-radius: 12px; text-transform: uppercase;">
            👑 VÒNG 4: CHUNG KẾT • ĐẤU TRƯỜNG Ô CHỮ
          </span>
          <h2 style="font-size: 21px; font-weight: 800; color: #FFF; margin: 6px 0 2px;">
            ${ck.crosswordTitle || 'Ô CHỮ TỪ KHÓA BÍ MẬT'}
          </h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">
            Chọn hàng ngang để trả lời câu hỏi và suy luận Cột Dọc Bí Mật (màu vàng).
          </p>

          <!-- THANH THỐNG KÊ & NÚT ĐOÁN TỪ KHÓA BÍ MẬT -->
          <div style="display:flex; justify-content:space-between; align-items:center; background:#0E1520; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:10px 14px; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
            <div>
              <span style="font-size:12.5px; color:var(--text-muted);">Đã giải mã: </span>
              <strong style="font-size:14px; color:#FFF;">${openedCount} / ${questions.length} hàng</strong>
            </div>
            <div>
              <span style="font-size:12.5px; color:var(--text-muted);">Điểm vòng 4: </span>
              <strong style="font-size:14px; color:var(--success-color);">+${ck.score}đ</strong>
            </div>
            <button id="btn-trigger-guess-kw" class="btn" style="width:auto; min-height:36px; padding:4px 14px; font-size:13px; font-weight:800; background:linear-gradient(135deg, #FFE600, #FFB800); color:#000; border:none; box-shadow:0 0 10px rgba(255, 230, 0, 0.4); ${isKeywordGuessed || isCompleted ? 'opacity:0.6; cursor:not-allowed;' : ''}">
              ${isKeywordCorrect ? '🌟 ĐÃ GIẢI ĐƯỢC TỪ KHÓA (+100Đ)' : (isKeywordGuessed ? '❌ ĐÃ HẾT LƯỢT ĐOÁN TỪ KHÓA' : '🎯 ĐOÁN TỪ KHÓA (+100Đ)')}
            </button>
          </div>
        </div>

        <!-- BÀN CỜ Ô CHỮ (VISUAL GIỐNG HÌNH ẢNH 100%) -->
        <div class="crossword-board-wrapper">
          <div class="crossword-paper-grid">
            <div class="cw-table-grid" id="cw-table-grid">
              ${questions.map((q, idx) => {
                const layout = rowsLayout[idx] || { startCol: 0, length: 7, targetColOffset: 0 };
                const startCol = layout.startCol !== undefined ? layout.startCol : (centerCol - (q.charIndex || 0));
                const targetColOffset = layout.targetColOffset !== undefined ? layout.targetColOffset : (q.charIndex || 0);
                const wordLength = layout.length || 7;
                const emptyBoxes = Array(Math.max(0, startCol)).fill(0);
                const isAnswered = Boolean(q.isAnswered || isCompleted || isKeywordCorrect);
                const revealedChars = isAnswered && q.normalizedAnswer ? q.normalizedAnswer.split('') : Array(wordLength).fill('');

                return `
                  <div class="cw-row" data-qidx="${idx}" title="${isAnswered ? 'Đã giải mã hàng này' : `Bấm để trả lời hàng ngang số ${idx + 1}`}">
                    <!-- Ô trống đệm để cột vàng thẳng đứng như hình ảnh -->
                    ${emptyBoxes.map(() => `<div class="cw-cell empty"></div>`).join('')}

                    <!-- Các ô chữ cái của hàng ngang -->
                    ${revealedChars.map((char, cIdx) => {
                      const isYellowCol = (cIdx === targetColOffset);
                      if (isAnswered) {
                        return `
                          <div class="cw-cell letter ${isYellowCol ? 'yellow-target' : ''} ${isKeywordCorrect && isYellowCol ? 'pulse-glow' : ''}">
                            ${char}
                          </div>
                        `;
                      } else {
                        return `
                          <div class="cw-cell unopened ${isYellowCol ? 'yellow-target' : ''}">
                            ${isYellowCol ? '?' : ''}
                          </div>
                        `;
                      }
                    }).join('')}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- DANH SÁCH CÂU HỎI ĐÁNH SỐ 1..N BÊN DƯỚI LƯỚI NHƯ TRONG HÌNH -->
          <div class="crossword-questions-list">
            ${questions.map((q, idx) => {
              const layout = rowsLayout[idx] || { length: 7 };
              const isAnswered = Boolean(q.isAnswered || isCompleted || isKeywordCorrect);

              return `
                <div class="cw-question-item" data-qidx="${idx}">
                  <div class="cw-q-num">${idx + 1}</div>
                  <div class="cw-q-text">
                    <span style="font-weight: 600; color: #111;">${q.question}</span>
                    ${isAnswered ? `
                      <span style="display:inline-block; margin-left:6px; font-weight:800; color:#0969DA;">
                        → ${q.horizontalAnswer || q.normalizedAnswer}
                      </span>
                    ` : `
                      <span style="display:inline-block; margin-left:6px; font-size:12px; color:#6E7781;">
                        (${layout.length} chữ cái)
                      </span>
                    `}
                  </div>
                  <div>
                    <span class="cw-q-status ${isAnswered ? 'solved' : 'open'}">
                      ${isAnswered ? '✓ Đã mở' : '▶ Trả lời'}
                    </span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- KHU VỰC THAO TÁC / TRẢ LỜI CÂU HỎI HÀNG NGANG ĐƯỢC CHỌN -->
        <div id="cw-active-area"></div>

        <!-- KHU VỰC KẾT THÚC / XEM TỔNG KẾT -->
        ${(allAnswered || isCompleted || isKeywordCorrect) ? `
          <div style="margin-top: 18px; text-align: center;">
            <button id="btn-finish-arena" class="btn btn-primary" style="font-size: 16px; font-weight: 800;">
              XEM TỔNG KẾT TOÀN TRẬN & BẢNG XẾP HẠNG 🏆
            </button>
          </div>
        ` : ''}
      `;

      attachEventHandlers();
    };

    const attachEventHandlers = () => {
      // 1. Click vào hàng ngang hoặc câu hỏi để trả lời
      const activeArea = card.querySelector('#cw-active-area');

      const handleSelectRow = async (idx) => {
        sound.playClick();
        const q = questions[idx];
        const layout = rowsLayout[idx] || { length: 7 };

        if (q.isAnswered || isCompleted) {
          this.showToast(`Hàng số ${idx + 1} đã giải mã: ${q.horizontalAnswer || q.normalizedAnswer}`);
          return;
        }

        try {
          activeArea.innerHTML = `<div class="skeleton" style="height: 120px;"></div>`;
          activeArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          const startRes = await api.startQuestion(this.attempt.attemptId, 'chung_ket', idx);
          const deadlineAt = startRes.deadlineAt;
          const clientTimeOffset = Date.now() - startRes.serverTime;
          const timeLimitSeconds = startRes.timeLimitSeconds || 15;
          let submitted = false;

          activeArea.innerHTML = `
            <div class="cw-answer-modal-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
                <span style="font-size: 12px; font-weight: 800; color: var(--primary-color);">
                  HÀNG NGANG SỐ ${idx + 1} • GỒM ${layout.length} CHỮ CÁI
                </span>
                <button id="btn-close-active-q" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; font-size:16px;">✕</button>
              </div>

              <!-- ĐỒNG HỒ ĐẾM NGƯỢC -->
              <div class="timer-container" style="margin-bottom: 12px;">
                <div id="row-timer-num" class="timer-number">${timeLimitSeconds}</div>
                <div class="timer-bar-bg">
                  <div id="row-timer-bar" class="timer-bar-fill"></div>
                </div>
              </div>

              <!-- NỘI DUNG CÂU HỎI -->
              <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 14px; line-height: 1.5;">
                ${q.question}
              </h3>

              <!-- FORM GÕ ĐÁP ÁN (TỰ ĐỘNG CHUẨN HÓA TIẾNG VIỆT) -->
              <form id="form-submit-row-answer">
                <div class="form-group" style="margin-bottom: 12px;">
                  <label class="form-label" style="font-size: 12px;">Nhập câu trả lời (có hoặc không dấu):</label>
                  <input type="text" id="input-row-answer" class="form-input" placeholder="Ví dụ: ${layout.length} chữ cái" required autocomplete="off" style="font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                </div>

                <!-- NÚT GỢI Ý 4 ĐÁP ÁN TRẮC NGHIỆM -->
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px; flex-wrap:wrap; gap:8px;">
                  <button type="button" id="btn-toggle-options" class="btn btn-secondary" style="min-height:32px; padding:2px 10px; font-size:12px; width:auto;">
                    💡 Xem gợi ý trắc nghiệm (A, B, C, D)
                  </button>
                  <button type="submit" class="btn btn-primary" style="width:auto; min-height:36px; padding:0 20px; font-size:14px; font-weight:800;">
                    🚀 Gửi Đáp Án
                  </button>
                </div>

                <!-- KHU VỰC 4 PHƯƠNG ÁN TRẮC NGHIỆM (NẾU BẬT GỢI Ý) -->
                <div id="row-options-box" style="display:none; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px;">
                  ${(q.options || []).map(opt => `
                    <button type="button" class="btn-opt-choice btn btn-secondary" data-id="${opt.id}" data-text="${opt.text}" style="min-height:40px; padding:6px 10px; font-size:13px; text-align:left; justify-content:flex-start;">
                      <strong style="color:var(--primary-color); margin-right:6px;">${opt.id}.</strong> ${opt.text}
                    </button>
                  `).join('')}
                </div>
              </form>
            </div>
          `;

          const formSubmit = activeArea.querySelector('#form-submit-row-answer');
          const rowInput = activeArea.querySelector('#input-row-answer');
          const btnToggle = activeArea.querySelector('#btn-toggle-options');
          const optionsBox = activeArea.querySelector('#row-options-box');
          const btnClose = activeArea.querySelector('#btn-close-active-q');
          const timerNum = activeArea.querySelector('#row-timer-num');
          const timerBar = activeArea.querySelector('#row-timer-bar');

          rowInput.focus();

          // Bật tắt xem phương án gợi ý
          btnToggle.onclick = () => {
            sound.playClick();
            const isOpen = (optionsBox.style.display === 'grid');
            optionsBox.style.display = isOpen ? 'none' : 'grid';
            btnToggle.textContent = isOpen ? '💡 Xem gợi ý trắc nghiệm (A, B, C, D)' : 'Ẩn gợi ý trắc nghiệm';
          };

          // Chọn nhanh từ gợi ý
          optionsBox.querySelectorAll('.btn-opt-choice').forEach(b => {
            b.onclick = () => {
              sound.playClick();
              rowInput.value = b.dataset.text;
              onSubmitRow(b.dataset.id, b.dataset.text);
            };
          });

          // Đóng card câu hỏi
          btnClose.onclick = () => {
            this.clearIntervals();
            activeArea.innerHTML = '';
          };

          // Xử lý nộp câu trả lời hàng ngang
          const onSubmitRow = async (selectedOptId, textAns) => {
            if (submitted) return;
            submitted = true;
            this.clearIntervals();

            try {
              const res = await api.submitAnswer(this.attempt.attemptId, 'chung_ket', idx, selectedOptId, textAns);

              // Cập nhật trạng thái câu
              q.isAnswered = true;
              q.horizontalAnswer = res.horizontalAnswer;
              q.normalizedAnswer = res.normalizedAnswer;
              q.isCorrect = res.isCorrect;
              ck.score = res.roundScore;
              this.attempt.scores.total = res.totalScore;

              if (res.isCorrect) {
                sound.playCorrect();
                this.showToast(`Chính xác! Đã mở hàng ngang số ${idx + 1} (+${ck.pointPerQuestion}đ)`, 'success');
              } else {
                sound.playWrong();
                this.showToast(`Chưa chính xác hàng số ${idx + 1}!`);
              }

              // Làm mới lại bàn cờ để chữ cái lật mở rực rỡ
              renderFullBoard();

              // Nếu tất cả các hàng đã mở mà chưa đoán từ khóa -> gợi ý đoán từ khóa
              const stillUnanswered = questions.some(item => !item.isAnswered);
              if (!stillUnanswered && !isKeywordGuessed && !isCompleted) {
                setTimeout(() => openKeywordGuessModal(), 800);
              }

            } catch (err) {
              this.showToast(err.message);
            }
          };

          formSubmit.onsubmit = (e) => {
            e.preventDefault();
            sound.playClick();
            onSubmitRow(null, rowInput.value.trim());
          };

          // Đếm ngược câu hỏi
          const totalDurationMs = timeLimitSeconds * 1000;
          this.timerInterval = setInterval(() => {
            const now = Date.now() - clientTimeOffset;
            const leftMs = Math.max(0, deadlineAt - now);
            const secs = Math.ceil(leftMs / 1000);
            const percent = Math.min(100, Math.max(0, (leftMs / totalDurationMs) * 100));

            timerNum.textContent = secs;
            timerBar.style.width = `${percent}%`;

            if (secs <= 3 && secs > 0) {
              timerNum.classList.add('warning');
              timerBar.classList.add('warning');
              sound.playWarningTick();
            }

            if (leftMs <= 0) {
              this.clearIntervals();
              timerNum.textContent = '0';
              timerBar.style.width = '0%';
              if (!submitted) {
                onSubmitRow(null, rowInput.value.trim() || ''); // Hết giờ
              }
            }
          }, 100);

        } catch (err) {
          this.showToast(err.message);
        }
      };

      card.querySelectorAll('.cw-row').forEach(rowEl => {
        rowEl.onclick = () => handleSelectRow(Number(rowEl.dataset.qidx));
      });

      card.querySelectorAll('.cw-question-item').forEach(itemEl => {
        itemEl.onclick = () => handleSelectRow(Number(itemEl.dataset.qidx));
      });

      // 2. Nút đoán từ khóa bí mật
      const btnGuessKw = card.querySelector('#btn-trigger-guess-kw');
      if (btnGuessKw && !isKeywordGuessed && !isCompleted) {
        btnGuessKw.onclick = () => openKeywordGuessModal();
      }

      // 3. Nút xem tổng kết toàn trận
      const btnFinish = card.querySelector('#btn-finish-arena');
      if (btnFinish) {
        btnFinish.onclick = () => {
          sound.playClick();
          this.navigate('game_summary');
        };
      }
    };

    // Hàm mở popup / modal đoán từ khóa bí mật
    const openKeywordGuessModal = async () => {
      sound.playClick();
      this.clearIntervals();

      try {
        const activeArea = card.querySelector('#cw-active-area');
        activeArea.innerHTML = `<div class="skeleton" style="height: 140px;"></div>`;
        activeArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        const guessData = await api.startKeyword(this.attempt.attemptId);
        const deadlineAt = guessData.deadlineAt;
        const clientTimeOffset = Date.now() - guessData.serverTime;
        const guessTimeSeconds = guessData.timeLimitSeconds || 15;
        let submitted = false;

        activeArea.innerHTML = `
          <div class="cw-answer-modal-card" style="border-color: #FFE600; box-shadow: 0 0 16px rgba(255, 230, 0, 0.35);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
              <span style="font-size: 13px; font-weight: 800; color: #FFE600; text-transform:uppercase; letter-spacing:1px;">
                🎯 GIẢI MÃ TỪ KHÓA CỘT DỌC BÍ MẬT (+100 ĐIỂM)
              </span>
              <button id="btn-close-guess-kw" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; font-size:16px;">✕</button>
            </div>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">
              Từ khóa cột dọc gồm đúng <strong>${ck.keywordLength || questions.length} chữ cái</strong>. Đoán đúng nhận ngay +100 điểm và mở bừng sáng toàn bộ ô chữ!
            </p>

            <!-- ĐỒNG HỒ ĐẾM NGƯỢC ĐOÁN TỪ KHÓA -->
            <div class="timer-container" style="margin-bottom: 12px;">
              <div id="kw-timer-num" class="timer-number">${guessTimeSeconds}</div>
              <div class="timer-bar-bg">
                <div id="kw-timer-bar" class="timer-bar-fill"></div>
              </div>
            </div>

            <form id="form-submit-secret-kw">
              <div class="form-group" style="margin-bottom: 12px;">
                <input type="text" id="input-secret-kw" class="form-input" placeholder="Ví dụ: TRI THỨC" required autocomplete="off" style="font-size: 17px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; text-align: center; border-color: #FFE600;">
              </div>
              <button type="submit" class="btn btn-primary" style="font-size: 16px; font-weight: 800; background: linear-gradient(135deg, #FFE600, #FFB800); color: #000; border: none;">
                XÁC NHẬN TỪ KHÓA 🚀
              </button>
            </form>
          </div>
        `;

        const formKw = activeArea.querySelector('#form-submit-secret-kw');
        const inputKw = activeArea.querySelector('#input-secret-kw');
        const btnClose = activeArea.querySelector('#btn-close-guess-kw');
        const timerNum = activeArea.querySelector('#kw-timer-num');
        const timerBar = activeArea.querySelector('#kw-timer-bar');

        inputKw.focus();

        btnClose.onclick = () => {
          this.clearIntervals();
          activeArea.innerHTML = '';
        };

        const onKeywordSubmit = async (guessWord) => {
          if (submitted) return;
          submitted = true;
          this.clearIntervals();

          try {
            const finishRes = await api.submitKeyword(this.attempt.attemptId, guessWord);
            isKeywordGuessed = true;
            isKeywordCorrect = Boolean(finishRes.keywordGuess?.isCorrect);
            this.attempt.scores.total = finishRes.scores.total;

            if (isKeywordCorrect) {
              sound.playVictory();
              this.showToast('XUẤT SẮC! BẠN ĐÃ GIẢI ĐƯỢC TỪ KHÓA BÍ MẬT (+100Đ)!', 'success');
            } else {
              sound.playWrong();
              this.showToast(`Chưa chính xác! Bạn đã mất quyền đoán từ khóa bí mật.`);
            }

            renderFullBoard();

            // Hiển thị thông báo kết quả
            activeArea.innerHTML = `
              <div class="cw-answer-modal-card" style="text-align:center; padding: 24px;">
                <div style="font-size: 40px; margin-bottom: 8px;">${isKeywordCorrect ? '🌟' : '💡'}</div>
                <h3 style="font-size: 20px; font-weight: 800; color: ${isKeywordCorrect ? 'var(--success-color)' : 'var(--danger-color)'}; margin-bottom: 8px;">
                  ${isKeywordCorrect ? 'ĐOÁN ĐÚNG HOÀN TOÀN (+100 ĐIỂM)' : 'CHƯA CHÍNH XÁC (0 ĐIỂM)'}
                </h3>
                <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 8px;">
                  Từ khóa bí mật chính thức là:
                </p>
                <div style="font-size: 24px; font-weight: 900; color: #FFE600; letter-spacing: 3px; margin-bottom: 16px;">
                  ${finishRes.keywordGuess?.officialKeyword || ck.keyword || ck.normalizedKeyword}
                </div>
                <button id="btn-goto-summary" class="btn btn-primary" style="font-size: 16px; font-weight:800;">
                  XEM TỔNG KẾT TOÀN TRẬN 🏆
                </button>
              </div>
            `;

            activeArea.querySelector('#btn-goto-summary').onclick = () => {
              sound.playClick();
              this.navigate('game_summary', { finishRes });
            };

          } catch (err) {
            this.showToast(err.message);
          }
        };

        formKw.onsubmit = (e) => {
          e.preventDefault();
          sound.playClick();
          onKeywordSubmit(inputKw.value.trim());
        };

        // Đếm ngược đoán từ khóa
        const totalDurationMs = guessTimeSeconds * 1000;
        this.timerInterval = setInterval(() => {
          const now = Date.now() - clientTimeOffset;
          const leftMs = Math.max(0, deadlineAt - now);
          const secs = Math.ceil(leftMs / 1000);
          const percent = Math.min(100, Math.max(0, (leftMs / totalDurationMs) * 100));

          timerNum.textContent = secs;
          timerBar.style.width = `${percent}%`;

          if (secs <= 3 && secs > 0) {
            timerNum.classList.add('warning');
            timerBar.classList.add('warning');
            sound.playWarningTick();
          }

          if (leftMs <= 0) {
            this.clearIntervals();
            timerNum.textContent = '0';
            timerBar.style.width = '0%';
            if (!submitted) {
              onKeywordSubmit(inputKw.value.trim() || ''); // Hết giờ
            }
          }
        }, 100);

      } catch (err) {
        this.showToast(err.message);
      }
    };

    container.appendChild(card);
    renderFullBoard();
  }

  // 8. MÀN HÌNH TỔNG KẾT TOÀN TRẬN
  renderGameSummary(container) {
    const totalScore = this.attempt.scores.total;
    const stats = this.attempt.stats;

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="font-size: 48px; margin-bottom: 8px;">👑</div>
        <h2 style="font-size: 22px; font-weight: 800; color: #FFF; margin-bottom: 4px;">VINH DANH ĐẤU SĨ</h2>
        <p style="font-size: 14px; color: var(--text-muted);">Bạn đã hoàn thành xuất sắc 4 chặng Đấu Trường Ngôn Ngữ</p>
      </div>

      <div style="background: linear-gradient(135deg, rgba(255, 122, 24, 0.15), rgba(21, 28, 40, 0.9)); border: 1.5px solid var(--primary-color); border-radius: var(--radius-lg); padding: 20px; text-align: center; margin-bottom: 20px; box-shadow: var(--shadow-primary);">
        <div style="font-size: 13px; font-weight: 700; color: var(--primary-color); text-transform: uppercase; margin-bottom: 4px;">Tổng Điểm Trận Đấu</div>
        <div style="font-size: 42px; font-weight: 800; color: #FFF; line-height: 1;">${totalScore} <span style="font-size: 18px; color: var(--text-muted);">/ 1.100</span></div>
      </div>

      <!-- CHI TIẾT 4 VÒNG -->
      <div style="background: #0E1520; border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px; text-align: left; font-size: 14px;">
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span style="color:var(--text-muted);">1. Vòng Khởi động:</span>
          <strong style="color:#FFF;">+${this.attempt.scores.khoi_dong} điểm</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span style="color:var(--text-muted);">2. Vòng Tranh tài:</span>
          <strong style="color:#FFF;">+${this.attempt.scores.tranh_tai} điểm</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span style="color:var(--text-muted);">3. Vòng Bán kết:</span>
          <strong style="color:#FFF;">+${this.attempt.scores.ban_ket} điểm</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span style="color:var(--text-muted);">4. Vòng Chung kết (Trắc nghiệm):</span>
          <strong style="color:#FFF;">+${this.attempt.scores.chung_ket} điểm</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
          <span style="color:var(--text-muted);">5. Thưởng đoán Từ khóa Ô Chữ:</span>
          <strong style="color:var(--primary-color);">+${this.attempt.scores.keywordBonus} điểm</strong>
        </div>
        <div style="display:flex; justify-content:space-between; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 6px;">
          <span style="color:var(--text-muted);">Tổng số câu trắc nghiệm đúng:</span>
          <strong style="color:var(--success-color);">${stats.totalCorrect} / 40 câu</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top: 6px;">
          <span style="color:var(--text-muted);">Tổng thời gian trả lời 40 câu:</span>
          <strong style="color:#FFF;">${(stats.totalQuizTimeSpentMs / 1000).toFixed(1)} giây</strong>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button id="btn-go-leaderboard" class="btn btn-primary" style="font-size: 16px;">
          Xem Bảng Xếp Hạng Ngay 🏆
        </button>
        <button id="btn-replay" class="btn btn-secondary">
          Chơi Lượt Mới 🎮
        </button>
      </div>
    `;

    container.appendChild(card);

    card.querySelector('#btn-go-leaderboard').onclick = () => {
      sound.playClick();
      this.navigate('leaderboard');
    };

    card.querySelector('#btn-replay').onclick = async () => {
      sound.playClick();
      await this.handleStartNewGame(true);
    };
  }

  // 9. MÀN HÌNH BẢNG XẾP HẠNG
  async renderLeaderboard(container) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <button id="btn-back-home" class="btn btn-secondary" style="width: auto; min-height: 40px; padding: 6px 14px; font-size: 14px;">
          ← Quay lại
        </button>
        <h2 style="font-size: 18px; font-weight: 800; color: #FFF;">BẢNG VÀNG POLY</h2>
      </div>

      <!-- BỘ LỌC THỜI GIAN -->
      <div style="display: flex; gap: 6px; margin-bottom: 14px; background: #0E1520; padding: 4px; border-radius: var(--radius-md);">
        <button class="filter-tab btn" data-range="all" style="flex:1; min-height: 38px; font-size: 13px; background: var(--primary-color); color: #FFF;">Mùa này</button>
        <button class="filter-tab btn" data-range="week" style="flex:1; min-height: 38px; font-size: 13px; background: transparent; color: var(--text-muted);">Tuần này</button>
        <button class="filter-tab btn" data-range="month" style="flex:1; min-height: 38px; font-size: 13px; background: transparent; color: var(--text-muted);">Tháng này</button>
      </div>

      <!-- Ô TÌM KIẾM TÊN -->
      <div style="margin-bottom: 14px;">
        <input type="text" id="input-search" class="form-input" placeholder="🔍 Tìm theo tên sinh viên..." style="min-height: 42px; font-size: 14px;">
      </div>

      <!-- DANH SÁCH XẾP HẠNG -->
      <div id="lb-content">
        <div class="skeleton" style="height: 180px;"></div>
      </div>
    `;

    container.appendChild(card);

    card.querySelector('#btn-back-home').onclick = () => {
      sound.playClick();
      this.navigate('home');
    };

    let currentTimeRange = 'all';
    const lbContent = card.querySelector('#lb-content');
    const filterTabs = card.querySelectorAll('.filter-tab');
    const searchInput = card.querySelector('#input-search');

    const loadData = async () => {
      try {
        lbContent.innerHTML = `<div class="skeleton" style="height: 180px;"></div>`;
        const res = await api.getLeaderboard(currentTimeRange);
        this.renderLeaderboardItems(lbContent, res, searchInput.value.trim());
      } catch (err) {
        lbContent.innerHTML = `<p style="color:var(--danger-color); font-size:14px;">${err.message}</p>`;
      }
    };

    filterTabs.forEach(tab => {
      tab.onclick = () => {
        sound.playClick();
        filterTabs.forEach(t => {
          t.style.background = 'transparent';
          t.style.color = 'var(--text-muted)';
        });
        tab.style.background = 'var(--primary-color)';
        tab.style.color = '#FFF';
        currentTimeRange = tab.dataset.range;
        loadData();
      };
    });

    searchInput.oninput = () => {
      loadData();
    };

    await loadData();
  }

  renderLeaderboardItems(container, data, searchQuery = '') {
    let items = data.items || [];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => i.displayName.toLowerCase().includes(q));
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div style="padding: 30px 10px; text-align: center; color: var(--text-muted); font-size: 14px;">
          Chưa có lượt chơi hoàn thành nào trong khoảng thời gian này.
        </div>
      `;
      return;
    }

    const html = `
      <div class="leaderboard-list">
        ${items.map(item => `
          <div class="leaderboard-item ${item.isCurrentPlayer ? 'current-user' : ''}">
            <div class="rank-badge ${item.rank <= 3 ? `rank-${item.rank}` : ''}">${item.rank}</div>
            <div class="player-info">
              <div class="player-name">
                ${item.displayName} ${item.isCurrentPlayer ? '<span style="color:var(--primary-color); font-size:12px;">(Bạn)</span>' : ''}
              </div>
              <div class="player-class">
                ${item.studentClass ? `Lớp: ${item.studentClass} • ` : ''}Đúng: ${item.totalCorrect}/40
              </div>
            </div>
            <div class="player-stats">
              <div class="player-score">${item.totalScore}đ</div>
              <div class="player-time">${item.totalTimeSpentSeconds}s</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- THẺ THỨ HẠNG CỦA BẠN NẾU CÓ -->
      ${data.myRank ? `
        <div class="card my-rank-sticky" style="margin-top: 14px; padding: 12px 16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size: 11px; color: var(--primary-color); font-weight: 700; text-transform: uppercase;">Thứ Hạng Của Bạn</span>
              <div style="font-size: 16px; font-weight: 800; color: #FFF;">Hạng #${data.myRank.rank} • ${data.myRank.displayName}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 18px; font-weight: 800; color: var(--primary-color);">${data.myRank.totalScore}đ</div>
              <div style="font-size: 11px; color: var(--text-dim);">${data.myRank.totalTimeSpentSeconds}s</div>
            </div>
          </div>
        </div>
      ` : ''}

      <div style="font-size: 11px; color: var(--text-dim); margin-top: 14px; text-align: center;">
        ${data.note}
      </div>
    `;

    container.innerHTML = html;
  }

  // 10. MÀN HÌNH HỒ SƠ & LỊCH SỬ CÁ NHÂN
  async renderProfile(container) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <button id="btn-back-home" class="btn btn-secondary" style="width: auto; min-height: 40px; padding: 6px 14px; font-size: 14px;">
          ← Trang chủ
        </button>
        <h2 style="font-size: 18px; font-weight: 800; color: #FFF;">HỒ SƠ CÁ NHÂN</h2>
      </div>

      <!-- FORM SỬA THÔNG TIN -->
      <form id="form-profile" style="margin-bottom: 20px;">
        <div class="form-group">
          <label class="form-label">Tên hiển thị:</label>
          <input type="text" id="prof-name" class="form-input" value="${this.user.displayName}" required maxlength="50">
        </div>
        <div class="form-group">
          <label class="form-label">Mã sinh viên:</label>
          <input type="text" id="prof-id" class="form-input" value="${this.user.studentId || ''}" maxlength="20">
        </div>
        <div class="form-group">
          <label class="form-label">Lớp học:</label>
          <input type="text" id="prof-class" class="form-input" value="${this.user.studentClass || ''}" maxlength="30">
        </div>
        <div class="form-group">
          <label class="form-checkbox-label">
            <input type="checkbox" id="prof-public" class="form-checkbox" ${this.user.publicClass ? 'checked' : ''}>
            <span>Công khai tên lớp trên Bảng xếp hạng</span>
          </label>
        </div>
        <button type="submit" class="btn btn-secondary" style="min-height: 42px; font-size: 14px;">Lưu Thay Đổi 💾</button>
      </form>

      <!-- KHU VỰC CẤP LẠI MÃ KHÔI PHỤC -->
      <div style="background: #0E1520; border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px; text-align: left;">
        <h3 style="font-size: 15px; font-weight: 700; color: #FFF; margin-bottom: 6px;">Mã Khôi Phục Thiết Bị</h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">
          Nếu bạn quên hoặc đánh mất mã khôi phục, bạn có thể tạo mã mới tại đây.
        </p>
        <button id="btn-regen-code" class="btn btn-secondary" style="min-height: 42px; font-size: 14px;">Cấp Lại Mã Mới 🔑</button>
      </div>

      <!-- LỊCH SỬ CÁC LƯỢT CHƠI -->
      <div style="text-align: left;">
        <h3 style="font-size: 16px; font-weight: 700; color: #FFF; margin-bottom: 12px;">Lịch Sử Lượt Chơi</h3>
        <div id="history-list">
          <div class="skeleton" style="height: 100px;"></div>
        </div>
      </div>
    `;

    container.appendChild(card);

    card.querySelector('#btn-back-home').onclick = () => {
      sound.playClick();
      this.navigate('home');
    };

    // Lưu hồ sơ
    card.querySelector('#form-profile').onsubmit = async (e) => {
      e.preventDefault();
      const name = card.querySelector('#prof-name').value.trim();
      const studentId = card.querySelector('#prof-id').value.trim();
      const studentClass = card.querySelector('#prof-class').value.trim();
      const publicClass = card.querySelector('#prof-public').checked;

      try {
        sound.playClick();
        const res = await api.updateProfile({ displayName: name, studentId, studentClass, publicClass });
        this.user = res.player;
        this.showToast('Cập nhật hồ sơ thành công!', 'success');
      } catch (err) {
        this.showToast(err.message);
      }
    };

    // Cấp lại mã
    card.querySelector('#btn-regen-code').onclick = async () => {
      sound.playClick();
      this.showConfirmModal(
        'Cấp lại mã khôi phục?',
        'Mã khôi phục cũ sẽ bị vô hiệu hóa ngay lập tức. Bạn có muốn tiếp tục?',
        async () => {
          try {
            const res = await api.regenerateRecoveryCode();
            this.showRecoveryModal(res.recoveryCode);
          } catch (err) {
            this.showToast(err.message);
          }
        }
      );
    };

    // Tải lịch sử lượt chơi
    const historyList = card.querySelector('#history-list');
    try {
      const hRes = await api.getHistory();
      const attempts = hRes.attempts || [];
      if (attempts.length === 0) {
        historyList.innerHTML = `<p style="font-size: 13px; color: var(--text-muted);">Bạn chưa có lượt chơi nào.</p>`;
      } else {
        historyList.innerHTML = attempts.map(a => {
          const isDone = (a.status === 'completed');
          const dateStr = new Date(a.createdAt).toLocaleDateString('vi-VN');
          return `
            <div style="background: #0E1520; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 14px; font-weight: 700; color: #FFF;">
                  ${isDone ? `Hoàn thành (${a.scores.total}đ)` : (a.status === 'in_progress' ? 'Đang chơi dở' : 'Đã bỏ')}
                </div>
                <div style="font-size: 12px; color: var(--text-dim);">${dateStr} • Đúng: ${a.stats.totalCorrect}/40</div>
              </div>
              <div style="font-size: 14px; font-weight: 800; color: ${isDone ? 'var(--primary-color)' : 'var(--text-muted)'};">
                ${a.scores.total}đ
              </div>
            </div>
          `;
        }).join('');
      }
    } catch (err) {
      historyList.innerHTML = `<p style="color:var(--danger-color); font-size:13px;">${err.message}</p>`;
    }
  }
}

// Khởi tạo App
window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
