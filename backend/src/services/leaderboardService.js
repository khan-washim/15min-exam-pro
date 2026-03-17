import Result from '../models/Result';
import User from '../models/User';

export const LeaderboardService = {
  async getSubjectLeaderboard(subjectId) {
    // Logic to calculate top users based on score
    const results = await Result.find({ subject: subjectId }).sort('-netScore');
    
    // Group by user and get max score per subject
    const stats = {};
    results.forEach(r => {
      if (!stats[r.user]) stats[r.user] = 0;
      if (r.score > stats[r.user]) stats[r.user] = r.score;
    });

    // Convert stats to array and sort
    const sortedUsers = Object.entries(stats)
      .sort(([,scoreA, scoreB]) => scoreB - scoreA)
      .slice(0, 10); // Top 10

    // Fetch user details
    const userIds = sortedUsers.map(entry => entry[0]);
    const users = await User.find({ _id: { $in: userIds } });

    return sortedUsers.map(([userId, score], i) => {
        const user = users.find(u => u._id.toString() === userId.toString());
        return { rank: i + 1, ...user, score };
    });
  }
};