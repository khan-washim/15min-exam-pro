import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameBn: { type: String },
  marks: { type: Number },
  icon: { type: String }
}, { timestamps: true });

export default mongoose.model('subject', subjectSchema);