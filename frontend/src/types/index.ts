export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UserProfile {
  id: number;
  user: User;
  avatar: string | null;
  status: string | null;
  last_active: string;
}

export interface Room {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  created_by: User;
  messages?: Message[];
}

export interface Message {
  id: number;
  room: number;
  user: User;
  content: string;
  timestamp: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface ChatState {
  rooms: Room[];
  currentRoom: Room | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export interface WebSocketMessage {
  message: string;
  username: string;
  room: string;
  timestamp: string;
} 