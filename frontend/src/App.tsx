import { useState } from 'react';
import { MantineProvider, AppShell, Title, Container, Button, Group } from '@mantine/core';
import TaskList from './components/TaskList';
import AuthForm from './components/Auth/AuthForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';

console.log('[App] Starting application initialization');

function AppContent() {
  const { user, logout } = useAuth();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  if (!user) {
    console.log('[AppContent] No user found, showing auth form');
    return <AuthForm />;
  }

  console.log('[AppContent] User authenticated, rendering main content');
  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group justify="space-between" h="100%" px="md">
            <Title order={1} size="h3">Task Management App</Title>
            <Group>
              <Button onClick={() => setIsTaskFormOpen(true)}>
                Create Task
              </Button>
              <Button variant="subtle" onClick={() => logout()}>
                Sign Out
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg">
          <TaskList />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

function App() {
  console.log('[App] Root component rendering');
  return (
    <MantineProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
