import { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react';

const ExamContext = createContext(null);

export const ExamProvider = ({ children }) => {
  const [examState, setExamState] = useState({
    sessionId: null,
    questions: [],
    answers: {},
    currentIndex: 0,
    timeLeft: 0,
    isActive: false,
    isSubmitted: false,
    isAutoSubmitted: false
  });

  const timerRef = useRef(null);

  // ✅ Fix: dependency থেকে examState.timeLeft সরানো হয়েছে
  useEffect(() => {
    if (examState.isActive) {
      timerRef.current = setInterval(() => {
        setExamState(prev => {
          if (prev.timeLeft <= 1) {
            clearInterval(timerRef.current);
            return { ...prev, timeLeft: 0, isActive: false, isAutoSubmitted: true };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [examState.isActive]); // ✅ শুধু isActive

  const startExam = useCallback((sessionId, questions, durationMinutes = 15) => {
    clearInterval(timerRef.current);
    setExamState({
      sessionId,
      questions,
      answers: {},
      currentIndex: 0,
      timeLeft: durationMinutes * 60,
      isActive: true,
      isSubmitted: false,
      isAutoSubmitted: false
    });
  }, []);

  const endExam = useCallback(() => {
    clearInterval(timerRef.current);
    setExamState(prev => ({ ...prev, isActive: false }));
  }, []);

  const submitAnswer = useCallback((questionIndex, optionIndex) => {
    setExamState(prev => {
      if (!prev.isActive) return prev;
      return { ...prev, answers: { ...prev.answers, [questionIndex]: optionIndex } };
    });
  }, []);

  const calculateResult = useCallback(() => {
    const { questions, answers } = examState;
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctIndex) correctCount++;
    });
    return {
      total: questions.length,
      correct: correctCount,
      score: correctCount
    };
  }, [examState]);

  const nextQuestion = useCallback(() =>
    setExamState(p => ({
      ...p, currentIndex: Math.min(p.currentIndex + 1, p.questions.length - 1)
    })), []);

  const prevQuestion = useCallback(() =>
    setExamState(p => ({
      ...p, currentIndex: Math.max(p.currentIndex - 1, 0)
    })), []);

  const formatTime = useCallback(() => {
    const minutes = Math.floor(examState.timeLeft / 60);
    const seconds = examState.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, [examState.timeLeft]);

  return (
    <ExamContext.Provider value={{
      examState,
      startExam,
      endExam,
      submitAnswer,
      nextQuestion,
      prevQuestion,
      formatTime,
      calculateResult,
      setExamState
    }}>
      {children}
    </ExamContext.Provider>
  );
};

// ✅ Fix: null check যোগ করা হয়েছে — এটাই red error fix করে
export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};