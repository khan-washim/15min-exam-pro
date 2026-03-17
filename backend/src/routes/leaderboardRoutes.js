import express from 'express';
// Use import instead of require for your controllers and middleware
import { getLeaderboard } from '../controllers/leaderboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Leaderboard Route
 * GET / - Fetches the top scores (Protected)
 */
router.get('/', protect, getLeaderboard);

// Use export default instead of module.exports
export default router;