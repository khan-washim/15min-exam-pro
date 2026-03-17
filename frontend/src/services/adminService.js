import api from './api';

export const getStats = () => api.get('/admin/stats');
export const createQuestion = (data) => api.post('/admin/questions', data);
export const getAllUsers = () => api.get('/admin/users');

export const uploadQuestions = async (formData) => api.post('/questions/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});