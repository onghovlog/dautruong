import mongoose from 'mongoose';

const CrosswordRowSchema = new mongoose.Schema({
  rowIndex: { type: Number, required: true },
  questionId: { type: String, required: true },
  difficulty: { type: String, required: true },
  horizontalAnswer: { type: String, required: true },
  normalizedAnswer: { type: String, required: true },
  targetChar: { type: String, required: true },
  charIndex: { type: Number, required: true }
}, { _id: false });

const CrosswordSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  keyword: { type: String, required: true },
  normalizedKeyword: { type: String, required: true },
  isApproved: { type: Boolean, default: true },
  rows: [CrosswordRowSchema]
}, { timestamps: true });

export default mongoose.models.Crossword || mongoose.model('Crossword', CrosswordSchema);
