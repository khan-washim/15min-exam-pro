import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUserInfo = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUserInfo && storedUserInfo !== "undefined" && token) {
          setUser(JSON.parse(storedUserInfo));
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (err) {
        console.error('Error checking auth:', err);
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login Function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const resData = response.data;

      if (resData && resData.token) {
        const { token, ...userData } = resData;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return { success: true, user: userData };
      }
      return { success: false, error: 'Server response structure error' };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, error: message };
    }
  };

  // Register Function (এটি আগে মিসিং ছিল)
  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const resData = response.data;

      // রেজিস্ট্রেশন সফল হলে যদি ব্যাকএন্ড সরাসরি টোকেন পাঠায়
      if (resData && resData.token) {
        const { token, ...userData } = resData;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return { success: true, user: userData };
      }
      
      // যদি শুধু মেসেজ পাঠায়, তবে ইউজারকে লগইন পেজে পাঠাতে হবে
      return { success: true, message: 'Registration successful, please login.' };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const logout = () => {
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);