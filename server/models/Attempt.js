import mongoose from 'mongoose';

const AttemptSchema = new mongoose.Schema({
  attemptId: { type: String, required: true, unique: true },
  playerId: { type: String, required: true },
  seasonId: { type: String, required: true },
  seasonName: { type: String, default: '' },
  rulesSnapshot: { type: mongoose.Schema.Types.Mixed },
  status: { type: String, enum: ['in_progress', 'completed', 'abandoned'], default: 'in_progress' },
  isDisqualified: { type: Boolean, default: false },
  disqualifiedReason: { type: String, default: '' },
  currentRoundIndex: { type: Number, default: 0 },
  currentRoundKey: { type: String, default: 'khoi_dong' },
  currentQuestionIndex: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  lastUpdatedAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null },
  scores: {
    khoi_dong: { type: Number, default: 0 },
    tranh_tai: { type: Number, default: 0 },
    ban_ket: { type: Number, default: 0 },
    chung_ket: { type: Number, default: 0 },
    keywordBonus: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  stats: {
    totalCorrect: { type: Number, default: 0 },
    totalWrong: { type: Number, default: 0 },
    totalTimeout: { type: Number, default: 0 },
    totalQuestionsAnswered: { type: Number, default: 0 },
    totalQuizTimeSpentMs: { type: Number, default: 0 }
  },
  rounds: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

AttemptSchema.index({ playerId: 1, status: 1 });
AttemptSchema.index({ status: 1, isDisqualified: 1, seasonId: 1 });
AttemptSchema.index({ completedAt: 1 });

export default mongoose.models.Attempt || mongoose.model('Attempt', AttemptSchema);
