import React, { useState } from 'react';
import { User, Mail, Shield, Camera } from 'lucide-react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-0">
              {/* Profile Header Background */}
              <div className="bg-primary p-5 text-center position-relative" style={{ height: '150px', borderRadius: '1rem 1rem 0 0' }}>
                <div className="position-absolute start-50 translate-middle-x" style={{ bottom: '-50px' }}>
                  <div className="position-relative">
                    <div className="bg-light rounded-circle p-1 shadow">
                      <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center text-dark display-6 fw-bold" style={{ width: '100px', height: '100px' }}>
                        {user.name?.charAt(0)}
                      </div>
                    </div>
                    <button className="btn btn-sm btn-dark rounded-circle position-absolute bottom-0 end-0 p-2">
                      <Camera size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-5 mt-4">
                <div className="text-center mb-5">
                  <h3 className="fw-bold mb-1">{user.name}</h3>
                  <span className="badge bg-soft-primary text-primary px-3 rounded-pill text-uppercase">
                    {user.role || 'Student'}
                  </span>
                </div>

                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="p-3 border rounded-3 bg-light">
                      <small className="text-muted d-block mb-1"><Mail size={14} className="me-1"/> Email Address</small>
                      <span className="fw-bold">{user.email}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 border rounded-3 bg-light">
                      <small className="text-muted d-block mb-1"><User size={14} className="me-1"/> Username</small>
                      <span className="fw-bold">@{user.name?.replace(/\s+/g, '').toLowerCase()}</span>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-dark px-4 py-2 rounded-pill">Edit Profile</button>
                    <button className="btn btn-outline-danger px-4 py-2 rounded-pill ms-2">Change Password</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;