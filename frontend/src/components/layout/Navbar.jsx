import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, LayoutDashboard, User, Home, Menu, X, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsExpanded(false);
    navigate('/login');
  };

  const closeMenu = () => setIsExpanded(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm py-2">
      <div className="container">
       {/* Brand Logo */}
<Link className="navbar-brand d-flex align-items-center" to="/" onClick={closeMenu}>
  <GraduationCap className="me-2 text-success" size={28} />
  <span 
    className="fw-bold fs-4" 
    style={{ 
      letterSpacing: '0.5px',
      textTransform: 'uppercase' 
    }}
  >
    15 <span className="text-success">Minute</span> Exam
  </span>
</Link>
        {/* Mobile Toggler */}
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle navigation"
        >
          {isExpanded ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center gap-2 mt-3 mt-lg-0">
            {!user ? (
              <>
                <li className="nav-item w-100 text-center">
                  <Link className="nav-link px-3" to="/" onClick={closeMenu}>
                    <Home size={18} className="me-1 d-lg-none" /> Home
                  </Link>
                </li>
                <li className="nav-item w-100 text-center">
                  <Link className="nav-link px-3" to="/login" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
                <li className="nav-item w-100 text-center">
                  <Link 
                    className="btn btn-success btn-sm rounded-pill px-4 text-white w-100 w-lg-auto ms-lg-2" 
                    to="/register"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* User Welcome Message (Desktop only) */}
                <li className="nav-item d-none d-lg-block text-light me-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center text-white" style={{width: '32px', height: '32px', fontSize: '14px'}}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span>
                      <small className="text-secondary d-block" style={{fontSize: '10px', lineHeight: '1'}}>Welcome,</small>
                      <strong>{user.name}</strong>
                    </span>
                  </div>
                </li>

                {/* Dashboard Link */}
                <li className="nav-item w-100 text-center">
                  <Link 
                    className="btn btn-outline-success btn-sm rounded-pill px-4 w-100 w-lg-auto d-flex align-items-center justify-content-center gap-2" 
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={closeMenu}
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                </li>

                {/* Logout Button */}
                <li className="nav-item w-100 text-center mt-2 mt-lg-0">
                  <button 
                    className="btn btn-danger btn-sm rounded-pill px-4 w-100 w-lg-auto d-flex align-items-center justify-content-center gap-2" 
                    onClick={handleLogout}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Custom CSS for Mobile Smoothness */}
      <style>{`
        .navbar-collapse {
          transition: all 0.3s ease-in-out;
        }
        @media (max-width: 991px) {
          .navbar-nav {
            padding: 1rem 0;
          }
          .nav-item {
            padding: 0.5rem 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;