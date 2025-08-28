import axios from 'axios';

// Base API configuration using axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error cases
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redirect to login or show auth modal
    }
    return Promise.reject(error);
  }
);

// API types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website?: string;
  company: {
    name: string;
  };
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// API functions
export const userAPI = {
  getAll: () => api.get<User[]>('/users'),
  getById: (id: number) => api.get<User>(`/users/${id}`),
  create: (user: Omit<User, 'id'>) => api.post<User>('/users', user),
  update: (id: number, user: Partial<User>) => api.put<User>(`/users/${id}`, user),
  delete: (id: number) => api.delete(`/users/${id}`),
};

export const postAPI = {
  getAll: () => api.get<Post[]>('/posts'),
  getById: (id: number) => api.get<Post>(`/posts/${id}`),
  getByUserId: (userId: number) => api.get<Post[]>(`/posts?userId=${userId}`),
  create: (post: Omit<Post, 'id'>) => api.post<Post>('/posts', post),
  update: (id: number, post: Partial<Post>) => api.put<Post>(`/posts/${id}`, post),
  delete: (id: number) => api.delete(`/posts/${id}`),
};