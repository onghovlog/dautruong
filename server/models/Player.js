import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  playerId: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  studentId: { type: String, default: null },
  studentClass: { type: String, default: null },
  publicClass: { type: Boolean, default: false },
  recoveryCodeHash: { type: String, required: true },
  recoveryCodeAttempts: { type: Number, default: 0 },
  recoveryCodeLockedUntil: { type: Date, default: null },
  lastActiveAt: { type: Date, default: Date.now },
  isDemo: { type: Boolean, default: false }
}, { timestamps: true });

PlayerSchema.index({ recoveryCodeHash: 1 });
PlayerSchema.index({ displayName: 1 });

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema);
