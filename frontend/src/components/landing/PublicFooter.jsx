import React from 'react';
import { Link } from 'react-router-dom';

const PublicFooter = () => (
  <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
    <div className="container">
      <div className="row">
        {/* Brand Section */}
        <div className="col-md-4 mb-4">
          <h5 className="fw-bold mb-3 text-primary">BCS Exam System</h5>
          <p className="text-secondary small">
            Empowering students to achieve their dreams in the civil service through 
            structured practice and performance analytics.
          </p>
        </div>

        {/* Quick Links */}
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold mb-3">Quick Links</h6>
          <ul className="list-unstyled small">
            <li className="mb-2">
              <Link to="/" className="text-secondary text-decoration-none hover-white">Home</Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="text-secondary text-decoration-none hover-white">About</Link>
            </li>
            <li className="mb-2">
              <Link to="/syllabus" className="text-secondary text-decoration-none hover-white">Syllabus</Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="col-md-2 mb-4">
          <h6 className="fw-bold mb-3">Support</h6>
          <ul className="list-unstyled small">
            <li className="mb-2">
              <Link to="/faq" className="text-secondary text-decoration-none hover-white">FAQs</Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="text-secondary text-decoration-none hover-white">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Social / Contact Info */}
        <div className="col-md-4 mb-4">
          <h6 className="fw-bold mb-3">Follow Us</h6>
          <div className="d-flex gap-3">
            <a href="#" className="text-secondary fs-5"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-secondary fs-5"><i className="bi bi-twitter-x"></i></a>
            <a href="#" className="text-secondary fs-5"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>

      <hr className="border-secondary opacity-25" />
      
      <div className="text-center text-secondary small py-2">
        &copy; {new Date().getFullYear()} BCS Exam System. All rights reserved.
      </div>
    </div>

    {/* Inline hover effect */}
    <style dangerouslySetInnerHTML={{ __html: `
      .hover-white:hover {
        color: white !important;
        transition: color 0.2s ease-in-out;
      }
    `}} />
  </footer>
);

export default PublicFooter;