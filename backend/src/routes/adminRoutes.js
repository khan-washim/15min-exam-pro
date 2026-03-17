import express from 'express';
// Import stats and user management from adminController
import { 
  getStats, 
  getUsers 
} from '../controllers/adminController.js';

// Import question management from questionController
import { 
  createQuestion, 
  getAllQuestions, 
  deleteQuestion,
  bulkUploadQuestions 
} from '../controllers/questionController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Admin Dashboard Stats
 */
router.get('/stats', protect, admin, getStats);

/**
 * User Management
 */
router.get('/users', protect, admin, getUsers);

/**
 * Question Management (Admin specific)
 */
router.get('/questions', protect, admin, getAllQuestions);
router.post('/questions', protect, admin, createQuestion);
router.delete('/questions/:id', protect, admin, deleteQuestion);

/**
 * Bulk Question Upload
 * POST /api/admin/bulk-questions
 */
router.post('/bulk-questions', protect, admin, bulkUploadQuestions);

export default router;