/**
 * ADMIN PORTAL SCRIPT
 * Quản trị toàn diện Đấu Trường Ngôn Ngữ trong khung Mobile-First 480px
 */

class AdminApp {
  constructor() {
    this.isAuthenticated = false;
    this.adminUser = null;
    this.currentTab = 'stats'; // 'stats' | 'questions' | 'crosswords' | 'seasons' | 'players' | 'logs'
    this.container = document.getElementById('app-container');

    this.init();
  }

  async init() {
    try {
      const res = await fetch('/api/admin/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          this.isAuthenticated = true;
          this.adminUser = data.username;
          this.render();
          return;
        }
      }
    } catch (_) {}

    this.renderLogin();
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

  renderLogin() {
    this.container.innerHTML = `
      <header class="app-header">
        <div class="brand-wrapper">
          <div class="brand-badge">ADMIN</div>
          <div class="brand-title">QUẢN TRỊ VIÊN</div>
        </div>
      </header>

      <main class="main-content" style="justify-content: center;">
        <div class="card" style="text-align: center; padding: 24px;">
          <div style="font-size: 40px; margin-bottom: 10px;">🔐</div>
          <h2 style="font-size: 20px; font-weight: 800; color: #FFF; margin-bottom: 6px;">Đăng Nhập Quản Trị</h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">Hệ thống quản lý minigame Đấu Trường Ngôn Ngữ</p>

          <form id="admin-login-form">
            <div class="form-group">
              <label class="form-label">Tài khoản quản trị:</label>
              <input type="text" id="admin-user" class="form-input" required placeholder="admin" autocomplete="username">
            </div>
            <div class="form-group">
              <label class="form-label">Mật khẩu:</label>
              <input type="password" id="admin-pass" class="form-input" required placeholder="••••••••" autocomplete="current-password">
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 10px;">Đăng Nhập Hệ Thống 🛡️</button>
          </form>

          <div style="margin-top: 20px;">
            <a href="/" style="color: var(--text-muted); font-size: 13px; text-decoration: none;">← Quay lại màn hình người chơi</a>
          </div>
        </div>
      </main>

      <footer class="app-footer">
        Bộ môn CNTT • <span>FPT Polytechnic</span>
      </footer>
    `;

    this.container.querySelector('#admin-login-form').onsubmit = async (e) => {
      e.preventDefault();
      const user = this.container.querySelector('#admin-user').value.trim();
      const pass = this.container.querySelector('#admin-pass').value;

      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ username: user, password: pass })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Đăng nhập thất bại.');

        this.isAuthenticated = true;
        this.adminUser = user;
        this.render();
      } catch (err) {
        this.showToast(err.message);
      }
    };
  }

  render() {
    this.container.innerHTML = `
      <header class="app-header">
        <div class="brand-wrapper">
          <div class="brand-badge">ADMIN</div>
          <div class="brand-title">ĐẤU TRƯỜNG NGÔN NGỮ</div>
        </div>
        <div class="header-actions">
          <button id="btn-admin-logout" class="icon-btn" title="Đăng xuất">🚪</button>
        </div>
      </header>

      <!-- MENU ĐIỀU HƯỚNG TABS CHO ADMIN TRONG KHUNG MOBILE -->
      <div style="display: flex; gap: 4px; overflow-x: auto; -webkit-overflow-scrolling: touch; padding: 10px 16px; background: #0E1520; border-bottom: 1px solid var(--border-color);">
        <button class="nav-tab btn" data-tab="stats" style="min-height: 36px; padding: 6px 12px; font-size: 13px; width: auto; flex-shrink: 0; ${this.currentTab === 'stats' ? 'background: var(--primary-color); color: #FFF;' : 'background: transparent; color: var(--text-muted);'}">Thống kê</button>
        <button class="nav-tab btn" data-tab="questions" style="min-height: 36px; padding: 6px 12px; font-size: 13px; width: auto; flex-shrink: 0; ${this.currentTab === 'questions' ? 'background: var(--primary-color); color: #FFF;' : 'background: transparent; color: var(--text-muted);'}">Câu hỏi (400)</button>
        <button class="nav-tab btn" data-tab="crosswords" style="min-height: 36px; padding: 6px 12px; font-size: 13px; width: auto; flex-shrink: 0; ${this.currentTab === 'crosswords' ? 'background: var(--primary-color); color: #FFF;' : 'background: transparent; color: var(--text-muted);'}">Ô chữ</button>
        <button class="nav-tab btn" data-tab="players" style="min-height: 36px; padding: 6px 12px; font-size: 13px; width: auto; flex-shrink: 0; ${this.currentTab === 'players' ? 'background: var(--primary-color); color: #FFF;' : 'background: transparent; color: var(--text-muted);'}">Thí sinh</button>
        <button class="nav-tab btn" data-tab="seasons" style="min-height: 36px; padding: 6px 12px; font-size: 13px; width: auto; flex-shrink: 0; ${this.currentTab === 'seasons' ? 'background: var(--primary-color); color: #FFF;' : 'background: transparent; color: var(--text-muted);'}">Cài đặt & Mùa</button>
        <button class="nav-tab btn" data-tab="logs" style="min-height: 36px; padding: 6px 12px; font-size: 13px; width: auto; flex-shrink: 0; ${this.currentTab === 'logs' ? 'background: var(--primary-color); color: #FFF;' : 'background: transparent; color: var(--text-muted);'}">Nhật ký</button>
      </div>

      <main class="main-content" id="admin-main"></main>

      <footer class="app-footer">
        Bộ môn CNTT • <span>FPT Polytechnic</span> (Admin Mode)
      </footer>
    `;

    this.container.querySelector('#btn-admin-logout').onclick = async () => {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
      this.isAuthenticated = false;
      this.renderLogin();
    };

    const tabs = this.container.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
      tab.onclick = () => {
        this.currentTab = tab.dataset.tab;
        this.render();
      };
    });

    const main = this.container.querySelector('#admin-main');
    switch (this.currentTab) {
      case 'stats': this.renderStats(main); break;
      case 'questions': this.renderQuestions(main); break;
      case 'crosswords': this.renderCrosswords(main); break;
      case 'players': this.renderPlayers(main); break;
      case 'seasons': this.renderSeasons(main); break;
      case 'logs': this.renderLogs(main); break;
    }
  }

  // 1. TAB THỐNG KÊ
  async renderStats(container) {
    container.innerHTML = `<div class="card skeleton" style="height: 180px;"></div>`;
    try {
      const res = await fetch('/api/admin/stats', { credentials: 'include' });
      const stats = await res.json();

      container.innerHTML = `
        <div class="card" style="text-align: left;">
          <h3 style="font-size: 17px; font-weight: 800; color: #FFF; margin-bottom: 14px;">TỔNG QUAN HỆ THỐNG</h3>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
            <div style="background: #0E1520; border-radius: var(--radius-md); padding: 12px; text-align: center;">
              <div style="font-size: 12px; color: var(--text-muted);">Tổng Thí Sinh</div>
              <div style="font-size: 24px; font-weight: 800; color: var(--primary-color);">${stats.totalPlayers}</div>
            </div>
            <div style="background: #0E1520; border-radius: var(--radius-md); padding: 12px; text-align: center;">
              <div style="font-size: 12px; color: var(--text-muted);">Tổng Lượt Chơi</div>
              <div style="font-size: 24px; font-weight: 800; color: #FFF;">${stats.totalAttempts}</div>
            </div>
            <div style="background: #0E1520; border-radius: var(--radius-md); padding: 12px; text-align: center;">
              <div style="font-size: 12px; color: var(--text-muted);">Hoàn Thành Đủ 4 Vòng</div>
              <div style="font-size: 24px; font-weight: 800; color: var(--success-color);">${stats.completedAttempts}</div>
            </div>
            <div style="background: #0E1520; border-radius: var(--radius-md); padding: 12px; text-align: center;">
              <div style="font-size: 12px; color: var(--text-muted);">Lượt Bỏ Dở</div>
              <div style="font-size: 24px; font-weight: 800; color: var(--danger-color);">${stats.abandonedAttempts}</div>
            </div>
          </div>

          <h4 style="font-size: 14px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">TỶ LỆ TRẢ LỜI ĐÚNG THEO CHẶNG</h4>
          <div style="background: #0E1520; border-radius: var(--radius-md); padding: 12px; font-size: 13px; margin-bottom: 18px;">
            ${['khoi_dong', 'tranh_tai', 'ban_ket', 'chung_ket'].map(k => {
              const r = stats.roundStats[k];
              const pct = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
              const names = { khoi_dong: 'Khởi động', tranh_tai: 'Tranh tài', ban_ket: 'Bán kết', chung_ket: 'Chung kết' };
              return `
                <div style="display:flex; justify-content:space-between; margin-bottom: 6px;">
                  <span>${names[k]}:</span>
                  <strong>${r.correct}/${r.total} (${pct}%)</strong>
                </div>
              `;
            }).join('')}
          </div>

          <button id="btn-export-csv" class="btn btn-primary">
            📥 Xuất Bảng Xếp Hạng Excel (CSV UTF-8)
          </button>
        </div>
      `;

      container.querySelector('#btn-export-csv').onclick = () => {
        window.location.href = '/api/admin/export/csv';
      };
    } catch (err) {
      container.innerHTML = `<p style="color:var(--danger-color)">${err.message}</p>`;
    }
  }

  // 2. TAB CÂU HỎI
  async renderQuestions(container) {
    let currentRound = 'khoi_dong';
    let searchQuery = '';

    const card = document.createElement('div');
    card.className = 'card';
    card.style.textAlign = 'left';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px;">
        <h3 style="font-size: 17px; font-weight: 800; color: #FFF;">NGÂN HÀNG CÂU HỎI</h3>
        <button id="btn-add-q" class="btn btn-primary" style="min-height:36px; padding:4px 12px; font-size:13px; width:auto;">+ Thêm</button>
      </div>

      <div style="display:flex; gap: 4px; margin-bottom: 12px; background: #0E1520; padding: 4px; border-radius: var(--radius-sm);">
        <button class="q-round-btn btn" data-round="khoi_dong" style="flex:1; min-height:32px; font-size:12px; background: var(--primary-color); color:#FFF;">K.Động</button>
        <button class="q-round-btn btn" data-round="tranh_tai" style="flex:1; min-height:32px; font-size:12px; background: transparent; color:var(--text-muted);">T.Tài</button>
        <button class="q-round-btn btn" data-round="ban_ket" style="flex:1; min-height:32px; font-size:12px; background: transparent; color:var(--text-muted);">B.Kết</button>
        <button class="q-round-btn btn" data-round="chung_ket" style="flex:1; min-height:32px; font-size:12px; background: transparent; color:var(--text-muted);">C.Kết</button>
      </div>

      <input type="text" id="q-search" class="form-input" placeholder="🔍 Tìm kiếm câu hỏi / ID..." style="min-height:40px; font-size:14px; margin-bottom: 12px;">

      <div id="q-list"><div class="skeleton" style="height: 150px;"></div></div>
    `;

    container.appendChild(card);

    const qList = card.querySelector('#q-list');
    const searchInput = card.querySelector('#q-search');
    const roundBtns = card.querySelectorAll('.q-round-btn');

    const loadQuestions = async () => {
      try {
        qList.innerHTML = `<div class="skeleton" style="height: 150px;"></div>`;
        const res = await fetch(`/api/admin/questions?round=${currentRound}&search=${encodeURIComponent(searchQuery)}`, { credentials: 'include' });
        const data = await res.json();
        const questions = data.questions || [];

        if (questions.length === 0) {
          qList.innerHTML = `<p style="font-size:13px; color:var(--text-muted); text-align:center; padding: 20px;">Không tìm thấy câu hỏi nào.</p>`;
          return;
        }

        qList.innerHTML = questions.slice(0, 30).map(q => `
          <div style="background: #0E1520; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px;">
            <div style="display:flex; justify-content:space-between; margin-bottom: 4px; font-size: 12px;">
              <span style="font-weight:700; color:var(--primary-color);">${q.id}</span>
              <span style="color:var(--text-dim); text-transform:uppercase;">${q.difficulty} • ${q.topic}</span>
            </div>
            <div style="font-size: 14px; font-weight:600; color:#FFF; margin-bottom: 6px;">${q.question}</div>
            <div style="font-size: 12px; color:var(--success-color);">Đáp án đúng: ${q.correctOptionId}</div>
            ${q.horizontalAnswer ? `<div style="font-size: 12px; color:var(--primary-color);">Hàng ngang: ${q.horizontalAnswer} (${q.normalizedAnswer})</div>` : ''}
            <div style="display:flex; justify-content:flex-end; gap: 8px; margin-top: 8px;">
              <button class="btn-del-q btn btn-secondary" data-id="${q.id}" style="min-height:30px; padding:2px 10px; font-size:12px; width:auto; color:var(--danger-color);">Xóa</button>
            </div>
          </div>
        `).join('');

        // Xóa câu hỏi
        qList.querySelectorAll('.btn-del-q').forEach(btn => {
          btn.onclick = async () => {
            if (confirm(`Bạn có chắc muốn xóa câu hỏi ${btn.dataset.id}?`)) {
              await fetch(`/api/admin/questions/${currentRound}/${btn.dataset.id}`, { method: 'DELETE', credentials: 'include' });
              loadQuestions();
            }
          };
        });

      } catch (err) {
        qList.innerHTML = `<p style="color:var(--danger-color)">${err.message}</p>`;
      }
    };

    roundBtns.forEach(btn => {
      btn.onclick = () => {
        roundBtns.forEach(b => { b.style.background = 'transparent'; b.style.color = 'var(--text-muted)'; });
        btn.style.background = 'var(--primary-color)';
        btn.style.color = '#FFF';
        currentRound = btn.dataset.round;
        loadQuestions();
      };
    });

    searchInput.oninput = () => {
      searchQuery = searchInput.value.trim();
      loadQuestions();
    };

    await loadQuestions();
  }

  // 3. TAB Ô CHỮ CHUNG KẾT
  async renderCrosswords(container) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.textAlign = 'left';
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px;">
        <h3 style="font-size: 17px; font-weight: 800; color: #FFF;">BỘ Ô CHỮ CHUNG KẾT</h3>
      </div>

      <!-- CÔNG CỤ TẠO Ô CHỮ TỰ ĐỘNG -->
      <div style="background: #0E1520; border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px;">
        <h4 style="font-size: 14px; font-weight: 700; color: var(--primary-color); margin-bottom: 6px;">Sinh Bộ Ô Chữ Bằng Thuật Toán</h4>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 10px;">
          Nhập từ khóa 10 chữ cái (hệ thống sẽ tự ghép 10 câu phù hợp đúng tỷ lệ 1 Dễ/ 3 Vừa/ 6 Khó).
        </p>
        <div style="display:flex; gap: 8px;">
          <input type="text" id="cw-keyword-input" class="form-input" placeholder="Ví dụ: ĐẤT NƯỚC TÔI" style="min-height:42px; font-size:14px; text-transform:uppercase;">
          <button id="btn-generate-cw" class="btn btn-primary" style="width: auto; min-height:42px; padding: 6px 14px; font-size:13px; white-space:nowrap;">Tạo Ngay</button>
        </div>
      </div>

      <div id="cw-list"><div class="skeleton" style="height: 150px;"></div></div>
    `;

    container.appendChild(card);

    const cwList = card.querySelector('#cw-list');
    const kwInput = card.querySelector('#cw-keyword-input');
    const btnGen = card.querySelector('#btn-generate-cw');

    const loadCrosswords = async () => {
      try {
        cwList.innerHTML = `<div class="skeleton" style="height: 150px;"></div>`;
        const res = await fetch('/api/admin/crosswords', { credentials: 'include' });
        const data = await res.json();
        const list = data.crosswords || [];

        cwList.innerHTML = list.map(cw => `
          <div style="background: #0E1520; border: 1px solid ${cw.isApproved ? 'var(--primary-color)' : 'var(--border-color)'}; border-radius: var(--radius-md); padding: 14px; margin-bottom: 12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
              <strong style="font-size: 15px; color: #FFF;">${cw.title}</strong>
              <span style="font-size: 12px; font-weight:700; color: ${cw.isApproved ? 'var(--success-color)' : 'var(--warning-color)'};">
                ${cw.isApproved ? '✓ Đã Duyệt' : 'Chờ Duyệt'}
              </span>
            </div>
            <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 8px;">
              Từ khóa: <strong style="color:var(--primary-color); letter-spacing: 2px;">${cw.normalizedKeyword}</strong>
            </div>
            <div style="display:flex; gap: 8px; justify-content:flex-end;">
              <button class="btn-toggle-cw btn btn-secondary" data-id="${cw.id}" data-approved="${cw.isApproved}" style="min-height:32px; padding:2px 10px; font-size:12px; width:auto;">
                ${cw.isApproved ? 'Hủy duyệt' : 'Duyệt bộ này'}
              </button>
              <button class="btn-del-cw btn btn-secondary" data-id="${cw.id}" style="min-height:32px; padding:2px 10px; font-size:12px; width:auto; color:var(--danger-color);">Xóa</button>
            </div>
          </div>
        `).join('');

        // Bật/tắt duyệt
        cwList.querySelectorAll('.btn-toggle-cw').forEach(b => {
          b.onclick = async () => {
            const cw = list.find(c => c.id === b.dataset.id);
            if (cw) {
              cw.isApproved = !cw.isApproved;
              await fetch('/api/admin/crosswords/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(cw)
              });
              loadCrosswords();
            }
          };
        });

        // Xóa
        cwList.querySelectorAll('.btn-del-cw').forEach(b => {
          b.onclick = async () => {
            if (confirm('Bạn có chắc muốn xóa bộ ô chữ này?')) {
              await fetch(`/api/admin/crosswords/${b.dataset.id}`, { method: 'DELETE', credentials: 'include' });
              loadCrosswords();
            }
          };
        });

      } catch (err) {
        cwList.innerHTML = `<p style="color:var(--danger-color)">${err.message}</p>`;
      }
    };

    btnGen.onclick = async () => {
      const kw = kwInput.value.trim();
      if (!kw) return;
      try {
        btnGen.disabled = true;
        btnGen.textContent = 'Đang tìm...';
        const res = await fetch('/api/admin/crosswords/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ keyword: kw, title: kw })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        // Lưu luôn bộ này
        await fetch('/api/admin/crosswords/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ...data.crossword, isApproved: true })
        });

        this.showToast('Đã tạo và duyệt thành công bộ ô chữ mới!', 'success');
        kwInput.value = '';
        loadCrosswords();
      } catch (err) {
        this.showToast(err.message);
      } finally {
        btnGen.disabled = false;
        btnGen.textContent = 'Tạo Ngay';
      }
    };

    await loadCrosswords();
  }

  // 4. TAB THÍ SINH
  async renderPlayers(container) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.textAlign = 'left';
    card.innerHTML = `
      <h3 style="font-size: 17px; font-weight: 800; color: #FFF; margin-bottom: 12px;">QUẢN LÝ THÍ SINH & LƯỢT THI</h3>
      <input type="text" id="player-search" class="form-input" placeholder="🔍 Tìm theo tên, mã SV, lớp hoặc ID..." style="min-height:42px; font-size:14px; margin-bottom: 14px;">
      <div id="player-list"><div class="skeleton" style="height: 150px;"></div></div>
    `;

    container.appendChild(card);
    const pList = card.querySelector('#player-list');
    const searchInput = card.querySelector('#player-search');

    const loadPlayers = async (q = '') => {
      try {
        pList.innerHTML = `<div class="skeleton" style="height: 150px;"></div>`;
        const res = await fetch(`/api/admin/players?search=${encodeURIComponent(q)}`, { credentials: 'include' });
        const data = await res.json();
        const players = data.players || [];

        if (players.length === 0) {
          pList.innerHTML = `<p style="font-size:13px; color:var(--text-muted); text-align:center; padding:20px;">Không có thí sinh nào.</p>`;
          return;
        }

        pList.innerHTML = players.map(p => `
          <div style="background: #0E1520; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:15px; color:#FFF;">${p.displayName}</strong>
                <div style="font-size:12px; color:var(--text-muted);">
                  ${p.studentId ? `MSSV: ${p.studentId} • ` : ''}${p.studentClass ? `Lớp: ${p.studentClass}` : ''}
                </div>
              </div>
              <button class="btn-view-attempts btn btn-secondary" data-id="${p.playerId}" style="min-height:32px; padding:4px 10px; font-size:12px; width:auto;">
                Lịch sử
              </button>
            </div>
            <div id="attempts-${p.playerId}" style="display:none; margin-top:10px; padding-top:10px; border-top:1px dashed var(--border-color);"></div>
          </div>
        `).join('');

        // Xem lịch sử lượt thi
        pList.querySelectorAll('.btn-view-attempts').forEach(btn => {
          btn.onclick = async () => {
            const pId = btn.dataset.id;
            const container = pList.querySelector(`#attempts-${pId}`);
            if (container.style.display === 'block') {
              container.style.display = 'none';
              return;
            }

            container.style.display = 'block';
            container.innerHTML = `<div class="skeleton" style="height:50px;"></div>`;

            const aRes = await fetch(`/api/admin/players/${pId}/attempts`, { credentials: 'include' });
            const aData = await aRes.json();
            const attempts = aData.attempts || [];

            if (attempts.length === 0) {
              container.innerHTML = `<div style="font-size:12px; color:var(--text-muted);">Chưa có lượt thi nào.</div>`;
              return;
            }

            container.innerHTML = attempts.map(a => `
              <div style="font-size: 12px; margin-bottom: 6px; padding: 6px; background: #0B0F16; border-radius: 4px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <span style="font-weight:700; color:#FFF;">${a.scores.total}đ</span> • ${a.status}
                  ${a.isDisqualified ? `<span style="color:var(--danger-color); font-weight:700;"> (ĐÃ BỊ LOẠI)</span>` : ''}
                </div>
                ${a.status === 'completed' ? `
                  ${a.isDisqualified ? `
                    <button class="btn-reinstate btn btn-secondary" data-id="${a.attemptId}" style="min-height:26px; padding:2px 8px; font-size:11px; width:auto;">Phục hồi</button>
                  ` : `
                    <button class="btn-disqualify btn btn-secondary" data-id="${a.attemptId}" style="min-height:26px; padding:2px 8px; font-size:11px; width:auto; color:var(--danger-color);">Loại lượt</button>
                  `}
                ` : ''}
              </div>
            `).join('');

            // Xử lý loại lượt
            container.querySelectorAll('.btn-disqualify').forEach(b => {
              b.onclick = async () => {
                const reason = prompt('Nhập lý do loại lượt thi này khỏi Bảng xếp hạng:');
                if (reason) {
                  await fetch(`/api/admin/attempts/${b.dataset.id}/disqualify`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ reason })
                  });
                  btn.click(); btn.click(); // Reload
                }
              };
            });

            // Xử lý phục hồi
            container.querySelectorAll('.btn-reinstate').forEach(b => {
              b.onclick = async () => {
                await fetch(`/api/admin/attempts/${b.dataset.id}/reinstate`, {
                  method: 'POST',
                  credentials: 'include'
                });
                btn.click(); btn.click();
              };
            });
          };
        });

      } catch (err) {
        pList.innerHTML = `<p style="color:var(--danger-color)">${err.message}</p>`;
      }
    };

    searchInput.oninput = () => loadPlayers(searchInput.value.trim());
    await loadPlayers();
  }

  // 5. TAB CÀI ĐẶT & MÙA GIẢI
  async renderSeasons(container) {
    container.innerHTML = `<div class="card skeleton" style="height: 250px;"></div>`;

    try {
      const res = await fetch('/api/admin/seasons', { credentials: 'include' });
      const data = await res.json();
      const seasons = data.seasons || [];
      const activeSeason = seasons.find(s => s.status === 'active') || seasons[0] || {};
      const activeRules = activeSeason.rules || {};
      const currentQTime = activeRules.timePerQuestionSeconds || 10;
      const currentKwTime = activeRules.keywordGuessTimeSeconds || 10;

      container.innerHTML = `
        <!-- CARD CÀI ĐẶT THỜI GIAN ĐẾM NGƯỢC -->
        <div class="card" style="text-align: left; margin-bottom: 16px; border: 1px solid var(--primary-color);">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom: 10px;">
            <span style="font-size: 22px;">⏱️</span>
            <div>
              <h3 style="font-size: 16px; font-weight: 800; color: #FFF; margin: 0;">CÀI ĐẶT THỜI GIAN ĐẾM NGƯỢC</h3>
              <p style="font-size: 12px; color: var(--text-muted); margin: 2px 0 0 0;">Áp dụng cho mùa hiện tại (${activeSeason.name || 'Mặc định'})</p>
            </div>
          </div>

          <form id="timer-settings-form" style="margin-top: 14px;">
            <div class="form-group" style="margin-bottom: 16px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
                <label class="form-label" style="font-weight:700; margin:0;">Thời gian mỗi câu hỏi (giây):</label>
                <span id="q-time-badge" style="font-size:14px; font-weight:800; color:var(--primary-color);">${currentQTime}s</span>
              </div>
              <input type="number" id="setting-q-time" class="form-input" min="3" max="120" value="${currentQTime}" required style="min-height: 44px; font-size: 16px; font-weight: 700;">
              
              <!-- Nút chọn nhanh -->
              <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
                <button type="button" class="btn-quick-q btn btn-secondary" data-sec="5" style="min-height:28px; padding:2px 8px; font-size:11px; width:auto;">5s</button>
                <button type="button" class="btn-quick-q btn btn-secondary" data-sec="10" style="min-height:28px; padding:2px 8px; font-size:11px; width:auto; border-color:var(--primary-color);">10s (Chuẩn)</button>
                <button type="button" class="btn-quick-q btn btn-secondary" data-sec="15" style="min-height:28px; padding:2px 8px; font-size:11px; width:auto;">15s</button>
                <button type="button" class="btn-quick-q btn btn-secondary" data-sec="20" style="min-height:28px; padding:2px 8px; font-size:11px; width:auto;">20s</button>
                <button type="button" class="btn-quick-q btn btn-secondary" data-sec="30" style="min-height:28px; padding:2px 8px; font-size:11px; width:auto;">30s</button>
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 18px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
                <label class="form-label" style="font-weight:700; margin:0;">Thời gian đoán từ khóa chung kết (giây):</label>
                <span id="kw-time-badge" style="font-size:14px; font-weight:800; color:var(--primary-color);">${currentKwTime}s</span>
              </div>
              <input type="number" id="setting-kw-time" class="form-input" min="3" max="120" value="${currentKwTime}" required style="min-height: 44px; font-size: 16px; font-weight: 700;">

              <!-- Nút chọn nhanh -->
              <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
                <button type="button" class="btn-quick-kw btn btn-secondary" data-sec="10" style="min-height:28px; padding:2px 8px; font-size:11px; width:auto; border-color:var(--primary-color);">10s (Chuẩn)</button>
                <button type="button" class="btn-quick-kw btn btn-secondary" data-sec="15" style="min-height:28px; padding:2px 8px; font-size:11px; width:auto;">15s</button>
                <button type="button" class="btn-quick-kw btn btn-secondary" data-sec="20" style="min-height:28px; padding:2px 8px; font-size:11px; width:auto;">20s</button>
                <button type="button" class="btn-quick-kw btn btn-secondary" data-sec="30" style="min-height:28px; padding:2px 8px; font-size:11px; width:auto;">30s</button>
              </div>
            </div>

            <button type="submit" id="btn-save-timer" class="btn btn-primary" style="width: 100%; min-height: 46px; font-weight: 800;">
              Lưu Cài Đặt Thời Gian ⏱️
            </button>
          </form>
        </div>

        <!-- DANH SÁCH MÙA GIẢI -->
        <div class="card" style="text-align: left;">
          <h3 style="font-size: 16px; font-weight: 800; color: #FFF; margin-bottom: 12px;">DANH SÁCH MÙA GIẢI</h3>
          <div id="season-list">
            ${seasons.map(s => `
              <div style="background: #0E1520; border: 1px solid ${s.status === 'active' ? 'var(--primary-color)' : 'var(--border-color)'}; border-radius: var(--radius-md); padding: 14px; margin-bottom: 10px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
                  <strong style="font-size: 15px; color: #FFF;">${s.name}</strong>
                  <span style="font-size: 11px; font-weight:700; color: ${s.status === 'active' ? 'var(--success-color)' : 'var(--text-dim)'};">
                    ${s.status === 'active' ? '● Đang Hoạt Động' : 'Đã Lưu Trữ'}
                  </span>
                </div>
                <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">${s.description || 'Không có mô tả'}</div>
                
                <div style="display:flex; flex-wrap:wrap; gap:8px; font-size: 11px; color: var(--text-dim); margin-bottom: 8px; background:#0B0F16; padding:6px 10px; border-radius:4px;">
                  <span>⏱️ Câu hỏi: <strong style="color:#FFF;">${s.rules?.timePerQuestionSeconds || 10}s</strong></span>
                  <span>• Từ khóa: <strong style="color:#FFF;">${s.rules?.keywordGuessTimeSeconds || 10}s</strong></span>
                </div>

                ${s.status !== 'active' ? `
                  <button class="btn-activate-season btn btn-primary" data-id="${s.id}" style="min-height:32px; padding:3px 12px; font-size:12px; width:auto;">Kích hoạt mùa này</button>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;

      // Event handlers
      const qInput = container.querySelector('#setting-q-time');
      const kwInput = container.querySelector('#setting-kw-time');
      const qBadge = container.querySelector('#q-time-badge');
      const kwBadge = container.querySelector('#kw-time-badge');

      qInput.oninput = () => { qBadge.textContent = `${qInput.value}s`; };
      kwInput.oninput = () => { kwBadge.textContent = `${kwInput.value}s`; };

      container.querySelectorAll('.btn-quick-q').forEach(b => {
        b.onclick = () => {
          qInput.value = b.dataset.sec;
          qBadge.textContent = `${b.dataset.sec}s`;
        };
      });

      container.querySelectorAll('.btn-quick-kw').forEach(b => {
        b.onclick = () => {
          kwInput.value = b.dataset.sec;
          kwBadge.textContent = `${b.dataset.sec}s`;
        };
      });

      const timerForm = container.querySelector('#timer-settings-form');
      const btnSave = container.querySelector('#btn-save-timer');

      timerForm.onsubmit = async (e) => {
        e.preventDefault();
        const qSec = parseInt(qInput.value, 10);
        const kwSec = parseInt(kwInput.value, 10);

        try {
          btnSave.disabled = true;
          btnSave.textContent = 'Đang lưu...';

          const saveRes = await fetch('/api/admin/settings/timer', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              timePerQuestionSeconds: qSec,
              keywordGuessTimeSeconds: kwSec
            })
          });

          const saveData = await saveRes.json();
          if (!saveRes.ok) throw new Error(saveData.error || 'Lỗi khi lưu cài đặt');

          this.showToast(saveData.message || 'Đã lưu cài đặt thời gian thành công!', 'success');
          await this.renderSeasons(container);
        } catch (err) {
          this.showToast(err.message, 'danger');
        } finally {
          btnSave.disabled = false;
          btnSave.textContent = 'Lưu Cài Đặt Thời Gian ⏱️';
        }
      };

      container.querySelectorAll('.btn-activate-season').forEach(b => {
        b.onclick = async () => {
          if (confirm('Kích hoạt mùa giải này? Các mùa khác sẽ chuyển sang lưu trữ.')) {
            await fetch(`/api/admin/seasons/${b.dataset.id}/activate`, { method: 'POST', credentials: 'include' });
            this.renderSeasons(container);
          }
        };
      });

    } catch (err) {
      container.innerHTML = `<div class="card"><p style="color:var(--danger-color)">${err.message}</p></div>`;
    }
  }

  // 6. TAB AUDIT LOGS
  async renderLogs(container) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.textAlign = 'left';
    card.innerHTML = `
      <h3 style="font-size: 17px; font-weight: 800; color: #FFF; margin-bottom: 12px;">NHẬT KÝ THAY ĐỔI (AUDIT LOGS)</h3>
      <div id="log-list"><div class="skeleton" style="height: 150px;"></div></div>
    `;

    container.appendChild(card);
    const logList = card.querySelector('#log-list');

    try {
      const res = await fetch('/api/admin/audit-logs', { credentials: 'include' });
      const data = await res.json();
      const logs = data.logs || [];

      if (logs.length === 0) {
        logList.innerHTML = `<p style="font-size:13px; color:var(--text-muted);">Chưa có nhật ký nào.</p>`;
        return;
      }

      logList.innerHTML = logs.map(l => {
        const time = new Date(l.timestamp).toLocaleString('vi-VN');
        return `
          <div style="background: #0E1520; border-radius: var(--radius-sm); padding: 8px 12px; margin-bottom: 6px; font-size: 12px;">
            <div style="display:flex; justify-content:space-between; margin-bottom: 2px;">
              <strong style="color:var(--primary-color);">${l.action}</strong>
              <span style="color:var(--text-dim);">${time}</span>
            </div>
            <div style="color:var(--text-muted);">Admin: ${l.adminUsername} • Mục: ${l.targetType} (${l.targetId})</div>
          </div>
        `;
      }).join('');
    } catch (err) {
      logList.innerHTML = `<p style="color:var(--danger-color)">${err.message}</p>`;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.adminApp = new AdminApp();
});
