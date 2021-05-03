import React, { useEffect } from 'react';
import { Button, Accordion } from '@scuf/common';
import { useRoleManagementFacade } from '+store/role-management';
import FeatureRoles from '../components/feature-roles';
import { Permission } from '../models/permission';
import { Task } from '../models/task';
import { TaskGroup } from '../models/task-group';

export const AbpmRoleManager: React.FC = () => {
  const {
    loading,
    error,
    savedPermissionSet,
    permissionSet,
    taskGroups,
    selectedTaskGroup,
    filteredTasks,
    addedPermissions,
    removedPermissions,
    setSelectedTaskGroup,
    setFilteredTasks,
    setAddedPermissionPerRole,
    setRemovedPermissionPerRole,
    setSavedPermissionSet,
    setPermissionSet,
    fetchPermissionSet,
    savePermissions,
  } = useRoleManagementFacade();

  useEffect(() => {
    fetchPermissionSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (
      permissionSet &&
      permissionSet.tasks.length > 0 &&
      permissionSet.roles.length > 0 &&
      permissionSet.permissions.length > 0
    ) {
      setSelectedTaskGroup(selectedTaskGroup);
      setFilteredTasks(filteredTasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionSet]);

  const handleTaskChange = (e, permission: Permission, task: Task) => {
    const permissionSetLocal = JSON.parse(JSON.stringify(permissionSet));
    const addedPermissionsPerRoleLocal: any[] = JSON.parse(
      JSON.stringify(addedPermissions)
    );
    const removedPermissionsPerRoleLocal: any[] = JSON.parse(
      JSON.stringify(removedPermissions)
    );

    const permissionToUpdate = permissionSetLocal.permissions.filter((p) => {
      return p.roleId === permission.roleId;
    })[0];
    if (!e) {
      // Permission removal flow

      const index = permissionToUpdate.tasks.findIndex((t) => {
        return t.taskId === task.taskId;
      });
      permissionToUpdate.tasks.splice(index, 1);

      /* Check if task is found in tasks array under permissions array of 
      original permissionSet object for updated role. */
      const ttrIndex0 = savedPermissionSet.permissions
        .filter((sps) => sps.roleId === permission.roleId)[0]
        .tasks.findIndex((t) => t.taskId === task.taskId);

      if (ttrIndex0 > -1) {
        // If task is found in tasks array under permissions array for updated role

        // Check if role is already present in local removed permissions array.
        // If so, find index of the role in local removed permissions array.
        const rpprIndex = removedPermissionsPerRoleLocal.findIndex((rppr) => {
          return rppr.roleId === permission.roleId;
        });

        if (rpprIndex >= 0) {
          // If role is present in tasks array of local removed permissions array for the role,
          // check if task is already added in tasks array of local removed permissions array for the role.
          const ttrIndex1 = removedPermissionsPerRoleLocal[
            rpprIndex
          ].tasks.findIndex((t) => t.taskId === task.taskId);

          // If task is not found in the tasks array of local removed permissions array for the role,
          // add the task in local removed permissions array for role tracked by index.
          if (ttrIndex1 === -1)
            removedPermissionsPerRoleLocal[rpprIndex].tasks.push(task);
        } else {
          // If role is not present in local removed permissions array,
          // add the role at the end of the local removed permissions array.
          removedPermissionsPerRoleLocal.push({
            roleId: permission.roleId,
            tasks: [task],
            userRole: permissionSet.roles.filter((r) => {
              return r.roleId === permission.roleId;
            })[0].roleName,
          });
        }

        // Set local removed permissions array in state
        setRemovedPermissionPerRole(removedPermissionsPerRoleLocal);
      } else {
        // If task is not found in tasks array under original permissions array for updated role
        // i.e. user has added and again removed the task without saving.

        // Find index of role in local added permissions array.
        const apprIndex = addedPermissionsPerRoleLocal.findIndex((p) => {
          return p.roleId === permission.roleId;
        });

        if (apprIndex > -1) {
          // If role is present, find the index of task removed from tasks array of
          // local added permissions array for the role and
          // remove it from the tasks array of local added permissions array.
          const ttrIndex = addedPermissionsPerRoleLocal[
            apprIndex
          ].tasks.findIndex((t) => t.taskId === task.taskId);
          addedPermissionsPerRoleLocal[apprIndex].tasks.splice(ttrIndex, 1);
        }

        // If tasks array under local added permissions array for updated role is empty,
        // remove the parent permission object from local added permissions array.
        if (addedPermissionsPerRoleLocal[apprIndex].tasks.length === 0) {
          addedPermissionsPerRoleLocal.splice(apprIndex, 1);
        }

        // Set local added permissions array in state
        setAddedPermissionPerRole(addedPermissionsPerRoleLocal);
      }
    } else {
      // Permission addition flow

      //
      permissionToUpdate.tasks.push(task);

      /* Check if task is found in tasks array under permissions array of 
      original permissionSet object for updated role. */
      const ttaIndex0 = savedPermissionSet.permissions
        .filter((sps) => sps.roleId === permission.roleId)[0]
        .tasks.findIndex((t) => t.taskId === task.taskId);

      if (permission.tasks.indexOf(task) === -1) {
        // If task is not found in tasks array under permissions array for updated role
        if (ttaIndex0 === -1) {
          // If the task is not found in tasks array under permissions array of
          // original permissionSet object for updated role.

          // Check if role is already present in local added permissions array.
          // If so, find index of the role in local added permissions array.
          const apprIndex = addedPermissionsPerRoleLocal.findIndex((appr) => {
            return appr.roleId === permission.roleId;
          });

          if (apprIndex >= 0) {
            // If role is present in tasks array of local added permissions array.
            // check if task is already added in tasks array of local added permissions array for the role.
            const ttaIndex1 = addedPermissionsPerRoleLocal[
              apprIndex
            ].tasks.findIndex((t) => t.taskId === task.taskId);

            // If task is not found in the tasks array of local added permissions array for the role,
            // add the task in local added permissions array for role tracked by index.
            if (ttaIndex1 === -1)
              // add the task for the updated role in local added permissions array for role tracked by index.
              addedPermissionsPerRoleLocal[apprIndex].tasks.push(task);
          } else {
            // If role is not present in local added permissions array,
            // add the role at the end of the local added permissions array.
            addedPermissionsPerRoleLocal.push({
              roleId: permission.roleId,
              tasks: [task],
              userRole: permissionSet.roles.filter((r) => {
                return r.roleId === permission.roleId;
              })[0].roleName,
            });
          }

          // Set local added permissions array in state
          setAddedPermissionPerRole(addedPermissionsPerRoleLocal);
        } else {
          // If task is not found in tasks array under original permissions array for updated role
          // i.e. user has removed and again added the task without saving.

          // Find index of role in local removed permissions array.
          const rpprIndex = removedPermissionsPerRoleLocal.findIndex((p) => {
            return p.roleId === permission.roleId;
          });

          if (rpprIndex > -1) {
            // If role is present, find the index of task added to tasks array of
            // local removed permissions array for the role and
            // remove it from the tasks array of local removed permissions array.
            const ttrIndex = removedPermissionsPerRoleLocal[
              rpprIndex
            ].tasks.findIndex((t) => t.taskId === task.taskId);
            removedPermissionsPerRoleLocal[rpprIndex].tasks.splice(ttrIndex, 1);
          }

          // If tasks array under local removed permissions array for updated role is empty,
          // remove the parent permission object from local removed permissions array.
          if (removedPermissionsPerRoleLocal[rpprIndex].tasks.length === 0) {
            removedPermissionsPerRoleLocal.splice(rpprIndex, 1);
          }

          // Set local removed permissions array in state
          setRemovedPermissionPerRole(removedPermissionsPerRoleLocal);
        }
      }
    }

    setPermissionSet(permissionSetLocal);
  };

  const updateFilteredTasks = (taskGroup: TaskGroup) => {
    setSelectedTaskGroup(taskGroup);
    setFilteredTasks(filteredTasks);
  };

  return (
    <div className="w-100-p px-5 pt-5">
      <div className="lead font-weight-500" style={{ color: '#c0c0c0' }}>
        Role Management
      </div>
      <div className="d-flex justify-content-flex-end">
        <Button
          type="primary"
          content="Save Changes"
          className="my-2 mb-4"
          onClick={() =>
            savePermissions({
              addedPermissionsPerRole: addedPermissions,
              removedPermissionsPerRole: removedPermissions,
            })
          }
        />
      </div>

      <Accordion
        className=""
        defaultActiveIndex={taskGroups.findIndex((tg) => {
          return tg === selectedTaskGroup;
        })}
      >
        {taskGroups.map((taskGroup) => {
          return (
            <Accordion.Content
              key={`ap${taskGroup}`}
              title={taskGroup}
              arrowPosition="left"
              onClick={() => updateFilteredTasks(taskGroup)}
            >
              <FeatureRoles
                taskGroups={taskGroups}
                selectedTaskGroup={selectedTaskGroup}
                filteredTasks={filteredTasks}
                roles={permissionSet.roles}
                permissions={permissionSet.permissions}
                handleChange={(e, permission, task) =>
                  handleTaskChange(e, permission, task)
                }
              />
            </Accordion.Content>
          );
        })}
      </Accordion>
    </div>
  );
};

export default AbpmRoleManager;
