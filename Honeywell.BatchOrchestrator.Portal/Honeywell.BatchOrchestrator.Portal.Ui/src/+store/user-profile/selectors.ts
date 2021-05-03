/* eslint-disable import/named */
import { filter } from 'lodash';
import { createSelector } from 'reselect';
import { RootState } from '../types';

import { initialUserProfileState } from './slice';

// First select the relevant part from the state
const selectUserProfileState = (state: RootState) =>
  state.userProfile || initialUserProfileState;

export const selectUserProfile = createSelector(
  [selectUserProfileState],
  (state) => state.userInfo
);

export const selectUserAuthenticated = createSelector(
  [selectUserProfileState],
  (state) => state.authenticated
);
export const selectUserAuthenticating = createSelector(
  [selectUserProfileState],
  (state) => state.authenticating
);
