import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  subject: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subject', 
    required: true 
  },
  // setNumber ekhon required: false kora hoyeche dynamic practice-er jonno
  setNumber: { 
    type: Number, 
    required: false,
    default: 0 
  },
  text: { 
    type: String, 
    required: true 
  },
  options: { 
    type: [String], 
    required: true 
  },
  correctIndex: { 
    type: Number, 
    required: true 
  },
  explanation: { 
    type: String 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true });

// indexing subject for faster random query performance
questionSchema.index({ subject: 1 });

export default mongoose.model('question', questionSchema);