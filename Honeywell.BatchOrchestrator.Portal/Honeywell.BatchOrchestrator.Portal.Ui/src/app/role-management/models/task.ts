import { TaskGroup } from './task-group';

export interface Task {
  taskId: number;
  taskName: string;
  name: string;
  taskGroup: TaskGroup;
  isDisabled: boolean;
}
