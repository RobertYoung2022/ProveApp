import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Text,
  Stack,
} from '@mantine/core';
import { useAuth } from '../../lib/auth';

export function AuthForm() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await (mode === 'signin' ? signIn : signUp)(
        email,
        password
      );

      if (authError) {
        setError(authError.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" order={2}>
        {mode === 'signin' ? 'Welcome back!' : 'Create an account'}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {mode === 'signin' ? (
          <>
            Don't have an account?{' '}
            <Button variant="subtle" size="sm" onClick={() => setMode('signup')}>
              Create one
            </Button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Button variant="subtle" size="sm" onClick={() => setMode('signin')}>
              Sign in
            </Button>
          </>
        )}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Text c="red" size="sm">
                {error}
              </Text>
            )}

            <Button type="submit" loading={loading}>
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
} 