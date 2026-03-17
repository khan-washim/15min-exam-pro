import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // আপনার ব্যাকএন্ড পোর্টের সাথে মিলিয়ে নিন
});

// টোকেন অটোমেটিক পাঠানোর জন্য ইন্টারসেপ্টর
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;