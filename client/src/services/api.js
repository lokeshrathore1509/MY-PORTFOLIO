import axios from 'axios';

// Smart API URL resolution:
// 1. If explicit env variable is provided (VITE_API_URL), use it.
// 2. If running on Vercel or any live domain, use the deployed Render backend.
// 3. Otherwise (local development), use local backend on port 5000.
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    return 'https://my-portfolio-bnvb.onrender.com/api';
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enables HTTP-only cookies
  timeout: 60000, // 60 seconds to accommodate Render free-tier cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach Bearer token if present
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for consistent error messaging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returned a clear validation/auth error message
    if (error.response?.data?.message) {
      return Promise.reject(new Error(error.response.data.message));
    }
    // If server is waking up from sleep or network error
    if (error.message === 'Network Error') {
      return Promise.reject(
        new Error(
          'Network Error: Unable to connect to the backend server. The free cloud server may be waking up (takes ~30s on Render) or the backend URL is unreachable.'
        )
      );
    }
    return Promise.reject(new Error(error.message || 'An unexpected error occurred.'));
  }
);

export const authAPI = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },
  logout: async () => {
    const res = await api.post('/auth/logout');
    return res.data;
  },
};

export const projectsAPI = {
  getAll: async (showAll = false) => {
    const res = await api.get(`/projects${showAll ? '?all=true' : ''}`);
    return res.data;
  },
  getOne: async (slugOrId) => {
    const res = await api.get(`/projects/${slugOrId}`);
    return res.data;
  },
  create: async (formData) => {
    const res = await api.post('/projects', formData, {
      headers: {
        'Content-Type': formData instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return res.data;
  },
  update: async (id, formData) => {
    const res = await api.put(`/projects/${id}`, formData, {
      headers: {
        'Content-Type': formData instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/projects/${id}`);
    return res.data;
  },
};

export const contactAPI = {
  submit: async (data) => {
    const res = await api.post('/contact', data);
    return res.data;
  },
  getMessages: async () => {
    const res = await api.get('/contact/messages');
    return res.data;
  },
  markRead: async (id) => {
    const res = await api.patch(`/contact/messages/${id}/read`);
    return res.data;
  },
  deleteMessage: async (id) => {
    const res = await api.delete(`/contact/messages/${id}`);
    return res.data;
  },
};

export const settingsAPI = {
  get: async () => {
    const res = await api.get('/settings');
    return res.data;
  },
  update: async (data) => {
    const res = await api.put('/settings', data);
    return res.data;
  },
};

export default api;
