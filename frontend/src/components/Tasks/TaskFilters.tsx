import {
  Group,
  Select,
  TextInput,
  SegmentedControl,
  Paper,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useTasks } from '../../lib/TaskContext';

export function TaskFilters() {
  const { sortTasks, filterTasks, sortBy, filters } = useTasks();

  const handleSortChange = (value: string) => {
    sortTasks(value as 'dueDate' | 'priority' | 'progress');
  };

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    filterTasks({
      ...filters,
      [key]: value,
    });
  };

  return (
    <Paper shadow="xs" p="md" mb="md">
      <Group gap="md">
        <TextInput
          placeholder="Search tasks..."
          value={filters.searchTerm || ''}
          onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          leftSection={<IconSearch size={16} />}
          style={{ flex: 1 }}
        />

        <Select
          label="Priority"
          value={filters.priority}
          onChange={(value) => handleFilterChange('priority', value)}
          data={[
            { value: 'all', label: 'All Priorities' },
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          style={{ minWidth: 150 }}
        />

        <Select
          label="Status"
          value={filters.completed === 'all' ? 'all' : String(filters.completed)}
          onChange={(value) => handleFilterChange('completed', value === 'all' ? 'all' : value === 'true')}
          data={[
            { value: 'all', label: 'All Status' },
            { value: 'false', label: 'In Progress' },
            { value: 'true', label: 'Completed' },
          ]}
          style={{ minWidth: 150 }}
        />

        <div>
          <div style={{ marginBottom: '0.5rem' }}>Sort By</div>
          <SegmentedControl
            value={sortBy}
            onChange={handleSortChange}
            data={[
              { label: 'Due Date', value: 'dueDate' },
              { label: 'Priority', value: 'priority' },
              { label: 'Progress', value: 'progress' },
            ]}
          />
        </div>
      </Group>
    </Paper>
  );
} 