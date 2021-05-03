import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from 'app/role-management/models/task';
import { TaskGroup } from 'app/role-management/models/task-group';
import { useInjectReducer } from '../../utils/@reduxjs';
import {
  selectError,
  selectLoading,
  selectSavedPermissionSet,
  selectPermissionSet,
  selectTaskGroups,
  selectTaskGroup,
  selectFilteredTasks,
  selectAddedPermissions,
  selectRemovedPermissions,
} from './selectors';
import { setPermissions, getPermissionSet } from './effects';
import {
  roleManagementActions,
  roleManagementReducer,
  roleManagementSliceKey,
} from './slice';

import { PermissionSet } from '../../app/role-management/models/permission-set';

export const useRoleManagementFacade = () => {
  useInjectReducer({
    key: roleManagementSliceKey,
    reducer: roleManagementReducer,
  });
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const savedPermissionSet = useSelector(selectSavedPermissionSet);
  const permissionSet = useSelector(selectPermissionSet);
  const taskGroups = useSelector(selectTaskGroups);
  const filteredTasks = useSelector(selectFilteredTasks);
  const addedPermissions = useSelector(selectAddedPermissions);
  const removedPermissions = useSelector(selectRemovedPermissions);
  const selectedTaskGroup = useSelector(selectTaskGroup);

  const dispatch = useDispatch();

  const setSavedPermissionSet = useCallback(
    (permissions: PermissionSet) => {
      dispatch(roleManagementActions.setSavedPermissionSet(permissions));
    },
    [dispatch]
  );
  const setPermissionSet = useCallback(
    (permissions: PermissionSet) => {
      dispatch(roleManagementActions.setPermissionSet(permissions));
    },
    [dispatch]
  );
  const setSelectedTaskGroup = useCallback(
    (currentTaskGroup: TaskGroup) => {
      dispatch(roleManagementActions.setSelectedTaskGroup(currentTaskGroup));
    },
    [dispatch]
  );
  const setFilteredTasks = useCallback(
    (tasksFilteredByTaskGroup: Task[]) => {
      dispatch(
        roleManagementActions.setFilteredTasks(tasksFilteredByTaskGroup)
      );
    },
    [dispatch]
  );
  const setAddedPermissionPerRole = useCallback(
    (updatedPermissions: any[]) => {
      dispatch(
        roleManagementActions.setAddedPermissionPerRole(updatedPermissions)
      );
    },
    [dispatch]
  );
  const setRemovedPermissionPerRole = useCallback(
    (updatedPermissions: any[]) => {
      dispatch(
        roleManagementActions.setRemovedPermissionPerRole(updatedPermissions)
      );
    },
    [dispatch]
  );

  const fetchPermissionSet = useCallback(() => {
    dispatch(getPermissionSet());
  }, [dispatch]);

  const savePermissions = useCallback(
    (payload: any) => {
      dispatch(setPermissions(payload));
    },
    [dispatch]
  );

  return {
    loading,
    error,
    savedPermissionSet,
    permissionSet,
    taskGroups,
    selectedTaskGroup,
    filteredTasks,
    addedPermissions,
    removedPermissions,
    setSavedPermissionSet,
    setPermissionSet,
    setSelectedTaskGroup,
    setFilteredTasks,
    setAddedPermissionPerRole,
    setRemovedPermissionPerRole,
    fetchPermissionSet,
    savePermissions,
  };
};
