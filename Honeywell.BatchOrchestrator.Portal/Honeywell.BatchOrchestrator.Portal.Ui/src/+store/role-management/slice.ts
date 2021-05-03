import { PayloadAction } from '@reduxjs/toolkit';
import { Task } from 'app/role-management/models/task';
import { TaskGroup } from 'app/role-management/models/task-group';
import { PermissionSet } from '../../app/role-management/models/permission-set';
import { createSlice } from '../../utils/@reduxjs/toolkit';

import { getPermissionSet, setPermissions } from './effects';
import { RoleManagementState } from './types';

export const roleManagementSliceKeyName = 'roleManagement';
// The initial state of the role management container
export const initialState: RoleManagementState = {
  error: '',
  loading: false,
  savedPermissionSet: { tasks: [], roles: [], permissions: [] },
  permissionSet: { tasks: [], roles: [], permissions: [] },
  selectedTaskGroup: TaskGroup.Action,
  filteredTasks: [],
  taskGroups: [],
  addedPermissionsPerRole: [],
  removedPermissionsPerRole: [],
};

const roleManagementSlice = createSlice({
  name: roleManagementSliceKeyName,
  initialState,
  reducers: {
    setSavedPermissionSet(state, action: PayloadAction<PermissionSet>) {
      state.savedPermissionSet = action.payload;
    },
    setPermissionSet(state, action: PayloadAction<PermissionSet>) {
      state.permissionSet = action.payload;
    },
    setSelectedTaskGroup(state, action: PayloadAction<TaskGroup>) {
      state.selectedTaskGroup = action.payload;
    },
    setFilteredTasks(state, action: PayloadAction<Task[]>) {
      state.filteredTasks = action.payload;
    },
    setAddedPermissionPerRole(state, action: PayloadAction<any[]>) {
      state.addedPermissionsPerRole = action.payload;
    },
    setRemovedPermissionPerRole(state, action: PayloadAction<any[]>) {
      state.removedPermissionsPerRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setPermissions.pending, (state: RoleManagementState) => {
      state.loading = true;
    });
    builder.addCase(
      setPermissions.fulfilled,
      (state: RoleManagementState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = '';
        state.savedPermissionSet = action.payload.value || {
          tasks: [],
          roles: [],
          permissions: [],
        };
        state.addedPermissionsPerRole = [];
        state.removedPermissionsPerRole = [];
      }
    );
    builder.addCase(
      setPermissions.rejected,
      (state: RoleManagementState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(
      getPermissionSet.fulfilled,
      (state: RoleManagementState, action: PayloadAction<PermissionSet>) => {
        state.permissionSet = action.payload || {
          tasks: [],
          roles: [],
          permissions: [],
        };
        state.savedPermissionSet = action.payload || {
          tasks: [],
          roles: [],
          permissions: [],
        };
      }
    );
  },
});

export const {
  actions: roleManagementActions,
  reducer: roleManagementReducer,
  name: roleManagementSliceKey,
} = roleManagementSlice;
