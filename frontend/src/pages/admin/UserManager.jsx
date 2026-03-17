import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Loader from '../../components/ui/Loader'; // Using the Loader we built earlier

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Uncomment when API is ready
        // const { data } = await api.get('/admin/users');
        // setUsers(data);

        // Mock data for development
        const mockUsers = [
          { id: 1, name: "Admin User", email: "admin@bcs.gov.bd", role: "admin", createdAt: new Date() },
          { id: 2, name: "Student User", email: "student@bcs.bd", role: "student", createdAt: new Date() },
          { id: 3, name: "Test User", email: "test@bcs.bd", role: "student", createdAt: new Date() },
        ];
        setUsers(mockUsers);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Logic: await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">User Management</h2>
          <p className="text-muted">View and manage student and administrator accounts.</p>
        </div>
        <button className="btn btn-primary">
          <i className="fas fa-user-plus me-2"></i> Add Admin
        </button>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm me-3 bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
                        <i className="fas fa-user text-secondary"></i>
                      </div>
                      <span className="fw-medium">{u.name}</span>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge rounded-pill ${
                      u.role === 'admin' ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'
                    } px-3`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="text-end pe-4">
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => handleDelete(u.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManager;