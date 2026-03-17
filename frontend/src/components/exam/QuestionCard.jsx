import React from 'react';

const QuestionCard = ({ question, index, selectedOption, onSelect }) => {
  if (!question) return null;

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        {/* Question Header */}
        <div className="d-flex align-items-start mb-4">
          <span className="badge bg-primary rounded-pill px-3 py-2 me-3">
            Question {index + 1}
          </span>
          <h5 className="card-title mb-0 fw-bold text-dark lh-base">
            {question.text}
          </h5>
        </div>

        {/* Options List */}
        <div className="options-container">
          {question.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const label = String.fromCharCode(65 + i); // Converts 0, 1, 2 to A, B, C

            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(i)}
                className={`w-100 text-start border rounded p-3 mb-2 d-flex align-items-center transition-all btn ${
                  isSelected 
                    ? 'border-primary bg-primary bg-opacity-10 shadow-sm' 
                    : 'border-light bg-light bg-opacity-50 text-dark hover-shadow'
                }`}
                style={{ transition: 'all 0.2s ease' }}
              >
                {/* Letter Circle */}
                <div 
                  className={`rounded-circle border d-flex justify-content-center align-items-center me-3 fw-bold ${
                    isSelected 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-muted border-secondary border-opacity-25'
                  }`} 
                  style={{ width: '32px', height: '32px', flexShrink: 0, fontSize: '14px' }}
                >
                  {label}
                </div>

                {/* Option Text */}
                <span className={`fw-medium ${isSelected ? 'text-primary' : 'text-dark'}`}>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;