import React from 'react';
import { Card, Checkbox } from '@scuf/common';
import { Permission } from '../models/permission';
import { Role } from '../models/role';
import { Task } from '../models/task';
import { TaskGroup } from '../models/task-group';

type FeatureRolesProps = {
  taskGroups: TaskGroup[];
  selectedTaskGroup: TaskGroup;
  filteredTasks: Task[];
  roles: Role[];
  permissions: Permission[];
  handleChange: (e, permission, task) => void;
};

const findRole = (perm, tIn) => {
  return (
    perm.tasks.findIndex((t) => {
      return t.taskName === tIn.taskName;
    }) >= 0
  );
};

const FeatureRoles: React.FC<FeatureRolesProps> = (props) => {
  const {
    taskGroups,
    selectedTaskGroup,
    filteredTasks,
    roles,
    permissions,
    handleChange,
  } = props;

  const featureRolesView = (taskGroup: TaskGroup) => {
    return (
      <div className="column">
        <table
          className="w-100-p text-center"
          style={{ fontSize: '0.95rem', fontFamily: 'Honeywell Sans Web' }}
        >
          <thead className="letter-spacing-compact">
            <tr>
              <th
                style={{
                  // border: '2px solid #202020',
                  padding: '0.5rem 1.5rem',
                  color: '#a0a0a0',
                }}
                className="text-uppercase font-weight-600 w-20-p"
              >
                {taskGroup}
              </th>
              {roles.map((role) => {
                return (
                  <th
                    key={role.roleId}
                    className="text-center font-weight-600"
                    style={{
                      // border: '2px solid #202020',
                      color: '#c0c0c0',
                    }}
                    title={role.roleName}
                  >
                    {role.roleName}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody
            className="text-center letter-spacing-compact"
            style={{
              backgroundColor: '#272727',
              color: '#f0f0f0',
              boxShadow: '0 0 0 1px #272727',
              borderRadius: '8px',
            }}
          >
            {filteredTasks.map((task, index) => {
              return (
                <tr
                  key={`tr${task.taskName}`}
                  className="font-weight-500"
                  style={{
                    borderBottom:
                      index < filteredTasks.length - 1
                        ? '1px solid #303030'
                        : '',
                    // height: '50px',
                  }}
                >
                  <td
                    className="text-left"
                    style={{
                      height: '50px',
                      paddingLeft: '1.5rem',
                    }}
                    title={task.name}
                  >
                    <div className="d-flex">
                      <span
                        className="flex-child-text-truncate"
                        style={{ width: '50ch' }}
                      >
                        {task.name}
                      </span>
                    </div>
                  </td>
                  {roles.map((role, idx) => {
                    return (
                      <td
                        key={`${role.roleName}_${task.taskId}`}
                        className=""
                        style={{
                          color: '#c0c0c0 !important',
                          height: '50px',
                        }}
                      >
                        <Checkbox
                          style={{
                            margin: '0 auto',
                            padding: '0.5rem 0',
                          }}
                          checked={findRole(permissions[idx], task)}
                          disabled={task.isDisabled}
                          onChange={(event) =>
                            handleChange(event, permissions[idx], task)
                          }
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {/* {taskGroups.map((tg) => {
        return featureRolesView(tg);
      })} */}
      {featureRolesView(selectedTaskGroup)}
    </div>
  );
};

export default FeatureRoles;
