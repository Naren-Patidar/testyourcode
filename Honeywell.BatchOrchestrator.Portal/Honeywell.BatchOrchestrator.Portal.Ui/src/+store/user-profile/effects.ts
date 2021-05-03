import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from '../../core/authentication';

export const getUserProfile = createAsyncThunk(
  'userProfile/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.getUserProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
