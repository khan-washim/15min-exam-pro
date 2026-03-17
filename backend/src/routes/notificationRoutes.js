import express from 'express';
// Use import instead of require
import { getMyNotifications } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Notification Routes
 * GET /my - Fetches personal notifications (Protected)
 */
router.get('/my', protect, getMyNotifications);

// Use export default instead of module.exports
export default router;