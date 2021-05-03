import { UserRole } from './user-role';
import { UserPermission } from './user-permission';

export interface UserProfile {
  userName: string;
  roles: UserRole[];
  tasks: UserPermission[];
}
