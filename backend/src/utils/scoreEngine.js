/**
 * BCS Score Calculation Engine
 * @param {Array} questions - Array of question objects from the session
 * @param {Object} answers - Object containing user answers { questionId: selectedOption }
 * @returns {Object} scoreData - Detailed breakdown of the performance
 */
const calculateBCSScore = (questions, answers) => {
  let correctCount = 0;
  let wrongCount = 0;
  let totalAnswered = 0;

  questions.forEach((question) => {
    const userAnswer = answers[question._id.toString()];

    if (userAnswer !== undefined && userAnswer !== null) {
      totalAnswered++;
      // Compare user answer with the correct answer stored in DB
      if (userAnswer === question.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }
  });

  // BCS Standard: 1 mark for correct, 0.50 penalty for wrong
  const marksForCorrect = correctCount * 1;
  const negativeMarks = wrongCount * 0.5;
  const netScore = marksForCorrect - negativeMarks;

  return {
    totalQuestions: questions.length,
    totalAnswered,
    correctCount,
    wrongCount,
    score: netScore > 0 ? netScore : 0 // Ensure score doesn't go below zero
  };
};

// This line fixes the SyntaxError
export default calculateBCSScore;