import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import PublicFooter from '../components/landing/PublicFooter';

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="landing-page">
      <Navbar />

      <div style={{ paddingTop: '76px' }}>
        <Hero />
        <Features />

        <section className="py-5 text-center bg-white text-dark">
          <div className="container">
            <h3 className="fw-bold mb-3">Ready to start your preparation?</h3>
            <p className="text-muted mb-4">Join thousands of students preparing for success.</p>
            <Link to="/register" className="btn btn-success rounded-pill px-5 shadow-sm">
              Create Free Account
            </Link>
          </div>
        </section>
      </div>

      <PublicFooter />
    </div>
  );
};

export default LandingPage;
