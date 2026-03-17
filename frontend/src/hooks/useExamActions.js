import { useExam } from '../context/ExamContext';

export const useExamActions = () => {
  const { 
    examState, 
    submitAnswer, 
    nextQuestion, 
    prevQuestion, 
    setExamState 
  } = useExam();

  /**
   * Navigates directly to a specific question index.
   * Useful for the Question Palette/Grid.
   */
  const jumpTo = (index) => {
    if (index >= 0 && index < examState.questions.length) {
      setExamState(prev => ({
        ...prev,
        currentIndex: index
      }));
    }
  };

  /**
   * Optional: Clears a selected answer for the current question
   */
  const clearAnswer = (index) => {
    setExamState(prev => {
      const newAnswers = { ...prev.answers };
      delete newAnswers[index];
      return { ...prev, answers: newAnswers };
    });
  };

  return { 
    submitAnswer, 
    nextQuestion, 
    prevQuestion, 
    jumpTo, 
    clearAnswer 
  };
};