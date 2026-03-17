import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import PerformanceChart from '../../components/charts/PerformanceChart';
import Loader from '../../components/ui/Loader';
import { Link } from 'react-router-dom';
import { BookOpen, Award, BarChart3, ChevronRight } from 'lucide-react';

const Results = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        // আপনার ব্যাকএন্ডে রাউটটি হলো /api/results/my-results
        const { data } = await api.get('/results/my-results');
        
        // এপিআই রেসপন্স ফরমেট অনুযায়ী ডাটা সেট করা (success: true, data: [])
        if (data.success) {
          setResults(data.data);
        }
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // একিউরেসি ক্যালকুলেশন ফাংশন
  const calculateAccuracy = (correct, total) => {
    if (!total || total === 0) return 0;
    return Math.round((correct / total) * 100);
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row mb-5 align-items-center">
        <div className="col-md-8">
          <h2 className="fw-bold mb-1">My Performance</h2>
          <p className="text-muted">Welcome back, {user?.name}! Track your BCS preparation progress here.</p>
        </div>
        <div className="col-md-4 text-md-end">
          <Link to="/dashboard" className="btn btn-primary rounded-pill px-4 shadow-sm">
            Take New Exam
          </Link>
        </div>
      </div>

      <div className="row g-4">
        {/* Analytics Section */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100 p-4 rounded-4">
            <div className="d-flex align-items-center mb-4">
              <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                <BarChart3 className="text-primary" size={24} />
              </div>
              <h5 className="fw-bold mb-0">Score Trends</h5>
            </div>
            
            {results.length > 0 ? (
              <div style={{ height: '300px' }}>
                <PerformanceChart data={results.slice(0, 10).reverse().map(r => ({ 
                  subject: r.subject, 
                  score: r.score 
                }))} />
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                <div className="mb-3 opacity-25">
                   <Award size={64} />
                </div>
                <p>No data yet. Complete an exam to visualize your progress!</p>
              </div>
            )}
          </div>
        </div>

        {/* Results History Table */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white border-0 py-3 ps-4">
              <h5 className="fw-bold mb-0">Exam History</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-muted small text-uppercase">
                  <tr>
                    <th className="ps-4 py-3">Subject & Set</th>
                    <th>Accuracy</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th className="text-end pe-4">Action</th>
                  </tr>
                </thead>
                <tbody className="border-top-0">
                  {results.length > 0 ? (
                    results.map(r => {
                      const accuracy = calculateAccuracy(r.correct, r.totalQuestions || (r.correct + r.wrong));
                      return (
                        <tr key={r._id}>
                          <td className="ps-4 py-3">
                            <div className="d-flex align-items-center">
                              <div className="bg-light p-2 rounded-2 me-3 d-none d-sm-block">
                                <BookOpen size={18} className="text-primary" />
                              </div>
                              <div>
                                <div className="fw-bold text-capitalize">{r.subject}</div>
                                <div className="text-muted small">Set {r.setNumber}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center" style={{ minWidth: '120px' }}>
                              <span className="me-2 fw-bold small">{accuracy}%</span>
                              <div className="progress flex-grow-1" style={{ height: '6px', borderRadius: '10px' }}>
                                <div 
                                  className={`progress-bar bg-${accuracy > 70 ? 'success' : accuracy > 40 ? 'warning' : 'danger'}`} 
                                  style={{ width: `${accuracy}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold">
                              {r.score}
                            </span>
                          </td>
                          <td className="text-muted small">
                            {new Date(r.createdAt).toLocaleDateString('en-GB')}
                          </td>
                          <td className="text-end pe-4">
                            <Link 
                              to={`/dashboard/history/${r._id}`} 
                              className="btn btn-sm btn-light border rounded-circle p-2 hover-primary"
                              title="View Details"
                            >
                              <ChevronRight size={18} />
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-5">
                        <p className="text-muted mb-0">No exam records found. Start your first practice test!</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;