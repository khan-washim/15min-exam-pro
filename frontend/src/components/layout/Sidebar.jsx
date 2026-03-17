import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Award, History, User } from 'lucide-react';

const Sidebar = () => {
  // App.jsx এর Student Routes অনুযায়ী পাথ আপডেট করা হয়েছে
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20}/> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Award size={20}/> },
    { name: 'My Results', path: '/dashboard/history', icon: <History size={20}/> }, // App.jsx এ path="history"
    { name: 'My Profile', path: '/dashboard/profile', icon: <User size={20}/> },  // App.jsx এ path="profile"
  ];

  return (
    <div className="bg-white border-end vh-100 sticky-top d-none d-lg-block shadow-sm" style={{ width: '250px' }}>
      <div className="p-4">
        <h6 className="text-uppercase text-muted fw-bold small mb-4 px-3" style={{ letterSpacing: '1px' }}>Menu</h6>
        <div className="nav flex-column gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => 
                `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${
                  isActive ? 'bg-dark text-white shadow-sm' : 'text-secondary hover-bg-light'
                }`
              }
            >
              {item.icon}
              <span className="fw-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;