import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickFill = (role) => {
    if (role === 'admin') setFormData({ email: 'admin@bcs.gov.bd', password: '123456' });
    else setFormData({ email: 'student@bcs.bd', password: '123456' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(formData.email, formData.password);
    
    if (result.success && result.user) {
      // ফিক্সড: সঠিক পাথ যা App.jsx এর সাথে মেলে
      const path = result.user.isAdmin ? '/admin' : '/dashboard';
      // navigate এ replace: true ব্যবহার করবেন না যাতে ব্যাক বাটন কাজ করে
      navigate(path); 
    } else {
      setError(result.error || 'Invalid credentials');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="card border-0 shadow-lg p-4" style={{ width: '400px' }}>
        <h3 className="fw-bold text-center mb-4">Login</h3>
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Email</label>
            <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Password</label>
            <input type="password" className="form-control" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
          </div>
          <button className="btn btn-primary w-100 py-2 fw-bold mb-3" type="submit">Login</button>
        </form>
        <div className="btn-group btn-group-sm w-100">
          <button className="btn btn-outline-secondary" onClick={() => handleQuickFill('admin')}>Admin</button>
          <button className="btn btn-outline-secondary" onClick={() => handleQuickFill('student')}>Student</button>
        </div>
      </div>
    </div>
  );
};

export default Login;