import { PermissionSet } from 'app/role-management/models/permission-set';
import { Task } from 'app/role-management/models/task';
import { TaskGroup } from 'app/role-management/models/task-group';

export interface RoleManagementState {
  loading: boolean;
  error: string;
  savedPermissionSet: PermissionSet;
  permissionSet: PermissionSet | null;
  selectedTaskGroup: TaskGroup;
  filteredTasks: Task[];
  taskGroups: TaskGroup[];
  addedPermissionsPerRole: any[];
  removedPermissionsPerRole: any[];
}
