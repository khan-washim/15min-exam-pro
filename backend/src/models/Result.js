import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // ঐচ্ছিক: যদি ExamSession ব্যবহার না করেন তবে এটি required: false রাখা ভালো
  examSession: { type: mongoose.Schema.Types.ObjectId, ref: 'ExamSession' },
  subject: { type: String, required: true }, // যেমন: 'bangla'
  setNumber: { type: Number, required: true }, // যেমন: 1
  score: { type: Number, required: true }, // Net Score
  correct: { type: Number, required: true },
  wrong: { type: Number, required: true },
  skipped: { type: Number, default: 0 },
  answers: { type: Object }, // ইউজারের দেওয়া উত্তরগুলো সেভ রাখার জন্য
  timeTaken: { type: Number }, // Seconds
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Result', resultSchema);