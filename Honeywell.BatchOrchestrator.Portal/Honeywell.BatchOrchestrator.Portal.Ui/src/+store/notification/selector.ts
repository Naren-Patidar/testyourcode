import { createSelector } from 'reselect';
import { RootState } from '../types';

// eslint-disable-next-line import/named
import { initialState } from './notificationSlice';

const selectNotification = (state: RootState) =>
  state.notification || initialState;

export const selectNotificationGroup = createSelector(
  [selectNotification],
  (state) => state.notification
);
