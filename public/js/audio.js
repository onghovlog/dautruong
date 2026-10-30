/**
 * MODULE QUẢN LÝ ÂM THANH MINIGAME SỬ DỤNG WEB AUDIO API
 * Tổng hợp các hiệu ứng âm thanh (sound effects) bằng synthesizer:
 * - correct (chime vui tai khi đúng)
 * - wrong (tiếng trầm khi sai)
 * - tick (tiếng gõ đồng hồ đếm ngược)
 * - timeout (tiếng còi hết giờ)
 * - victory (nhạc chào mừng hoàn thành)
 * - click (tiếng chạm nhẹ)
 */

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.isEnabled = localStorage.getItem('dtnn_sound_enabled') !== 'false'; // Mặc định bật nếu chưa tắt
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.isEnabled = !this.isEnabled;
    localStorage.setItem('dtnn_sound_enabled', this.isEnabled ? 'true' : 'false');
    if (this.isEnabled) {
      this.playClick();
    }
    return this.isEnabled;
  }

  playTone(freq, type, duration, startTime = 0, gainLevel = 0.15) {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + startTime);

      gain.gain.setValueAtTime(gainLevel, this.audioCtx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(this.audioCtx.currentTime + startTime);
      osc.stop(this.audioCtx.currentTime + startTime + duration);
    } catch (_) {}
  }

  playClick() {
    this.playTone(800, 'sine', 0.05, 0, 0.08);
  }

  playTick() {
    this.playTone(1200, 'triangle', 0.04, 0, 0.05);
  }

  playWarningTick() {
    this.playTone(1800, 'square', 0.08, 0, 0.08);
  }

  playCorrect() {
    // Chuỗi âm thăng hoa tươi vui: C5 -> E5 -> G5 -> C6
    this.playTone(523.25, 'sine', 0.12, 0, 0.15);
    this.playTone(659.25, 'sine', 0.12, 0.08, 0.15);
    this.playTone(783.99, 'sine', 0.15, 0.16, 0.18);
    this.playTone(1046.50, 'sine', 0.35, 0.24, 0.2);
  }

  playWrong() {
    // Hai nốt trầm giảm: F3 -> C#3
    this.playTone(174.61, 'sawtooth', 0.18, 0, 0.12);
    this.playTone(138.59, 'sawtooth', 0.28, 0.15, 0.15);
  }

  playTimeout() {
    this.playTone(220, 'square', 0.25, 0, 0.12);
    this.playTone(180, 'square', 0.35, 0.22, 0.12);
  }

  playVictory() {
    // Điệp khúc chiến thắng rộn rã
    const notes = [523, 659, 784, 1046, 784, 1046];
    const delays = [0, 0.12, 0.24, 0.36, 0.52, 0.68];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.25, delays[idx], 0.18);
    });
  }
}

export const sound = new SoundManager();
