import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, Users, Settings } from 'lucide-react';

const AdminSidebar = () => {
  // App.jsx এর Routes অনুযায়ী পাথগুলো আপডেট করা হয়েছে
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20}/> }, // index route
    { name: 'Questions', path: '/admin/questions', icon: <FileText size={20}/> },
    { name: 'Users List', path: '/admin/users', icon: <Users size={20}/> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20}/> },
  ];

  return (
    <div className="bg-white border-end vh-100 sticky-top d-none d-lg-block shadow-sm" style={{ width: '260px' }}>
      <div className="p-4">
        <h6 className="text-uppercase text-muted fw-bold small mb-4 px-3" style={{ letterSpacing: '1px' }}>Admin Panel</h6>
        <div className="nav flex-column gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'} // শুধু Dashboard এর জন্য exact match
              className={({ isActive }) => 
                `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${
                  isActive ? 'bg-primary text-white shadow-sm' : 'text-dark hover-bg-light'
                }`
              }
            >
              {item.icon}
              <span className="fw-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <style>{`
        .hover-bg-light:hover { background-color: #f8f9fa; color: #0d6efd !important; }
        .transition-all { transition: all 0.2s ease-in-out; }
      `}</style>
    </div>
  );
};

export default AdminSidebar;