import React from 'react';

const Card = ({ children, className = "", title, footer }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
    {title && <div className="mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
      <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
    </div>}
    <div className="card-body">{children}</div>
    {footer && <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
      {footer}
    </div>}
  </div>
);

export default Card;