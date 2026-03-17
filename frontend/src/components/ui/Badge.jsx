import React from 'react';

const Badge = ({ children, color = 'bg-gray-100 text-gray-800' }) => (
  <span className={`badge ${color} px-2 py-1 rounded text-xs font-bold uppercase tracking-wide`}>
    {children}
  </span>
);

export default Badge;