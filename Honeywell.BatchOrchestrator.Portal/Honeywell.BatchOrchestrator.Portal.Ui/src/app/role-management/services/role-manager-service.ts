/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { httpClient } from 'core/http-client';
import { PermissionSet } from '../models/permission-set';

const controller = 'permission';
const getPermissionSetEndpoint = 'GetAllPermissions';
const setPermissionsEndpoint = 'UdpatePermission';

export const RoleManagerService = {
  setPermissions: (payload: PermissionSet) =>
    httpClient.post<any>(`${controller}/${setPermissionsEndpoint}`, payload),
  getPermissions: () =>
    httpClient.get<PermissionSet>(`${controller}/${getPermissionSetEndpoint}`),
};
