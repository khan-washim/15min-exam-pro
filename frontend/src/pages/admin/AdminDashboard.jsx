import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // আপনার সার্ভিস পাথ অনুযায়ী
import Loader from '../../components/ui/Loader';
import { 
  Users, 
  FileText, 
  GraduationCap, 
  Zap, 
  Plus, 
  UserPlus, 
  Download,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, questions: 0, totalExams: 0, activeExams: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // ব্যাকএন্ড কানেক্ট হলে নিচের লাইনটি আনকমেন্ট করুন
        // const { data } = await api.get('/admin/stats');
        // setStats(data);
        
        // স্যাম্পল ডাটা
        setStats({ users: 124, questions: 850, totalExams: 320, activeExams: 12 });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container-fluid py-4 px-lg-4">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h3 className="fw-bold mb-1">Admin Overview</h3>
          <p className="text-muted mb-0">Monitor your BCS Exam system performance in real-time.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-dark btn-sm rounded-pill px-3">
            <TrendingUp size={16} className="me-1" /> Analytics
          </button>
          <button className="btn btn-dark btn-sm rounded-pill px-3">
            <Clock size={16} className="me-1" /> Last 24h
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="row g-4 mb-5">
        <StatCard title="Total Users" value={stats.users} icon={<Users size={28} />} color="primary" />
        <StatCard title="Total Questions" value={stats.questions} icon={<FileText size={28} />} color="success" />
        <StatCard title="Total Exams" value={stats.totalExams} icon={<GraduationCap size={28} />} color="info" />
        <StatCard title="Active Now" value={stats.activeExams} icon={<Zap size={28} />} color="warning" />
      </div>

      <div className="row g-4">
        {/* Recent Activity Table */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
            <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Recent Exam Submissions</h5>
              <Link to="/admin/results" className="btn btn-link btn-sm text-decoration-none p-0">View All</Link>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4 py-3 text-muted small fw-bold">STUDENT</th>
                      <th className="text-muted small fw-bold">SUBJECT</th>
                      <th className="text-muted small fw-bold text-center">SCORE</th>
                      <th className="text-end px-4 text-muted small fw-bold">TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4">
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm bg-warning-subtle text-warning rounded-circle me-3 d-flex align-items-center justify-content-center fw-bold" style={{width: '32px', height: '32px'}}>R</div>
                          <span className="fw-medium">Rahat Khan</span>
                        </div>
                      </td>
                      <td>General Knowledge</td>
                      <td className="text-center">
                        <span className="badge rounded-pill bg-success-subtle text-success px-3">85%</span>
                      </td>
                      <td className="text-end px-4 text-muted small">2 mins ago</td>
                    </tr>
                    {/* স্যাম্পল ডাটা ২ */}
                    <tr>
                      <td className="px-4">
                        <div className="d-flex align-items-center">
                          <div className="avatar-sm bg-info-subtle text-info rounded-circle me-3 d-flex align-items-center justify-content-center fw-bold" style={{width: '32px', height: '32px'}}>S</div>
                          <span className="fw-medium">Sonia Akter</span>
                        </div>
                      </td>
                      <td>English Literature</td>
                      <td className="text-center">
                        <span className="badge rounded-pill bg-primary-subtle text-primary px-3">92%</span>
                      </td>
                      <td className="text-end px-4 text-muted small">15 mins ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm bg-dark text-white p-4 rounded-4 h-100">
            <h5 className="fw-bold mb-4">Quick Actions</h5>
            <div className="d-grid gap-3">
              <Link to="/admin/questions" className="btn btn-primary py-3 text-start px-3 rounded-3 d-flex align-items-center shadow-sm border-0">
                <Plus size={20} className="me-2" /> Add New Question
              </Link>
              <Link to="/admin/users" className="btn btn-outline-light py-3 text-start px-3 rounded-3 d-flex align-items-center border-secondary">
                <UserPlus size={20} className="me-2" /> Manage Users
              </Link>
              <button className="btn btn-outline-light py-3 text-start px-3 rounded-3 d-flex align-items-center border-secondary">
                <Download size={20} className="me-2" /> Export Reports
              </button>
            </div>
            
            <div className="mt-5 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <p className="small text-secondary mb-2">System Status</p>
              <div className="d-flex align-items-center">
                <div className="pulse-green me-2"></div>
                <span className="small text-success fw-bold">Server Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pulse-green {
          width: 10px;
          height: 10px;
          background-color: #28a745;
          border-radius: 50%;
          box-shadow: 0 0 0 rgba(40, 167, 69, 0.4);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(40, 167, 69, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
        }
      `}</style>
    </div>
  );
};

// Updated StatCard Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="col-md-6 col-lg-3">
    <div className="card border-0 shadow-sm h-100 rounded-4">
      <div className="card-body d-flex align-items-center p-4">
        <div className={`rounded-4 bg-${color} bg-opacity-10 p-3 me-3 text-${color}`}>
          {icon}
        </div>
        <div>
          <h6 className="text-muted small mb-1 text-uppercase fw-bold" style={{ letterSpacing: '0.8px' }}>{title}</h6>
          <h3 className="mb-0 fw-bold">{value.toLocaleString()}</h3>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;