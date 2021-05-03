/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationAPI } from '../../core/app-shell/components/notification/services/notificationApi';
import {
  pushNotificationData,
  clearNotification,
  clearAllNotification,
} from './notificationSlice';

export const getNotificationGroup = createAsyncThunk(
  'notification/getNotification',
  // eslint-disable-next-line consistent-return
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await notificationAPI.getNotificationByGroup();
      const infodata = response.data
        .filter((eachMessage) => eachMessage.messageType === 'Info')
        .reverse();
      const alertdata = response.data
        .filter((eachMessage) => eachMessage.messageType === 'Alert')
        .reverse();
      const Approvaldata = response.data
        .filter((eachMessage) => eachMessage.messageType === 'Approval')
        .reverse();

      dispatch(
        pushNotificationData({
          alert: alertdata,
          approval: Approvaldata,
          info: infodata,
        })
      );
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

interface ClearNotification {
  id: string;
  type: string;
}

export const clearNotificationMessages = createAsyncThunk(
  'notification/getNotification',
  // eslint-disable-next-line consistent-return
  async (data: ClearNotification, { dispatch, rejectWithValue }) => {
    try {
      await notificationAPI.ClearNotificationById(data.id);
      dispatch(clearNotification({ id: data.id, type: data.type }));
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createNewNotification = createAsyncThunk(
  'notification/getNotification',
  // eslint-disable-next-line consistent-return
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await notificationAPI.createNotification();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const testApprovalApproved = createAsyncThunk(
  'notification/getNotification',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      await notificationAPI.ClearApprovalNotification();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const clearApprovalNotificationMessage = createAsyncThunk(
  'notification/getNotification',
  // eslint-disable-next-line consistent-return
  async (data: ClearNotification, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        clearNotification({
          id: data.id,
          type: data.type,
        })
      );
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

interface ClearAllNotification {
  id: [];
  type: string;
}

export const clearAllNotificationMessages = createAsyncThunk(
  'notification/getNotification',
  // eslint-disable-next-line consistent-return
  async (data: ClearAllNotification, { dispatch, rejectWithValue }) => {
    try {
      await notificationAPI.ClearAllNotification(data.id);
      dispatch(
        clearAllNotification({
          type: data.type,
        })
      );
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
