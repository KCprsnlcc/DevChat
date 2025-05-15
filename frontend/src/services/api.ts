import axios from 'axios';

// Use environment variable with fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post('/api-token-auth/', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  register: async (username: string, password: string) => {
    const response = await api.post('/api/register/', { username, password });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  getCurrentUser: async () => {
    return api.get('/api/current-user/');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// Room services
export const roomService = {
  getAllRooms: async () => {
    return api.get('/api/rooms/');
  },
  getRoom: async (id: number) => {
    return api.get(`/api/rooms/${id}/`);
  },
  createRoom: async (data: { name: string; description?: string }) => {
    return api.post('/api/rooms/', data);
  },
};

// Message services
export const messageService = {
  getRoomMessages: async (roomId: number) => {
    return api.get(`/api/room/${roomId}/messages/`);
  },
  sendMessage: async (data: { room: number; content: string }) => {
    return api.post('/api/messages/', data);
  },
};

// User services
export const userService = {
  getAllUsers: async () => {
    return api.get('/api/users/');
  },
  getUserProfile: async () => {
    return api.get('/api/profiles/');
  },
  updateUserProfile: async (data: { avatar?: string; status?: string }) => {
    return api.patch('/api/profiles/', data);
  },
};

export default api; 