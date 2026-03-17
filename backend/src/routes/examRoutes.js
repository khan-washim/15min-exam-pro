import express from 'express';
// Use import instead of require for your controllers and middleware
import { startExam, getActiveSession } from '../controllers/examController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Exam Routes
 * Both routes are protected by the 'protect' middleware 
 * to ensure only logged-in users can access them.
 */
router.post('/start', protect, startExam);
router.get('/active', protect, getActiveSession);

// Use export default instead of module.exports
export default router;