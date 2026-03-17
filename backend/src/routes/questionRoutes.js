import express from 'express';
import { 
  createQuestion, 
  getAllQuestions, 
  deleteQuestion, 
  bulkUploadQuestions,
  getQuestionsBySubjectName 
} from '../controllers/questionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

/**
 * --- Student Routes ---
 * getQuestionsBySubjectName ekhon random 20ti question return korbe
 * (Controller-e amra $sample logic add korechi)
 */
router.get('/subject/:subjectName', protect, getQuestionsBySubjectName);

/**
 * --- Admin Routes ---
 */

// Bulk Upload (JSON file theke)
router.post('/upload', protect, admin, upload.single('file'), bulkUploadQuestions);

// Single Question create kora
router.post('/', protect, admin, createQuestion);

// Shob questions dekha (Admin panel table-er jonno)
router.get('/', protect, admin, getAllQuestions);

// Specific question delete kora
router.delete('/:id', protect, admin, deleteQuestion);

export default router;