import React from 'react';

const Features = () => {
  const featuresList = [
    { icon: 'fa-book-open', title: '10 Core Subjects', desc: 'Comprehensive coverage of all syllabus topics.' },
    { icon: 'fa-chart-line', title: 'Performance Analytics', desc: 'Detailed charts showing your strong and weak areas.' },
    { icon: 'fa-clock', title: 'Timed Tests', desc: 'Simulate real exam conditions with countdown timers.' },
    { icon: 'fa-mobile-alt', title: 'Mobile Friendly', desc: 'Practice anywhere, anytime on any device.' }
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose Us?</h2>
          <p className="text-muted">Everything you need to crack the BCS exam.</p>
        </div>
        
        <div className="row g-4">
          {featuresList.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div 
                className="card h-100 border-0 shadow-sm p-4 text-center hover-lift"
                style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              >
                <div className="mb-3 text-primary">
                  {/* Fixed the backtick and template literal syntax here */}
                  <i className={`fas ${feature.icon} fa-3x mb-3`}></i>
                </div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted small mb-0">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internal style for the hover-lift effect if you aren't using an external CSS file */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
        }
      `}} />
    </section>
  );
};

export default Features;