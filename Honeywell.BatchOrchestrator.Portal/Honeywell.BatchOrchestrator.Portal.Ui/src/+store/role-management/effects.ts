import { createAsyncThunk } from '@reduxjs/toolkit';
import { PermissionSet } from '../../app/role-management/models/permission-set';
import { RoleManagerService } from '../../app/role-management/services/role-manager-service';

const controller = 'permission';
const getPermissionSetEndpoint = 'GetAllPermissions';
const setPermissionsEndpoint = 'UdpatePermission';

export const setPermissions = createAsyncThunk(
  //   `${controller}/${setPermissionsEndpoint}`,
  'permission/UdpatePermission',
  async (body: PermissionSet, { rejectWithValue }) => {
    try {
      const response = await RoleManagerService.setPermissions(body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getPermissionSet = createAsyncThunk(
  //   `${controller}/${getPermissionSetEndpoint}`,
  'permission/GetAllPermissions',
  async () => {
    const response = await RoleManagerService.getPermissions();
    return response.data;
  }
);
