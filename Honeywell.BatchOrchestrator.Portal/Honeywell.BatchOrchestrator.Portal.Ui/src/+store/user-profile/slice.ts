import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { getUserProfile } from './effects';
import { UserProfileState } from './types';

export const userProfileSliceKeyName = 'userProfile';

export const initialUserProfileState: UserProfileState = {
  error: '',
  authenticated: null,
  authenticating: true,
  userInfo: {
    userName: '',
    tasks: [],
    roles: [],
  },
};

const userProfileSlice = createSlice({
  name: userProfileSliceKeyName,
  initialState: initialUserProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserProfile.pending,
      (state: UserProfileState, { payload }) => {
        state.error = '';
        state.authenticating = true;
      }
    );
    builder.addCase(
      getUserProfile.fulfilled,
      (state: UserProfileState, { payload }) => {
        state.userInfo = payload;
        state.authenticated = !!payload.userName;
        state.authenticating = false;
      }
    );
    builder.addCase(
      getUserProfile.rejected,
      (state: UserProfileState, action: PayloadAction<any>) => {
        state.authenticated = false;
        state.error = action.payload?.data;
        state.authenticating = false;
      }
    );
  },
});

export const {
  actions: userProfileActions,
  reducer: userProfileReducer,
  name: userProfileSliceKey,
} = userProfileSlice;
