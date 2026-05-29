import axios from 'axios';

console.log('[DEBUG] Raw VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('[DEBUG] Raw VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);

const sanitizeApiUrl = (url: string | undefined): string => {
  if (!url) return 'http://localhost:5000/api';
  let cleanUrl = url.trim().replace(/\/+$/, '');
  if (!cleanUrl.endsWith('/api')) {
    cleanUrl += '/api';
  }
  return cleanUrl;
};

export const API_BASE_URL = sanitizeApiUrl(
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL
);

console.log('[DEBUG] Sanitized API_BASE_URL:', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('mockmate_token') ||
      sessionStorage.getItem('mockmate_token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
