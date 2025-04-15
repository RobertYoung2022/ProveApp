import { useState } from 'react';
import {
  TextInput,
  Textarea,
  Select,
  NumberInput,
  Button,
  Stack,
  Group,
  Modal,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { createTask } from '../../lib/supabase';
import type { Task } from '../../lib/supabase';

interface TaskFormProps {
  opened: boolean;
  onClose: () => void;
  onTaskCreated: (task: Task) => void;
}

export function TaskForm({ opened, onClose, onTaskCreated }: TaskFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: null as Date | null,
    priority: 'medium' as Task['priority'],
    progress: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const task = await createTask({
        ...formData,
        due_date: formData.due_date?.toISOString(),
        completed: false,
      });

      onTaskCreated(task);
      onClose();
      setFormData({
        title: '',
        description: '',
        due_date: null,
        priority: 'medium',
        progress: 0,
      });
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create New Task"
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Title"
            placeholder="Enter task title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Textarea
            label="Description"
            placeholder="Enter task description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            minRows={3}
          />

          <DateTimePicker
            label="Due Date"
            placeholder="Select due date and time"
            value={formData.due_date}
            onChange={(date) => setFormData({ ...formData, due_date: date })}
            clearable
          />

          <Select
            label="Priority"
            value={formData.priority}
            onChange={(value) => {
              if (value && (value === 'low' || value === 'medium' || value === 'high')) {
                setFormData({ ...formData, priority: value });
              }
            }}
            data={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />

          <NumberInput
            label="Progress"
            value={formData.progress}
            onChange={(value) => setFormData({ ...formData, progress: value ?? 0 })}
            min={0}
            max={100}
            step={10}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={onClose}>Cancel</Button>
            <Button type="submit" loading={loading}>Create Task</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
} 