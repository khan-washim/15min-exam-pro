import React from 'react';

const OptionItem = ({ label, text, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
      className={`d-flex align-items-center p-3 mb-2 border rounded ${
        isSelected 
          ? 'border-primary bg-primary text-white shadow-sm' 
          : 'border-secondary bg-white text-dark border-opacity-25'
      }`}
    >
      {/* Circle Icon for Label (A, B, C, D) */}
      <div 
        className={`rounded-circle border d-flex justify-content-center align-items-center me-3 fw-bold ${
          isSelected 
            ? 'bg-white text-primary border-white' 
            : 'bg-light text-muted border-secondary'
        }`} 
        style={{ width: '35px', height: '35px', flexShrink: 0 }}
      >
        {label}
      </div>

      {/* Option Text */}
      <span className={isSelected ? 'fw-bold' : 'fw-medium'}>
        {text}
      </span>
    </div>
  );
};

export default OptionItem;