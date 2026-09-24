import axios from 'axios';
import { useAuthStore } from '../store/use-auth-store';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor: attach bearer token from auth store
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor: unwrap Fastify standard envelope { status, message, data }
apiClient.interceptors.response.use(
  (response) => {
    // If backend returns { status: 'success', data: ... }
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data;
    }
    return response.data;
  },
  (error) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      // Token expired or invalid
      useAuthStore.getState().logout();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred while communicating with the backend API.';
    return Promise.reject(new Error(errorMsg));
  }
);
