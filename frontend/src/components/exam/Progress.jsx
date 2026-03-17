import React from 'react';

const Progress = ({ current = 0, total = 1 }) => {
  // Ensure we don't divide by zero and calculate percentage
  const percentage = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="progress-container mb-4">
      {/* Labeling for Accessibility and Clarity */}
      <div className="d-flex justify-content-between small text-muted mb-2">
        <span className="fw-bold text-dark">
          Question {current + 1} <span className="text-muted fw-normal">of {total}</span>
        </span>
        <span className="badge bg-light text-primary border">{Math.round(percentage)}% Complete</span>
      </div>

      {/* The Progress Bar */}
      <div 
        className="progress shadow-sm" 
        style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '10px' }}
      >
        <div 
          className="progress-bar progress-bar-striped progress-bar-animated bg-success" 
          role="progressbar"
          style={{ 
            width: `${percentage}%`, 
            transition: 'width 0.4s ease-in-out',
            borderRadius: '10px'
          }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default Progress;