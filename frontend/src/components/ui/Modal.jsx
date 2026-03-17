import React from 'react';
import Button from './Button';

const Modal = ({ show, handleClose, title, children, onConfirm }) => {
  if (!show) return null;

  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1" 
      role="dialog" 
      aria-labelledby="modal-title"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          {title && (
            <div className="modal-header border-bottom-0 pt-4 px-4">
              <h5 className="modal-title fw-bold" id="modal-title">{title}</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
          )}
          
          <div className="modal-body px-4 py-3">
            {children}
          </div>

          <div className="modal-footer border-top-0 pb-4 px-4">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            {onConfirm && (
              <Button onClick={onConfirm}>
                Confirm
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;