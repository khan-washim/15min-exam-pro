import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  message: String,
  type: { type: String, enum: ['info', 'success', 'warning'] },
  isRead: { type: Boolean, default: false },
  link: String,
  createdAt: { type: Date, default: Date.now() }
});

export default mongoose.model('notification', notificationSchema);