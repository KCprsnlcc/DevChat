import styled from 'styled-components';

// Colors - GitHub Dark Theme
export const colors = {
  primary: '#ffffff',
  secondary: '#f0f6fc',
  accent: '#f0f6fc',
  background: '#0d1117',
  darkBackground: '#161b22',
  text: '#c9d1d9',
  lightText: '#8b949e',
  white: '#ffffff',
  border: '#30363d',
  error: '#f85149',
  success: '#3fb950',
  warning: '#d29922',
  green: '#238636',
  greenHover: '#2ea043',
  link: '#58a6ff'
};

// Layout Components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${colors.background};
  color: ${colors.text};
`;

interface SidebarProps {
  isOpen?: boolean;
}

export const Sidebar = styled.div<SidebarProps>`
  width: 280px;
  background-color: ${colors.darkBackground};
  border-right: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    position: absolute;
    z-index: 10;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
  }

  /* GitHub-style scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.darkBackground};
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.border};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.primary};
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// Project Name Component
export const ProjectName = styled.div`
  padding: 15px 20px;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
  background-color: ${colors.darkBackground};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: ${colors.primary};
  }
`;

// Chat Components
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${colors.background};
`;

export const ChatHeader = styled.div`
  padding: 15px 20px;
  background-color: ${colors.darkBackground};
  border-bottom: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.text};
  
  h2 {
    color: ${colors.white};
    margin: 0;
  }
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: ${colors.background};
`;

export const MessageInput = styled.div`
  padding: 15px 20px;
  background-color: ${colors.darkBackground};
  border-top: 1px solid ${colors.border};
  display: flex;
  align-items: center;
`;

export const MessageForm = styled.form`
  display: flex;
  width: 100%;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid ${colors.border};
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border 0.3s ease;
  background-color: ${colors.darkBackground};
  color: ${colors.text};

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.3);
  }
`;

export const TextArea = styled.textarea`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid ${colors.border};
  border-radius: 6px;
  font-size: 16px;
  resize: none;
  height: 50px;
  outline: none;
  transition: border 0.3s ease;
  background-color: ${colors.darkBackground};
  color: ${colors.text};

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.3);
  }
`;

export const Button = styled.button`
  background-color: ${colors.green};
  color: white;
  border: 1px solid rgba(240, 246, 252, 0.1);
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-left: 10px;

  &:hover {
    background-color: ${colors.greenHover};
  }

  &:disabled {
    background-color: ${colors.border};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface MessageProps {
  isCurrentUser?: boolean;
}

export const Message = styled.div<MessageProps>`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isCurrentUser ? 'flex-end' : 'flex-start'};
`;

export const MessageBubble = styled.div<MessageProps>`
  background-color: ${props => props.isCurrentUser ? '#238636' : colors.darkBackground};
  color: ${props => props.isCurrentUser ? colors.white : colors.text};
  padding: 12px 16px;
  border-radius: 6px;
  max-width: 70%;
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.isCurrentUser ? 'rgba(240, 246, 252, 0.1)' : colors.border};
  
  strong {
    display: block;
    margin-bottom: 5px;
    color: ${props => props.isCurrentUser ? 'rgba(255, 255, 255, 0.9)' : colors.accent};
    font-weight: 600;
  }
`;

export const MessageMeta = styled.div`
  font-size: 12px;
  color: ${colors.lightText};
  margin-top: 5px;
`;

export const RoomList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

interface RoomItemProps {
  isActive?: boolean;
}

export const RoomItem = styled.div<RoomItemProps>`
  padding: 15px 20px;
  border-bottom: 1px solid ${colors.border};
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${props => props.isActive ? 'rgba(88, 166, 255, 0.1)' : 'transparent'};

  &:hover {
    background-color: rgba(88, 166, 255, 0.1);
  }
`;

export const UserInfo = styled.div`
  padding: 15px 20px;
  border-top: 1px solid ${colors.border};
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${colors.accent};
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${colors.white};
`;

export const Username = styled.div`
  font-weight: bold;
  color: ${colors.text};
`;

export const Status = styled.div`
  font-size: 12px;
  color: ${colors.lightText};
`;

// Form Components
export const FormContainer = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background-color: ${colors.darkBackground};
  border-radius: 6px;
  border: 1px solid ${colors.border};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: ${colors.text};
`;

export const FormTitle = styled.h2`
  margin-bottom: 20px;
  color: ${colors.white};
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: ${colors.text};
`;

export const ErrorMessage = styled.div`
  color: ${colors.error};
  margin-top: 5px;
  font-size: 14px;
`;

export const SuccessMessage = styled.div`
  color: ${colors.success};
  font-size: 14px;
  margin-top: 5px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 16px;
  border: 1px solid ${colors.border};
  border-radius: 6px;
  background-color: ${colors.background};
  color: ${colors.text};
  font-size: 14px;
  
  &:focus {
    border-color: ${colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.3);
  }
`;

// Modal Components
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${colors.darkBackground};
  border-radius: 6px;
  border: 1px solid ${colors.border};
  padding: 24px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  color: ${colors.white};
  font-size: 16px;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${colors.lightText};
  
  &:hover {
    color: ${colors.text};
  }
`;