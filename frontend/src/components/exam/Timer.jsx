import React from 'react';

const Timer = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`alert d-flex justify-content-between align-items-center mb-4 ${timeLeft < 60 ? 'alert-danger' : 'alert-dark'}`}>
      <span className="fw-bold"><i className="far fa-clock me-2"></i>Time Remaining</span>
      <span className="fs-4 font-monospace">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
};

export default Timer;