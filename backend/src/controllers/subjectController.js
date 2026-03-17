import Subject from '../models/Subject.js';

/**
 * Create a new Subject
 * POST /api/subjects
 */
export const createSubject = async (req, res) => {
  try {
    const { nameEn, nameBn, marks, icon } = req.body;
    
    // Logic: Create the subject in the database
    const subject = await Subject.create({ 
      nameEn, 
      nameBn, 
      marks, 
      icon 
    });
    
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ 
      message: 'Failed to create subject', 
      error: error.message 
    });
  }
};

/**
 * Get all Subjects
 * GET /api/subjects
 */
export const getAllSubjects = async (req, res) => {
  try {
    // Sorting by 'marks' as requested
    const subjects = await Subject.find({}).sort('marks');
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error fetching subjects', 
      error: error.message 
    });
  }
};