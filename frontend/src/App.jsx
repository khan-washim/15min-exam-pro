import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// --- Components & Layouts ---
import DashboardLayout from './components/layout/DashboardLayout';
import Loader from './components/ui/Loader';

// --- Public Pages ---
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// --- Admin Pages ---
import AdminDashboard from './pages/admin/AdminDashboard';
import QuestionManager from './pages/admin/QuestionManager';
import UserManager from './pages/admin/UserManager';

// --- Student Pages ---
import StudentDashboard from './pages/student/StudentDashboard';
import Results from './pages/student/Results';
import Profile from './pages/student/Profile';
// SubjectSets amader ekhon dorkar nei jodi direct exam start hoy
import ExamRoom from './pages/student/ExamRoom';

/**
 * ProtectedRoute: ইউজার লগইন আছে কি না এবং সঠিক রোল (Admin/Student) আছে কি না তা চেক করে।
 */
const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullPage />;

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && !user.isAdmin) return <Navigate to="/dashboard" replace />;
  
  if (!adminOnly && user.isAdmin) return <Navigate to="/admin" replace />;

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- Admin Routes (Nested under /admin) --- */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} /> 
            <Route path="questions" element={<QuestionManager />} /> 
            <Route path="users" element={<UserManager />} /> 
            <Route path="settings" element={<div>Admin Settings Coming Soon...</div>} />
          </Route>

          {/* --- Student Routes (Nested under /dashboard) --- */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute adminOnly={false}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} /> 
            <Route path="history" element={<Results />} /> 
            <Route path="profile" element={<Profile />} /> 
            
            {/* পরিবর্তন: সরাসরি ExamRoom এ যাওয়ার জন্য রুট আপডেট করা হয়েছে। 
              এখন সাবজেক্টে ক্লিক করলেই র্যান্ডম ২০টি প্রশ্ন আসবে। 
            */}
            <Route path="exam/:subjectId" element={<ExamRoom />} />
            
            {/* যদি আপনি পুরনো 'Set' সিস্টেম রাখতে চান তবে নিচেরটি রাখতে পারেন, 
              নয়তো এটি রিমুভ করে দিতে পারেন। 
            */}
            {/* <Route path="subject/:subjectId" element={<SubjectSets />} /> */}
          </Route>

          {/* --- Fallback Route --- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;