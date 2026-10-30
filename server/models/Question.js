import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true }
}, { _id: false });

const QuestionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  round: { type: String, required: true, enum: ['khoi_dong', 'tranh_tai', 'ban_ket', 'chung_ket'] },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['de', 'vua', 'kho'] },
  question: { type: String, required: true },
  options: [OptionSchema],
  correctOptionId: { type: String, required: true },
  explanation: { type: String, required: true },
  source: { type: String, default: '' },
  horizontalAnswer: { type: String, default: null },
  normalizedAnswer: { type: String, default: null }
}, { timestamps: true });

QuestionSchema.index({ round: 1, difficulty: 1 });

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);
