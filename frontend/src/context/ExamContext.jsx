import { createContext, useState, useContext, useEffect, useRef } from 'react';

const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const [examState, setExamState] = useState({
    sessionId: null,
    questions: [],
    answers: {},
    currentIndex: 0,
    timeLeft: 0,
    isActive: false,
    isSubmitted: false
  });

  const timerRef = useRef(null);

  useEffect(() => {
    if (examState.isActive && examState.timeLeft > 0) {
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
  }, [examState.isActive, examState.timeLeft]);

  const startExam = (sessionId, questions, durationMinutes = 15) => {
    setExamState({
      sessionId,
      questions,
      answers: {},
      currentIndex: 0,
      timeLeft: durationMinutes * 60,
      isActive: true,
      isSubmitted: false
    });
  };

  const submitAnswer = (questionIndex, optionIndex) => {
    if (!examState.isActive) return;
    setExamState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionIndex]: optionIndex }
    }));
  };

  // রেজাল্ট ক্যালকুলেট করার নতুন ফাংশন
  const calculateResult = () => {
    let correctCount = 0;
    const { questions, answers } = examState;

    questions.forEach((q, index) => {
      // সঠিক ইনডেক্সের সাথে ইউজারের দেওয়া উত্তরের ইনডেক্স চেক করা
      if (answers[index] === q.correctIndex) {
        correctCount++;
      }
    });

    return {
      total: questions.length,
      correct: correctCount,
      score: correctCount * 1 // প্রতি প্রশ্নে ১ মার্ক
    };
  };

  const nextQuestion = () => 
    setExamState(p => ({ ...p, currentIndex: Math.min(p.currentIndex + 1, p.questions.length - 1) }));

  const prevQuestion = () => 
    setExamState(p => ({ ...p, currentIndex: Math.max(p.currentIndex - 1, 0) }));

  const formatTime = () => {
    const minutes = Math.floor(examState.timeLeft / 60);
    const seconds = examState.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <ExamContext.Provider value={{ 
      examState, 
      startExam, 
      submitAnswer, 
      nextQuestion, 
      prevQuestion, 
      formatTime,
      calculateResult, // এক্সপোর্ট করা হলো
      setExamState 
    }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => useContext(ExamContext);