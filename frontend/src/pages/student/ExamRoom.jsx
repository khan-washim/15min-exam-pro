import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExamProvider, useExam } from '../../context/ExamContext';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Loader from '../../components/ui/Loader';
import QuestionCard from '../../components/exam/QuestionCard';
import { Clock, ChevronLeft, ChevronRight, Send, AlertTriangle } from 'lucide-react';

const ExamContent = () => {
  const { subjectId } = useParams(); 
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Modal state

  const { 
    examState, 
    startExam, 
    formatTime, 
    nextQuestion, 
    prevQuestion, 
    submitAnswer,
    calculateResult 
  } = useExam();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/questions/subject/${subjectId}`); 
        if (data && data.length > 0) {
          startExam(`practice_${Date.now()}`, data, 15); 
        } else {
          setErrorMsg(`${subjectId} এর জন্য কোনো প্রশ্ন পাওয়া যায়নি।`);
        }
      } catch (err) {
        setErrorMsg("সার্ভার থেকে প্রশ্ন লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    };
    if (subjectId) fetchQuestions();
  }, [subjectId]);

  const handleFinalSubmit = async () => {
    setShowModal(false); // Modal bondho kora
    try {
      setSubmitting(true);
      const results = calculateResult();

      const submissionData = {
        subject: subjectId,
        setNumber: 0,
        totalQuestions: results.total,
        correctAnswers: results.correct,
        wrongAnswers: results.total - results.correct,
        score: results.score,
        answers: examState.answers
      };

      const { data } = await api.post('/results', submissionData);
      if (data.success) {
        toast.success("Exam submitted successfully!");
        navigate(`/dashboard/history/${data.data._id}`);
      }
    } catch (err) {
      toast.error("সাবমিট করতে সমস্যা হয়েছে।");
    } finally {
      setSubmitting(false);
    }
  };

  if (errorMsg) return <div className="container mt-5 text-center alert alert-warning">{errorMsg}</div>;
  if (loading || submitting) return <Loader fullPage text={submitting ? "সাবমিট হচ্ছে..." : ""} />;

  const currentQuestion = examState.questions[examState.currentIndex];
  const unansweredCount = examState.questions.length - Object.keys(examState.answers).length;

  return (
    <div className="min-vh-100 bg-light pb-5 position-relative">
      <header className="bg-white border-bottom p-3 sticky-top shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0 fw-bold text-primary text-uppercase">{subjectId} Practice</h5>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center px-3 py-2 rounded-pill bg-dark text-white">
              <Clock size={18} className="me-2 text-warning" />
              <span className="fw-mono fs-5">{formatTime()}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4 rounded-4">
              {currentQuestion && (
                <>
                  <QuestionCard 
                    question={currentQuestion}
                    index={examState.currentIndex}
                    selectedOption={examState.answers[examState.currentIndex]}
                    onSelect={(optionIdx) => submitAnswer(examState.currentIndex, optionIdx)}
                  />
                  <div className="d-flex justify-content-between mt-5 pt-4 border-top">
                    <button className="btn btn-light px-4 fw-bold" onClick={prevQuestion} disabled={examState.currentIndex === 0}>
                      <ChevronLeft size={20} /> Previous
                    </button>
                    {examState.currentIndex === examState.questions.length - 1 ? (
                      <button className="btn btn-success px-5 fw-bold" onClick={() => setShowModal(true)}>
                        Submit Exam <Send size={18} className="ms-2" />
                      </button>
                    ) : (
                      <button className="btn btn-primary px-5 fw-bold" onClick={nextQuestion}>
                        Next Question <ChevronRight size={20} />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* --- Confirmation Modal --- */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-body text-center p-5">
                <div className="mb-3 text-warning">
                  <AlertTriangle size={60} />
                </div>
                <h3 className="fw-bold mb-3">আপনি কি নিশ্চিত?</h3>
                <p className="text-muted mb-4">
                   আপনি মোট {examState.questions.length} টি প্রশ্নের মধ্যে {Object.keys(examState.answers).length} টি উত্তর দিয়েছেন। 
                   {unansweredCount > 0 && ` আপনার এখনও ${unansweredCount} টি উত্তর বাকি আছে।`}
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-center">
                  <button className="btn btn-light px-4 fw-bold" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-success px-4 fw-bold" onClick={handleFinalSubmit}>Yes, Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ExamRoom = () => (
  <ExamProvider>
    <ExamContent />
  </ExamProvider>
);

export default ExamRoom;