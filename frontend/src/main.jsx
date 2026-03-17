import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// Global styles (Tailwind, CSS Modules, or standard CSS)
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

/**
 * The Root of the Application
 * 1. StrictMode helps identify potential problems in the application during development.
 * 2. We render the <App /> component which contains our Router and AuthProvider.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);