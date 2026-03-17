import Result from '../models/Result.js';
import User from '../models/User.js'; // Corrected import path

/**
 * Get Leaderboard by Subject
 * GET /api/leaderboard?subject=English&limit=10
 */
export const getLeaderboard = async (req, res) => {
  try {
    const { subject, limit = 10 } = req.query;

    if (!subject) {
      return res.status(400).json({ message: 'Subject is required for leaderboard' });
    }

    // Using Aggregation for efficiency
    const topScores = await Result.aggregate([
      // 1. Filter by subject
      { $match: { subject: subject } },
      
      // 2. Sort by score descending so the highest score is first
      { $sort: { score: -1 } },

      // 3. Group by user to ensure each student only appears once (their best score)
      {
        $group: {
          _id: "$user",
          bestScore: { $max: "$score" },
          timeTaken: { $first: "$timeTaken" } // Optional: Tie-breaker logic
        }
      },

      // 4. Sort the grouped results
      { $sort: { bestScore: -1 } },

      // 5. Limit to top X players
      { $limit: parseInt(limit) },

      // 6. Join with Users collection to get names/avatars
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },

      // 7. Clean up the output
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          score: "$bestScore",
          name: "$userDetails.name",
          avatar: "$userDetails.avatar"
        }
      }
    ]);

    // Add Rank index
    const rankedResults = topScores.map((item, index) => ({
      rank: index + 1,
      ...item
    }));

    res.json(rankedResults);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
};