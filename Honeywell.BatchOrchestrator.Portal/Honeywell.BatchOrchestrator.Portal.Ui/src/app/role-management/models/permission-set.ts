import { Permission } from './permission';
import { Role } from './role';
import { Task } from './task';

export interface PermissionSet {
  roles: Role[];
  tasks: Task[];
  permissions: Permission[];
}
