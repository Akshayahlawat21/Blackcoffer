import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/data';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchInsights = async (params = {}) => {
  const response = await apiClient.get('/', { params });
  return response.data;
};

export const fetchFilters = async () => {
  const response = await apiClient.get('/filters');
  return response.data;
};

export const fetchStats = async () => {
  const response = await apiClient.get('/stats');
  return response.data;
};

export const fetchAnalytics = async () => {
  const response = await apiClient.get('/analytics');
  return response.data;
};

export default apiClient;
