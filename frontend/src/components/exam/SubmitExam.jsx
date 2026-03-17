import React from 'react';
import Button from './ui/Button';

const SubmitExam = ({ onSubmit, onCancel }) => {
  return (
    <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body text-center p-5">
        {/* Warning Icon/Illustration Placeholder */}
        <div className="mb-4 text-warning">
          <i className="bi bi-exclamation-circle" style={{ fontSize: '3rem' }}></i>
        </div>

        <h3 className="fw-bold text-dark">Ready to finish?</h3>
        <p className="text-muted mb-4">
          Please review your answers carefully. Once submitted, you will not be 
          able to modify your responses for this attempt.
        </p>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <Button 
            variant="secondary" 
            onClick={onCancel}
            className="px-4 py-2"
          >
            Back to Review
          </Button>
          
          <Button 
            variant="danger" 
            onClick={onSubmit}
            className="px-4 py-2"
          >
            Yes, Submit Exam
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitExam;