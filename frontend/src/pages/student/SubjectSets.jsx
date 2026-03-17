import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../../components/ui/Loader';
import { PlayCircle, ArrowLeft, Info } from 'lucide-react';

const SubjectSets = () => {
  const { subjectId } = useParams(); // URL থেকে আসবে 'bangla' বা 'english'
  const navigate = useNavigate();
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        setLoading(true);
        console.log("Fetching sets for:", subjectId);

        // এপিআই কল
        const { data } = await api.get(`/questions/subject/${subjectId}`);
        
        console.log("Received Data:", data);

        if (Array.isArray(data)) {
          // ইউনিক সেট নাম্বার বের করা এবং ছোট থেকে বড় ক্রমানুসারে সাজানো
          const uniqueSets = [...new Set(data.map(q => q.setNumber))].sort((a, b) => a - b);
          setSets(uniqueSets);
        }
      } catch (err) {
        console.error("Sets loading error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (subjectId) fetchSets();
  }, [subjectId]);

  if (loading) return <Loader fullPage />;

  return (
    <div className="container py-4">
      <button 
        className="btn btn-link text-dark text-decoration-none mb-4 p-0 d-flex align-items-center" 
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft size={18} className="me-2"/> Back to Dashboard
      </button>

      <div className="mb-4 text-center text-md-start">
        <h2 className="fw-bold text-capitalize">{subjectId} Practice Sets</h2>
        <p className="text-muted">Select a set to start your 15-minute mock test.</p>
      </div>

      <div className="row g-4">
        {sets.length > 0 ? (
          sets.map(setNo => (
            <div className="col-md-4 col-lg-3" key={setNo}>
              <div 
                className="card border-0 shadow-sm rounded-4 p-4 text-center hover-lift transition h-100"
                onClick={() => navigate(`/dashboard/exam/${subjectId}/${setNo}`)}
                style={{ cursor: 'pointer', borderTop: '4px solid #0d6efd' }}
              >
                <div className="h1 fw-bold text-primary mb-1">{setNo}</div>
                <div className="text-muted small mb-4 fw-medium">QUESTION SET</div>
                <button className="btn btn-primary w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center">
                   <PlayCircle size={16} className="me-2"/> Start Practice
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="bg-white p-5 rounded-4 shadow-sm d-inline-block">
              <Info size={48} className="text-warning mb-3" />
              <h5 className="text-dark fw-bold">No Sets Found!</h5>
              <p className="text-muted mb-0">এই সাবজেক্টের জন্য কোনো প্রশ্ন সেট ডাটাবেজে পাওয়া যায়নি।</p>
              <small className="text-secondary">(Check if subject name matches database Case: 'Bangla' vs 'bangla')</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectSets;