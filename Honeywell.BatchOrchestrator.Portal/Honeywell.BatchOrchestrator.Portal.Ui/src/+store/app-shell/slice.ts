import { HubConnection } from '@microsoft/signalr';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { getVersion, getAdvanceBatchLicense } from './effects';
import { AppShellState } from './types';

const appshellSliceKey = 'appshell';
export const initialState: AppShellState = {
  sidebarOpen: false,
  version: '',
  advancedBatchLicense: true,
};

const appshellSlice = createSlice({
  name: appshellSliceKey,
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebar(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVersion.fulfilled, (state, { payload }) => {
      state.version = payload;
    });
    builder.addCase(getAdvanceBatchLicense.fulfilled, (state, { payload }) => {
      state.advancedBatchLicense = payload;
    });
  },
});
export const { actions, reducer, name: sliceKey } = appshellSlice;
