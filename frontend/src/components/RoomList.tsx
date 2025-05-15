import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { roomService, authService } from '../services/api';
import { Room, User } from '../types';
import Loader from './Loader';
import {
  Sidebar,
  RoomList as StyledRoomList,
  RoomItem,
  UserInfo,
  Avatar,
  Username,
  Status,
  Button,
  // FormContainer,
  // FormTitle,
  FormGroup,
  Label,
  Input,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton
} from '../styles/StyledComponents';

interface RoomListProps {
  currentUser: User | null;
}

const RoomList: React.FC<RoomListProps> = ({ currentUser }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDescription, setNewRoomDescription] = useState('');
  const navigate = useNavigate();
  const { roomName } = useParams<{ roomName: string }>();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await roomService.getAllRooms();
        setRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load rooms');
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomClick = (roomId: number) => {
    navigate(`/chat/${roomId}`);
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRoomName.trim()) return;
    
    try {
      const response = await roomService.createRoom({
        name: newRoomName,
        description: newRoomDescription || undefined
      });
      
      setRooms([...rooms, response.data]);
      setShowModal(false);
      setNewRoomName('');
      setNewRoomDescription('');
      
      // Navigate to the new room
      navigate(`/chat/${response.data.id}`);
    } catch (err) {
      console.error('Failed to create room:', err);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <Sidebar>
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader />
        </div>
      </Sidebar>
    );
  }
  
  if (error) return <div>{error}</div>;

  return (
    <>
      <Sidebar>
        <div style={{ 
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #30363d'
        }}>
          <h2 style={{ margin: 0 }}>Chat Rooms</h2>
        </div>
        
        <Button 
          style={{ margin: '15px 20px' }}
          onClick={() => setShowModal(true)}
        >
          Create Room
        </Button>
        
        <StyledRoomList>
          {rooms.map((room) => (
            <RoomItem
              key={room.id}
              isActive={roomName === room.id.toString()}
              onClick={() => handleRoomClick(room.id)}
            >
              <h3 style={{ margin: '0 0 5px' }}>{room.name}</h3>
              {room.description && <p style={{ margin: 0, fontSize: '14px' }}>{room.description}</p>}
            </RoomItem>
          ))}
          
          {rooms.length === 0 && (
            <div style={{ padding: '15px 20px', color: 'rgba(255, 255, 255, 0.7)' }}>
              No rooms available. Create one to start chatting!
            </div>
          )}
        </StyledRoomList>
        
        {currentUser && (
          <UserInfo>
            <Avatar>{currentUser.username.charAt(0).toUpperCase()}</Avatar>
            <div style={{ flex: 1 }}>
              <Username>{currentUser.username}</Username>
              <Status>Online</Status>
            </div>
            <Button 
              onClick={handleLogout}
              style={{ 
                backgroundColor: 'transparent',
                border: '1px solid #30363d',
                padding: '5px 10px',
                fontSize: '12px',
                margin: '0'
              }}
            >
              Sign out
            </Button>
          </UserInfo>
        )}
      </Sidebar>
      
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Create New Room</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
            </ModalHeader>
            
            <form onSubmit={handleCreateRoom}>
              <FormGroup>
                <Label htmlFor="roomName">Room Name</Label>
                <Input
                  id="roomName"
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="roomDescription">Description (Optional)</Label>
                <Input
                  id="roomDescription"
                  type="text"
                  value={newRoomDescription}
                  onChange={(e) => setNewRoomDescription(e.target.value)}
                />
              </FormGroup>
              
              <Button type="submit" disabled={!newRoomName.trim()} style={{ width: '100%', margin: '10px 0 0' }}>
                Create
              </Button>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default RoomList; 