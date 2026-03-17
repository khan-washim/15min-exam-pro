import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import ResultPie from '../../components/charts/ResultPie';

const ResultDetail = () => {
  const location = useLocation();
  const result = location.state; // Passed from ExamRoom navigate

  // Redirect if no data is present (e.g., direct URL access)
  if (!result) {
    return <Navigate to="/student/dashboard" replace />;
  }

  // BCS logic usually deducts 0.5 per wrong answer
  const negativeMarks = (result.wrong * 0.5).toFixed(2);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-primary p-5 text-center text-white">
              <i className="fas fa-trophy fa-4x mb-3 text-warning"></i>
              <h2 className="fw-bold">Exam Results</h2>
              <p className="opacity-75">Great effort! Here is your performance breakdown.</p>
            </div>

            <div className="card-body p-4 p-md-5">
              <div className="row align-items-center">
                {/* Left: Big Score Display */}
                <div className="col-md-6 text-center border-end">
                  <div className="mb-4">
                    <h1 className="display-1 fw-bold text-primary mb-0">
                      {result.netScore}
                    </h1>
                    <span className="text-muted fw-bold">NET SCORE</span>
                  </div>
                  <div className="px-4 py-2 bg-light rounded-pill d-inline-block small fw-bold">
                    {result.correct} Correct • {result.wrong} Incorrect
                  </div>
                </div>

                {/* Right: Pie Chart */}
                <div className="col-md-6 d-flex justify-content-center">
                  <div style={{ width: '220px', height: '220px' }}>
                    <ResultPie 
                      correct={result.correct} 
                      wrong={result.wrong} 
                      skipped={result.skipped} 
                    />
                  </div>
                </div>
              </div>

              <hr className="my-5 opacity-25" />

              {/* Stats Grid */}
              <div className="row g-3 text-center">
                <div className="col-6 col-md-3">
                  <div className="p-3 border rounded-3 bg-success bg-opacity-10 border-success">
                    <h4 className="fw-bold text-success mb-0">+{result.correct}</h4>
                    <small className="text-muted">Correct</small>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 border rounded-3 bg-danger bg-opacity-10 border-danger">
                    <h4 className="fw-bold text-danger mb-0">-{negativeMarks}</h4>
                    <small className="text-muted">Penalty</small>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 border rounded-3 bg-secondary bg-opacity-10 border-secondary">
                    <h4 className="fw-bold text-secondary mb-0">{result.skipped}</h4>
                    <small className="text-muted">Skipped</small>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 border rounded-3 bg-info bg-opacity-10 border-info">
                    <h4 className="fw-bold text-info mb-0">{result.accuracy}%</h4>
                    <small className="text-muted">Accuracy</small>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-5">
                <Link to="/student/dashboard" className="btn btn-outline-primary px-4 py-2">
                  <i className="fas fa-home me-2"></i> Dashboard
                </Link>
                <Link 
                   to={`/student/review/${result.sessionId}`} 
                   className="btn btn-primary px-4 py-2 shadow-sm"
                >
                  <i className="fas fa-search me-2"></i> Review Answers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetail;