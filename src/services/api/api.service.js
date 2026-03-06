import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4040/api',
  withCredentials: true,
});

// src/services/api/api.service.js
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 1. If it's a 401 AND it's NOT the refresh request itself
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
      if (isRefreshing) return Promise.reject(error);
      
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post('/auth/refresh');
        isRefreshing = false;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;