import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-content gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary text-white hover:bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30",
    secondary: "bg-white text-gray-700 border border border-gray-300 hover:bg-gray-50",
    success: "bg-emerald-500 text-white hover:bg-emerald-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border-2 border-primary text-primary hover:bg-indigo-50 text-indigo-600"
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;