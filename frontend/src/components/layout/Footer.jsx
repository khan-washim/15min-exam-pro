import React from 'react';

const Footer = () => (
  <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
    <div className="container">
      <div className="row">
        <div className="col-md-4 mb-4">
          <h5 className="fw-bold mb-3">BCS Exam System</h5>
          <p className="text-secondary small">Empowering students to achieve their dreams in the civil service.</p>
        </div>
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold mb-3">Quick Links</h6>
          <ul className="list-unstyled small">
            <li className="mb-2"><a href="#" className="text-secondary text-decoration-none">About</a></li>
            <li className="mb-2"><a href="#" className="text-secondary text-decoration-none">Syllabus</a></li>
          </ul>
        </div>
      </div>
      <hr className="border-secondary" />
      <div className="text-center text-secondary small">
        &copy; {new Date().getFullYear()} BCS Exam System. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;