/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { httpClient } from 'core/http-client';
import { UserProfile } from '../models/user-profile';

const CONTROLLER = 'Permission';
const ENPOINTS = {
  GetCurrentUser: 'GetCurrentUser',
  GetCurrentUserRolesAndPermission: 'GetCurrentUserRolesAndPermission',
};

export const UserService = {
  getUserProfile: () =>
    httpClient.get<UserProfile>(
      `${CONTROLLER}/${ENPOINTS.GetCurrentUserRolesAndPermission}`
    ),
};
