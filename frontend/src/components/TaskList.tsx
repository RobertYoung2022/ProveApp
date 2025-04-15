import { SimpleGrid, Text, Container } from '@mantine/core';
import { Task } from './Task';
import { useTasks } from '../lib/TaskContext';
import type { Task as TaskType } from '../lib/supabase';

interface TaskListProps {
  tasks: TaskType[];
}

export function TaskList({ tasks }: TaskListProps) {
  const { updateExistingTask, deleteExistingTask } = useTasks();

  if (!tasks.length) {
    return (
      <Container>
        <Text ta="center" c="dimmed">
          No tasks found. Create one to get started!
        </Text>
      </Container>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          dueDate={task.due_date || ''}
          onEdit={updateExistingTask}
          onDelete={deleteExistingTask}
        />
      ))}
    </SimpleGrid>
  );
} 