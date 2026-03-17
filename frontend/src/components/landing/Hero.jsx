import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section d-flex align-items-center" style={{
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      minHeight: '90vh', // মোবাইলে একটু বেশি হাইট দিলে দেখতে ভালো লাগে
      color: 'white', 
      position: 'relative', 
      overflow: 'hidden',
      padding: '60px 0' // টপ ও বটম প্যাডিং রেসপনসিভনেস বাড়ায়
    }}>
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center flex-column-reverse flex-lg-row">
          
          {/* Left Side: Content */}
          <div className="col-lg-6 text-center text-lg-start mt-5 mt-lg-0">
            <h1 className="display-4 fw-bold mb-3 responsive-title">
              Master the <br />
              <span style={{ color: '#4db6ac' }}>BCS Preliminary</span>
            </h1>
            <p className="lead mb-4 text-light opacity-75 px-3 px-lg-0">
              Comprehensive preparation for all 10 subjects. 
              Your gateway to a bright career starts here.
            </p>
            
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start px-4 px-lg-0">
              <Link to="/register" className="btn btn-success btn-lg rounded-pill px-5 shadow-lg w-sm-auto">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg rounded-pill px-5 w-sm-auto">
                Login
              </Link>
            </div>
          </div>
          
          {/* Right Side: Image (Mobile-এ ও দেখা যাবে এখন) */}
          <div className="col-lg-6 text-center">
            <div className="hero-img-wrapper">
              <img 
                src="/images/bcs.png" 
                alt="BCS Prep" 
                className="img-fluid hero-image" 
                style={{ 
                  maxHeight: '400px', 
                  filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.4))'
                }} 
              />
            </div>
          </div>

        </div>
      </div>

      {/* Responsive Fixes & Animation */}
      <style>{`
        .hero-image {
          animation: float 5s ease-in-out infinite;
          width: 80%; /* মোবাইলে ইমেজ সাইজ কিছুটা ছোট রাখার জন্য */
        }

        @media (min-width: 992px) {
          .hero-image {
            width: 100%;
          }
          .responsive-title {
            font-size: 4rem;
          }
        }

        @media (max-width: 576px) {
          .responsive-title {
            font-size: 2.2rem;
          }
          .hero-section {
            min-height: 100vh;
            padding-top: 80px;
          }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;