import axios from 'axios';

// Configuração base da API usando axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
    // Adiciona token de autenticação se disponível
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Trata casos de erro comuns
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redireciona para o login ou exibe um modal de autenticação
    }
    return Promise.reject(error);
  }
);

// Tipos da API
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

// Funções da API
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

