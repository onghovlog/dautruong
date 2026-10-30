import mongoose from 'mongoose';

const SeasonSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['active', 'archived', 'inactive'], default: 'active' },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date, default: null },
  rules: {
    pointsPerRound: {
      khoi_dong: { type: Number, default: 10 },
      tranh_tai: { type: Number, default: 20 },
      ban_ket: { type: Number, default: 30 },
      chung_ket: { type: Number, default: 40 }
    },
    keywordBonus: { type: Number, default: 100 },
    timePerQuestionSeconds: { type: Number, default: 10 },
    keywordGuessTimeSeconds: { type: Number, default: 10 },
    difficultyRatio: {
      khoi_dong: { de: Number, vua: Number, kho: Number },
      tranh_tai: { de: Number, vua: Number, kho: Number },
      ban_ket: { de: Number, vua: Number, kho: Number },
      chung_ket: { de: Number, vua: Number, kho: Number }
    }
  }
}, { timestamps: true });

SeasonSchema.index({ status: 1 });

export default mongoose.models.Season || mongoose.model('Season', SeasonSchema);
