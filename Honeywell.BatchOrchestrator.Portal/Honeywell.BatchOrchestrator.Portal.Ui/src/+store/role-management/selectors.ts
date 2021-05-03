import { PermissionSet } from 'app/role-management/models/permission-set';
import { Task } from 'app/role-management/models/task';
import { TaskGroup } from 'app/role-management/models/task-group';
import { createSelector } from 'reselect';
import { RootState } from '../types';

import { initialState } from './slice';

// First select the relevant part from the state
const selectRoleManagementState = (state: RootState) =>
  state.roleManagement || initialState;

const getDistinctTaskGroups = (permissionSet: PermissionSet) => {
  return (
    permissionSet.tasks
      .map((t) => t.taskGroup)
      .filter((value, index, self) => self.indexOf(value) === index) || []
  );
};

const getDistinctTasksInTaskGroup = (
  permissionSet: PermissionSet,
  selectedTaskGroup: TaskGroup
) => {
  return permissionSet.tasks.filter((t) => {
    return t.taskGroup === selectedTaskGroup;
  });
};

export const selectLoading = createSelector(
  [selectRoleManagementState],
  (state) => state.loading
);

export const selectError = createSelector(
  [selectRoleManagementState],
  (state) => state.error
);

export const selectTaskGroup = createSelector(
  [selectRoleManagementState],
  (state) => state.selectedTaskGroup
);

export const selectSavedPermissionSet = createSelector(
  [selectRoleManagementState],
  (state) => state.savedPermissionSet
);

export const selectPermissionSetSource = createSelector(
  [selectRoleManagementState],
  (state) => state.permissionSet
);

export const selectPermissionSet = createSelector(
  selectPermissionSetSource,
  (data) => {
    return data || { tasks: [], roles: [], permissions: [] };
  }
);

export const selectTaskGroups = createSelector(
  selectPermissionSetSource,
  (data) => {
    let taskGroups: TaskGroup[] = [];
    if (data && data.tasks.length > 0) {
      taskGroups = getDistinctTaskGroups(data);
    }

    return taskGroups;
  }
);

export const selectFilteredTasks = createSelector(
  [selectRoleManagementState],
  (state) => {
    const { permissionSet, selectedTaskGroup } = state;
    let filteredTasks: Task[] = [];
    if (permissionSet && permissionSet.tasks.length > 0 && selectedTaskGroup) {
      filteredTasks = getDistinctTasksInTaskGroup(
        permissionSet,
        selectedTaskGroup
      );
    }
    return filteredTasks;
  }
);

export const selectAddedPermissions = createSelector(
  [selectRoleManagementState],
  (state) => state.addedPermissionsPerRole
);

export const selectRemovedPermissions = createSelector(
  [selectRoleManagementState],
  (state) => state.removedPermissionsPerRole
);
