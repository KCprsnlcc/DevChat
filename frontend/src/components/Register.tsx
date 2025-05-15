import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import {
  FormContainer,
  FormTitle,
  FormGroup,
  Label,
  FormInput,
  Button,
  ErrorMessage
} from '../styles/StyledComponents';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      await authService.register(username, password);
      // Auto-login after successful registration
      await authService.login(username, password);
      setLoading(false);
      navigate('/chat');
    } catch (err: any) {
      setLoading(false);
      if (err.response?.data) {
        // Format Django REST Framework error responses
        const errors = err.response.data;
        const errorMessages = [];
        
        for (const field in errors) {
          if (Array.isArray(errors[field])) {
            errorMessages.push(`${field}: ${errors[field].join(' ')}`);
          }
        }
        
        setError(errorMessages.join('\n') || 'Registration failed');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <FormContainer>
      <FormTitle>Create your account</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <FormInput
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <FormInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <FormInput
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit" disabled={loading} style={{ width: '100%', margin: '0' }}>
          {loading ? 'Signing up...' : 'Sign up'}
        </Button>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: '#58a6ff' }}>Sign in</Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default Register; 