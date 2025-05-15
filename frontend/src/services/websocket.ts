import { WebSocketMessage } from '../types';

// Use environment variable with fallback to localhost for development
const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8000';

export class WebSocketService {
  private socket: WebSocket | null = null;
  private messageCallbacks: ((message: WebSocketMessage) => void)[] = [];

  connect(roomName: string, username: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(`${WS_URL}/ws/chat/${roomName}/`);

        this.socket.onopen = () => {
          console.log('WebSocket connection established');
          resolve();
        };

        this.socket.onmessage = (event) => {
          const data: WebSocketMessage = JSON.parse(event.data);
          this.messageCallbacks.forEach(callback => callback(data));
        };

        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

        this.socket.onclose = (event) => {
          console.log('WebSocket connection closed:', event.code, event.reason);
        };
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  sendMessage(message: string, username: string, room: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        message,
        username,
        room
      }));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  onMessage(callback: (message: WebSocketMessage) => void): () => void {
    this.messageCallbacks.push(callback);
    
    // Return a function to unsubscribe
    return () => {
      this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
    };
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }
}

// Create a singleton instance
const websocketService = new WebSocketService();
export default websocketService; 