import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../types';

import { initialState } from './slice';

// First select the relevant part from the state
const selectAppShellState = (state: RootState) =>
  state.appshell || initialState;

export const selectSidebarOpen = createSelector(
  [selectAppShellState],
  (state) => state.sidebarOpen
);
export const selectVersion = createSelector(
  [selectAppShellState],
  (state) => state.version
);

export const selectLicense = createSelector(
  [selectAppShellState],
  (state) => state.advancedBatchLicense
);
