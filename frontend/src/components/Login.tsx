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

// GitHub logo SVG component
const GitHubLogo: React.FC = () => (
  <svg className="github-logo" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login(username, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userResponse = await authService.getCurrentUser();
      setLoading(false);
      navigate('/chat');
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.non_field_errors?.[0] || 'Invalid username or password');
    }
  };

  return (
    <FormContainer>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <GitHubLogo />
        <FormTitle>Sign in to DevChat</FormTitle>
      </div>
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
        <Button type="submit" disabled={loading} style={{ width: '100%', margin: '0' }}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          New to DevChat? <Link to="/register" style={{ color: '#58a6ff' }}>Create an account</Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default Login; 