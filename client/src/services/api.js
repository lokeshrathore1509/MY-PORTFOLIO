import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enables HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for consistent error messaging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred.';
    return Promise.reject(new Error(message));
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
