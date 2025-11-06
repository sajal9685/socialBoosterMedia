import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskAPI = {
  getAll: () => api.get('/tasks/'),
  getOne: (id) => api.get(`/tasks/${id}/`),
  create: (data) => api.post('/tasks/', data),
  update: (id, data) => api.put(`/tasks/${id}/`, data),
  delete: (id) => api.delete(`/tasks/${id}/`),
  getStatistics: () => api.get('/tasks/statistics/'),
  getWeather: (lat, lon) => api.get('/tasks/weather/', { params: { latitude: lat, longitude: lon } }),
};

export default api;
