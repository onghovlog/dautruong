import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now },
  adminUsername: { type: String, required: true },
  action: { type: String, required: true },
  targetType: { type: String, required: true },
  targetId: { type: String, required: true },
  details: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

AuditLogSchema.index({ timestamp: -1 });

export default mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
