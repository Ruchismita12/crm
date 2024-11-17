import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  audience: {
    type: String,
    required: true,
  },
  conditions: [{
    field: String,
    operator: String,
    value: mongoose.Schema.Types.Mixed,
  }],
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'completed'],
    default: 'draft',
  },
  stats: {
    sent: { type: Number, default: 0 },
    delivered: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
  },
}, { timestamps: true });

export default mongoose.model('Campaign', campaignSchema);