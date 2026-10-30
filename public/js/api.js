/**
 * API CLIENT MODULE
 * Giao tiếp REST API với máy chủ Backend
 */

async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `/api${endpoint}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...options.headers
    },
    credentials: 'include' // Luôn đính kèm cookie HttpOnly
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data.error || `Lỗi máy chủ (${res.status})`;
      const err = new Error(errorMsg);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (err) {
    if (!navigator.onLine || err.message.includes('Failed to fetch')) {
      const offlineErr = new Error('Mất kết nối mạng. Đang tự động kết nối lại...');
      offlineErr.isOffline = true;
      throw offlineErr;
    }
    throw err;
  }
}

export const api = {
  // Người chơi
  registerPlayer: (data) => request('/player/register', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => request('/player/me'),
  updateProfile: (data) => request('/player/me', { method: 'PUT', body: JSON.stringify(data) }),
  recoverPlayer: (recoveryCode) => request('/player/recover', { method: 'POST', body: JSON.stringify({ recoveryCode }) }),
  regenerateRecoveryCode: () => request('/player/regenerate-recovery-code', { method: 'POST' }),
  switchPlayer: () => request('/player/switch', { method: 'POST' }),

  // Trò chơi
  getCurrentAttempt: () => request('/game/current'),
  startAttempt: (forceNew = false) => request('/game/start', { method: 'POST', body: JSON.stringify({ forceNew }) }),
  startQuestion: (attemptId, roundKey, questionIndex) => request('/game/start-question', {
    method: 'POST',
    body: JSON.stringify({ attemptId, roundKey, questionIndex })
  }),
  submitAnswer: (attemptId, roundKey, questionIndex, selectedOptionId) => request('/game/submit-answer', {
    method: 'POST',
    body: JSON.stringify({ attemptId, roundKey, questionIndex, selectedOptionId })
  }),
  nextRound: (attemptId) => request('/game/next-round', { method: 'POST', body: JSON.stringify({ attemptId }) }),
  startKeyword: (attemptId) => request('/game/start-keyword', { method: 'POST', body: JSON.stringify({ attemptId }) }),
  submitKeyword: (attemptId, guessText) => request('/game/submit-keyword', {
    method: 'POST',
    body: JSON.stringify({ attemptId, guessText })
  }),
  getHistory: () => request('/game/history'),
  getAttemptDetail: (attemptId) => request(`/game/attempts/${attemptId}`),

  // Bảng xếp hạng
  getLeaderboard: (timeRange = 'all', seasonId = '') => {
    let q = `?timeRange=${timeRange}`;
    if (seasonId) q += `&seasonId=${seasonId}`;
    return request(`/leaderboard${q}`);
  }
};
