import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd call api.post('/auth/forgot-password', { email })
    setSubmitted(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="card border-0 shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
        {submitted ? (
          /* Success Message State */
          <div className="text-center py-3">
            <div className="mb-4 text-success">
              <i className="fas fa-paper-plane fa-3x"></i>
            </div>
            <h4 className="fw-bold">Check your email</h4>
            <p className="text-muted mb-4">
              We've sent a password reset link to <br />
              <strong className="text-dark">{email}</strong>
            </p>
            <Link to="/login" className="btn btn-primary w-100 py-2">
              Back to Login
            </Link>
          </div>
        ) : (
          /* Initial Form State */
          <>
            <div className="text-center mb-4">
              <div className="mb-3 text-primary">
                <i className="fas fa-lock fa-3x"></i>
              </div>
              <h3 className="fw-bold">Forgot Password?</h3>
              <p className="text-muted">Enter your email to receive a reset link.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Email Address</label>
                <input 
                  type="email" 
                  className="form-control py-2" 
                  placeholder="name@example.com"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <button className="btn btn-primary w-100 py-2 mb-3" type="submit">
                Send Reset Link
              </button>
              <div className="text-center">
                <Link to="/login" className="text-decoration-none small">
                  <i className="fas fa-arrow-left me-1"></i> Back to Login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;