import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  subject: String,
  rank: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('leaderboard', leaderboardSchema);