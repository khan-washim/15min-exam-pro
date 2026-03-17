import User from '../models/User.js';
import Question from '../models/Question.js';
import Result from '../models/Result.js';
import ExamSession from '../models/ExamSession.js';

/**
 * @desc Get Platform Statistics
 * GET /api/admin/stats
 */
export const getStats = async (req, res) => {
  try {
    const [users, questions, results, activeExams] = await Promise.all([
      User.countDocuments(),
      Question.countDocuments(),
      Result.countDocuments(),
      ExamSession.countDocuments({ status: 'active' })
    ]);

    res.json({ 
      users, 
      questions, 
      results, 
      activeExams 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch statistics', 
      error: error.message 
    });
  }
};

/**
 * @desc Get All Registered Users
 * GET /api/admin/users
 */
export const getUsers = async (req, res) => {
  try {
    // Fetch all users, excluding passwords, sorted by latest
    const users = await User.find({}).select('-password').sort('-createdAt');
    res.json(users);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
};