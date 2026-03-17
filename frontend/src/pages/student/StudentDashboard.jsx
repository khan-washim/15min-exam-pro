import React from 'react';
import { BCS_SUBJECTS } from '../../utils/bcsConfig';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold">Welcome back, {user?.name || 'Student'}!</h2>
        <p className="text-muted">Choose a subject to start your 15-minute practice session.</p>
      </div>

      <div className="row g-4">
        {BCS_SUBJECTS.map((sub) => (
          <div className="col-md-6 col-lg-4" key={sub.id}>
            {/* সরাসরি ExamRoom-এ পাঠানোর জন্য পাথ আপডেট করা হয়েছে */}
            {/* Note: আপনার App.jsx এ রাউটটি 'exam/:subjectId' হওয়া ভালো */}
            <Link to={`/dashboard/exam/${sub.id}`} className="text-decoration-none">
              <Card className="h-100 border-0 shadow-sm border-start border-primary border-4 hover-lift transition">
                <div className="card-body p-4 text-center">
                  <div className="mb-3 p-3 rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className={`fas ${sub.icon || 'fa-book'} fa-lg text-primary`}></i>
                  </div>
                  <h4 className="fw-bold text-dark mb-1">{sub.nameEn}</h4>
                  <h6 className="text-muted mb-3 font-bengali">{sub.nameBn}</h6>
                  
                  <div className="mt-2 mb-3">
                     <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill">
                        20 Questions | 15 Mins
                     </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <span className="badge bg-light text-dark border">Marks: {sub.marks}</span>
                    <span className="text-primary small fw-bold">Start Now <i className="fas fa-play ms-1"></i></span>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;