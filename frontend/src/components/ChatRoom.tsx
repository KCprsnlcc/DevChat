import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { messageService } from '../services/api';
import websocketService from '../services/websocket';
import { Message as MessageType, User, WebSocketMessage } from '../types';
import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  MessageInput,
  MessageForm,
  TextArea,
  Button,
  Message,
  MessageBubble,
  MessageMeta
} from '../styles/StyledComponents';
import { format } from 'date-fns';

interface ChatRoomProps {
  currentUser: User | null;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ currentUser }) => {
  const { roomName } = useParams<{ roomName: string }>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Track processed message IDs to prevent duplicates
  const processedMessageIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!roomName) return;
        
        // Get room ID from name
        const roomId = parseInt(roomName);
        if (isNaN(roomId)) {
          setError('Invalid room');
          setLoading(false);
          return;
        }
        
        const response = await messageService.getRoomMessages(roomId);
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, [roomName]);

  useEffect(() => {
    if (!roomName || !currentUser) return;

    const connectWebSocket = async () => {
      try {
        await websocketService.connect(roomName, currentUser.username);
        
        const unsubscribe = websocketService.onMessage((data: WebSocketMessage) => {
          // Create a unique ID for the message based on content and timestamp
          const messageId = `${data.username}-${data.message}-${data.timestamp}`;
          
          // Skip if we've already processed this message
          if (processedMessageIds.current.has(messageId)) {
            return;
          }
          
          // Add to processed set
          processedMessageIds.current.add(messageId);
          
          // Skip if message is from current user (we'll add it on send)
          if (data.username === currentUser.username) {
            return;
          }
          
          // Determine user ID - use -1 for other users since we don't know their real ID
          const userId = -1;
          
          const newMsg: MessageType = {
            id: Math.random(), // Temporary ID until we refresh
            room: parseInt(data.room),
            user: {
              id: userId,
              username: data.username,
              email: '',
              first_name: '',
              last_name: ''
            },
            content: data.message,
            timestamp: data.timestamp
          };
          
          setMessages(prev => [...prev, newMsg]);
        });
        
        return () => {
          unsubscribe();
          websocketService.disconnect();
        };
      } catch (err) {
        console.error('WebSocket connection error:', err);
        setError('Failed to connect to chat server');
      }
    };

    connectWebSocket();
  }, [roomName, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !roomName || !currentUser) return;
    
    // Create timestamp for the message
    const timestamp = new Date().toISOString();
    
    // Add message to local state immediately (optimistic UI update)
    const localMessage: MessageType = {
      id: Math.random(),
      room: parseInt(roomName),
      user: currentUser,
      content: newMessage,
      timestamp: timestamp
    };
    
    setMessages(prev => [...prev, localMessage]);
    
    // Send message via WebSocket
    websocketService.sendMessage(newMessage, currentUser.username, roomName);
    
    // Create a unique ID for this message to prevent duplication
    const messageId = `${currentUser.username}-${newMessage}-${timestamp}`;
    processedMessageIds.current.add(messageId);
    
    // Clear input
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    return format(new Date(timestamp), 'h:mm a');
  };

  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ChatContainer>
      <ChatHeader>
        <h2>Room: {roomName}</h2>
      </ChatHeader>
      
      <ChatMessages>
        {messages.map((message) => (
          <Message 
            key={message.id} 
            isCurrentUser={currentUser?.id === message.user.id}
          >
            <MessageBubble isCurrentUser={currentUser?.id === message.user.id}>
              {(!currentUser || (currentUser.id !== message.user.id)) && (
                <strong>{message.user.username}</strong>
              )}
              <div>{message.content}</div>
            </MessageBubble>
            <MessageMeta>
              {formatTime(message.timestamp)}
            </MessageMeta>
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      
      <MessageInput>
        <MessageForm onSubmit={handleSubmit}>
          <TextArea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            Send
          </Button>
        </MessageForm>
      </MessageInput>
    </ChatContainer>
  );
};

export default ChatRoom; 