import { Card, Text, Group, Button, Badge, Progress } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import type { Task as TaskType } from '../lib/supabase';

interface TaskProps extends Omit<TaskType, 'user_id' | 'created_at' | 'due_date'> {
  dueDate: string;
  onEdit: (id: string, updates: Partial<TaskType>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function Task({
  id,
  title,
  description,
  dueDate,
  priority,
  progress,
  onEdit,
  onDelete,
}: TaskProps) {
  const priorityColor = {
    low: 'blue',
    medium: 'yellow',
    high: 'red',
  }[priority];

  const formattedDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString()
    : 'No due date';

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500} size="lg">
          {title}
        </Text>
        <Badge color={priorityColor}>{priority}</Badge>
      </Group>

      <Text size="sm" c="dimmed" mb="md">
        {description}
      </Text>

      <Text size="sm" mb="xs">
        Due: {formattedDueDate}
      </Text>

      <Progress
        value={progress}
        mb="md"
        color={progress === 100 ? 'green' : 'blue'}
      />

      <Group justify="flex-end" mt="md">
        <Button
          variant="light"
          color="blue"
          size="xs"
          leftSection={<IconEdit size={14} />}
          onClick={() => onEdit(id, { progress: progress + 10 })}
        >
          Update Progress
        </Button>
        <Button
          variant="light"
          color="red"
          size="xs"
          leftSection={<IconTrash size={14} />}
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </Group>
    </Card>
  );
} 