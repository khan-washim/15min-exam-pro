import React from 'react';

const Loader = ({ size = 'lg', color = 'primary', fullPage = false }) => {
  // Determine dimensions based on size prop
  const dimensions = {
    sm: { width: '1.5rem', height: '1.5rem', borderWidth: '0.2em' },
    md: { width: '3rem', height: '3rem', borderWidth: '0.25em' },
    lg: { width: '5rem', height: '5rem', borderWidth: '0.35em' }
  };

  const selectedSize = dimensions[size] || dimensions.md;

  const loaderContent = (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div 
        className={`spinner-border text-${color}`} 
        role="status" 
        style={selectedSize}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {fullPage && <p className="mt-3 fw-bold text-secondary text-uppercase tracking-wider">Loading BCS Pro...</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div 
        className="d-flex align-items-center justify-content-center bg-white" 
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999 }}
      >
        {loaderContent}
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center my-5 w-100">
      {loaderContent}
    </div>
  );
};

export default Loader;