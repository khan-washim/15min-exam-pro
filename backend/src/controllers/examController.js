import ExamSession from '../models/ExamSession.js';
import Question from '../models/Question.js';

/**
 * Start a new Exam Session
 * POST /api/exam/start
 */
export const startExam = async (req, res) => {
  try {
    const { subjectId, setId, duration } = req.body;
    const userId = req.user._id;

    // 1. Check for existing active session
    const existing = await ExamSession.findOne({ user: userId, status: 'active' });
    if (existing) {
      return res.status(400).json({ 
        message: 'You already have an active exam session running.',
        sessionId: existing._id 
      });
    }

    // 2. Fetch questions for the specific subject and set
    const questions = await Question.find({ 
      subject: subjectId, 
      setNumber: parseInt(setId) 
    });

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this subject/set.' });
    }

    // 3. Shuffle and pick questions (20 or total available)
    const shuffled = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, 20);

    // 4. Calculate Timing
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + duration * 60000);

    // 5. Create Session
    const session = await ExamSession.create({
      user: userId,
      subject: subjectId,
      setNumber: parseInt(setId),
      questions: shuffled.map(q => q._id), // Store IDs or objects based on your Schema
      status: 'active',
      startTime,
      endTime
    });

    res.status(201).json({ 
      sessionId: session._id, 
      questions: shuffled,
      endTime 
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to start exam', error: error.message });
  }
};

/**
 * Get the current active session for the logged-in user
 * GET /api/exam/active
 */
export const getActiveSession = async (req, res) => {
  try {
    const session = await ExamSession.findOne({ user: req.user._id, status: 'active' })
      .populate('questions'); // Populate question details if needed by frontend

    if (!session) {
      return res.status(404).json({ message: 'No active exam found' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};