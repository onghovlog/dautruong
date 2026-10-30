import mongoose from 'mongoose';

const CrosswordRowSchema = new mongoose.Schema({
  rowIndex: { type: Number, required: true },
  questionId: { type: String, default: '' },
  question: { type: String, default: '' },
  difficulty: { type: String, default: 'vua' },
  horizontalAnswer: { type: String, required: true },
  normalizedAnswer: { type: String, required: true },
  targetChar: { type: String, required: true },
  charIndex: { type: Number, required: true },
  startCol: { type: Number, default: 0 },
  options: [{
    id: { type: String },
    text: { type: String }
  }],
  correctOptionId: { type: String, default: 'A' },
  explanation: { type: String, default: '' },
  source: { type: String, default: '' },
  alternatives: [{
    question: String,
    horizontalAnswer: String,
    normalizedAnswer: String,
    charIndex: Number,
    options: [{ id: String, text: String }]
  }]
}, { _id: false });

const CrosswordSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  keyword: { type: String, required: true },
  normalizedKeyword: { type: String, required: true },
  isApproved: { type: Boolean, default: true },
  centerCol: { type: Number, default: 0 },
  totalCols: { type: Number, default: 0 },
  rows: [CrosswordRowSchema]
}, { timestamps: true });

export default mongoose.models.Crossword || mongoose.model('Crossword', CrosswordSchema);
