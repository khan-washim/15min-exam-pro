import mongoose from 'mongoose';

const examSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  setNumber: { type: Number, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  answers: { type: Map, of: Number }, // { questionIndex: answerIndex }
  status: { type: String, enum: ['active', 'completed', 'abandoned'], default: 'active' },
  startTime: { type: Date, required: true },
  endTime: { type: Date }
}, { timestamps: true });

export default mongoose.model('examSession', examSessionSchema);