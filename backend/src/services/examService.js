// This is optional if logic is purely in controller. 
// If used for reusability:
import ExamSession from '../models/ExamSession';
import Question from '../models/Question';

// Example Service Function
const getExamSessionDetails = async (sessionId) => {
    return await ExamSession.findById(sessionId).populate('questions');
};

// module.exports = { getExamSessionDetails };