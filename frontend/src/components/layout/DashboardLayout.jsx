import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; 
import Sidebar from './Sidebar';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar সবার জন্য এক */}
      <Navbar />
      
      <div className="d-flex pt-5 mt-2"> {/* Navbar fixed থাকায় মার্জিন যোগ করা হয়েছে */}
        {/* ইউজার অ্যাডমিন হলে AdminSidebar, নাহলে সাধারণ Sidebar */}
        <aside className="sticky-top">
          {user?.isAdmin ? <AdminSidebar /> : <Sidebar />}
        </aside>
        
        {/* মেইন কন্টেন্ট এরিয়া যেখানে Outlet এর মাধ্যমে সব পেজ লোড হবে */}
        <main className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;