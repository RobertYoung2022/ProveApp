import { useState } from 'react';
import { MantineProvider, AppShell, Title, Container, Button, Group, Loader, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { TaskList } from './components/TaskList';
import { AuthForm } from './components/Auth/AuthForm';
import { TaskForm } from './components/Tasks/TaskForm';
import { TaskFilters } from './components/Tasks/TaskFilters';
import { AuthProvider, useAuth } from './lib/auth';
import { TaskProvider, useTasks } from './lib/TaskContext';

console.log('[App] Starting application initialization');

// Temporary mock data
const mockTasks = [
  {
    id: '1',
    title: 'Complete MVP Features',
    description: 'Implement core features for the task management app',
    dueDate: '2024-04-01',
    priority: 'high',
    progress: 60,
  },
  {
    id: '2',
    title: 'Design Review',
    description: 'Review and finalize UI/UX design with the team',
    dueDate: '2024-03-25',
    priority: 'medium',
    progress: 30,
  },
  {
    id: '3',
    title: 'Documentation',
    description: 'Write technical documentation for the project',
    dueDate: '2024-04-10',
    priority: 'low',
    progress: 10,
  },
] as const;

function TaskManager() {
  console.log('[TaskManager] Component initializing');
  const { tasks, loading, error } = useTasks();
  console.log('[TaskManager] Tasks state:', { tasksCount: tasks?.length, loading, error });

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  if (loading) {
    console.log('[TaskManager] Rendering loading state');
    return (
      <Container size="lg" style={{ textAlign: 'center', padding: '2rem' }}>
        <Loader size="xl" />
      </Container>
    );
  }

  if (error) {
    console.error('[TaskManager] Error state:', error);
    return (
      <Container size="lg" style={{ padding: '2rem' }}>
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  console.log('[TaskManager] Rendering task list with tasks:', tasks);
  return (
    <>
      <Container size="lg">
        <TaskFilters />
        <TaskList tasks={tasks} />
      </Container>

      <TaskForm
        opened={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onTaskCreated={() => setIsTaskFormOpen(false)}
      />
    </>
  );
}

function AppContent() {
  console.log('[AppContent] Component initializing');
  const { user, signOut } = useAuth();
  console.log('[AppContent] Auth state:', { hasUser: !!user, user });

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
              <Button variant="subtle" onClick={() => signOut()}>
                Sign Out
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <TaskManager />
      </AppShell.Main>
    </AppShell>
  );
}

function App() {
  console.log('[App] Root component rendering');
  return (
    <MantineProvider>
      <AuthProvider>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
