import { RoleName } from './role-name';
import { Task } from './task';

export interface Permission {
  roleId: number;
  tasks: Task[];
}
