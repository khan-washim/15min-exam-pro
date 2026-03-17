import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { Layout, PlayCircle, ChevronLeft, Layers } from 'lucide-react';
import Loader from '../../components/ui/Loader';

const SetSelection = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        setLoading(true);
        // ডাটাবেস থেকে ঐ সাবজেক্টের প্রশ্ন আনা
        const { data } = await api.get(`/questions/subject/${subjectId}`);
        
        // ইউনিক সেট নাম্বারগুলো ফিল্টার করা
        const uniqueSets = [...new Set(data.map(q => q.setNumber))].sort((a, b) => a - b);
        setSets(uniqueSets);
      } catch (err) {
        console.error("Sets load error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (subjectId) fetchSets();
  }, [subjectId]);

  if (loading) return <Loader fullPage />;

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Header Section */}
        <div className="d-flex align-items-center mb-4">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn btn-white shadow-sm rounded-circle p-2 me-3"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="fw-bold mb-0 text-capitalize">{subjectId} Sets</h2>
            <p className="text-muted mb-0">Choose a question set to begin your practice</p>
          </div>
        </div>

        {/* Sets Grid */}
        <div className="row g-4">
          {sets.length > 0 ? (
            sets.map((setNo) => (
              <div className="col-md-4 col-lg-3" key={setNo}>
                <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden position-relative">
                  <div className="card-body p-4 text-center">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-4 d-inline-flex p-3 mb-3">
                      <Layers size={32} />
                    </div>
                    <h4 className="fw-bold mb-1">Set {setNo}</h4>
                    <p className="text-muted small mb-4">Exam Mode • 15 Mins</p>
                    
                    <Link 
                      to={`/exam/${subjectId}/${setNo}`} 
                      className="btn btn-primary w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                    >
                      <PlayCircle size={18} /> Start Practice
                    </Link>
                  </div>
                  {/* Subtle decorative element */}
                  <div className="position-absolute top-0 end-0 p-3 opacity-10">
                    <h1 className="fw-black mb-0" style={{fontSize: '3rem'}}>{setNo}</h1>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="card border-0 shadow-sm p-5 rounded-4">
                <Layout size={48} className="mx-auto text-muted mb-3" />
                <h5>No question sets available for this subject yet.</h5>
                <button onClick={() => navigate('/dashboard')} className="btn btn-link">Go Back</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetSelection;