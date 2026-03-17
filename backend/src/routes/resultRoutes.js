import express from 'express';
import { 
  submitResult, 
  getMyResults, 
  getResultById 
} from '../controllers/resultController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Result Routes
 */

// ১. রেজাল্ট সাবমিট করা (পরীক্ষা শেষে)
router.post('/', protect, submitResult);

// ২. ইউজারের সব রেজাল্ট দেখা (History Page)
router.get('/my-results', protect, getMyResults);

// ৩. নির্দিষ্ট একটি রেজাল্টের বিস্তারিত দেখা
router.get('/:id', protect, getResultById);

export default router;