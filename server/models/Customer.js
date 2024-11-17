import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  totalSpent: {
    type: Number,
    default: 0,
  },
  lastVisit: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  tags: [String],
  preferences: {
    type: Map,
    of: String,
  },
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);