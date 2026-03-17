import express from 'express'; // Changed 'router' to 'express'
// Use import instead of require
import { createSubject, getAllSubjects } from '../controllers/subjectController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for Subjects
router.get('/', protect, admin, getAllSubjects);
router.post('/', protect, admin, createSubject);

// Use export default instead of module.exports
export default router;