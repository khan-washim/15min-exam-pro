import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth(); // নিশ্চিত করুন AuthContext এ register ফাংশন আছে
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      setLoading(true);
      const result = await register(formData.name, formData.email, formData.password);
      
      if (result.success) {
        toast.success("Registration successful!");
        navigate('/dashboard'); // রেজিস্ট্রেশনের পর সরাসরি ড্যাশবোর্ডে পাঠাবে
      } else {
        toast.error(result.error || "Registration failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="card border-0 shadow-lg p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <div className="bg-success bg-opacity-10 d-inline-block p-3 rounded-circle mb-3">
             <i className="fas fa-user-plus fa-2x text-success"></i>
          </div>
          <h3 className="fw-bold">Create Account</h3>
          <p className="text-muted small">Join thousands of students preparing for the BCS exam.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Washim"
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="washim@gmail.com"
              value={formData.email} 
              onChange={e => setFormData({ ...formData, email: e.target.value })} 
              required 
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label small fw-bold">Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={formData.password} 
                onChange={e => setFormData({ ...formData, password: e.target.value })} 
                required 
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label small fw-bold">Confirm</label>
              <input 
                type="password" 
                className="form-control" 
                value={formData.confirmPassword} 
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} 
                required 
              />
            </div>
          </div>

          <button 
            className="btn btn-success w-100 py-2 fw-bold shadow-sm" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center small text-muted mt-4 mb-0">
          Already have an account? <Link to="/login" className="fw-bold text-decoration-none text-success">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;