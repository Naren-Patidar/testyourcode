/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationGroup } from './types';
import { Notification } from '../../core/app-shell/components/notification/model/notification';

export const initialState: NotificationGroup = {
  notification: {
    alert: [],
    approval: [],
    info: [],
    newMessageCount: 0,
  },
};

const notificationSliceKey = 'notification';
const notificationSlice = createSlice({
  name: notificationSliceKey,
  initialState,
  reducers: {
    pushNotificationData: (
      state: NotificationGroup,
      {
        payload,
      }: PayloadAction<{
        alert?: Notification[];
        approval?: Notification[];
        info?: Notification[];
      }>
    ) => {
      state.notification = {
        ...state.notification,
        ...payload,
      };
    },
    pushNewNotificationData: (state: NotificationGroup, { payload }: any) => {
      if (payload.messageType === 'Info') {
        const newMessage = state.notification.info?.some(
          (ele) => ele.messageId === payload.messageId
        );
        if (!newMessage) {
          state.notification.info?.splice(0, 0, {
            ...payload,
            newMessage: true,
          });
          state.notification.newMessageCount += 1;
        }
      }

      if (payload.messageType === 'Approval') {
        const newMessage = state.notification.approval?.some(
          (ele) => ele.messageId === payload.messageId
        );
        if (!newMessage) {
          state.notification.approval?.splice(0, 0, {
            ...payload,
            newMessage: true,
          });
          state.notification.newMessageCount += 1;
        }
      }

      if (payload.messageType === 'Alert') {
        const newMessage = state.notification.alert?.some(
          (ele) => ele.messageId === payload.messageId
        );
        if (!newMessage) {
          state.notification.alert?.splice(0, 0, {
            ...payload,
            newMessage: true,
          });
          state.notification.newMessageCount += 1;
        }
      }
    },
    clearNotification: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        type: string;
      }>
    ) => {
      if (payload.type === 'Info' && state.notification.info) {
        const removingData = state.notification.info?.find(
          (notificationItem) => notificationItem.messageId === payload.id
        );
        state.notification.info = state.notification.info.filter(
          (infoNotificationItem) =>
            infoNotificationItem.messageId !== payload.id
        );
        if (removingData && removingData.newMessage) {
          state.notification.newMessageCount -= 1;
        }
      } else if (payload.type === 'Alert' && state.notification.alert) {
        const removingData = state.notification.alert?.find(
          (notificationItem) => notificationItem.messageId === payload.id
        );
        state.notification.alert = state.notification.alert.filter(
          (alertNotificationItem) =>
            alertNotificationItem.messageId !== payload.id
        );
        if (removingData && removingData.newMessage) {
          state.notification.newMessageCount -= 1;
        }
      } else if (payload.type === 'Approval' && state.notification.approval) {
        const removingData = state.notification.approval?.find(
          (notificationItem) => notificationItem.messageId === payload.id
        );
        state.notification.approval = state.notification.approval.filter(
          (approvalNotificationItem) =>
            approvalNotificationItem.messageId !== payload.id
        );
        if (removingData && removingData.newMessage) {
          state.notification.newMessageCount -= 1;
        }
      }
    },
    clearAllNotification: (
      state: NotificationGroup,
      {
        payload,
      }: PayloadAction<{
        type: string;
      }>
    ) => {
      if (payload.type === 'Info') {
        let newMessagecount = 0;
        state.notification.info?.forEach((infoNotificationItem) => {
          if (infoNotificationItem.newMessage) {
            newMessagecount += 1;
          }
        });
        state.notification.info = [];
        state.notification.newMessageCount -= newMessagecount;
      } else if (payload.type === 'Alert') {
        let newMessagecount = 0;
        state.notification.alert?.forEach((alertNotificationItem) => {
          if (alertNotificationItem.newMessage) {
            newMessagecount += 1;
          }
        });
        state.notification.alert = [];
        state.notification.newMessageCount -= newMessagecount;
      } else if (payload.type === 'Approval') {
        let newMessagecount = 0;
        state.notification.approval?.forEach((approvalNotificationItem) => {
          if (approvalNotificationItem.newMessage) {
            newMessagecount += 1;
          }
        });
        state.notification.approval = [];
        state.notification.newMessageCount -= newMessagecount;
      }
    },
    markAsRead: (state, { payload }) => {
      if (payload.type === 'Info') {
        let count = 0;
        const info = state.notification.info?.map((ele) => {
          if (ele.newMessage) {
            ele.newMessage = !ele.newMessage;
            count += 1;
          }
          return ele;
        });
        state.notification.info = info;
        state.notification.newMessageCount -= count;
      }
      if (payload.type === 'Alert') {
        let count = 0;
        const alert = state.notification.alert?.map((ele) => {
          if (ele.newMessage) {
            ele.newMessage = !ele.newMessage;
            count += 1;
          }
          return ele;
        });
        state.notification.alert = alert;
        state.notification.newMessageCount -= count;
      }
      if (payload.type === 'Approval') {
        let count = 0;
        const approval = state.notification.approval?.map((ele) => {
          if (ele.newMessage) {
            ele.newMessage = !ele.newMessage;
            count += 1;
          }
          return ele;
        });
        state.notification.approval = approval;
        state.notification.newMessageCount -= count;
      }
    },
    clearNotificationByTypeAndIds: (
      state: NotificationGroup,
      {
        payload,
      }: PayloadAction<
        {
          status?: boolean;
          messageId: string;
          messageType: string;
        }[]
      >
    ) => {
      payload.forEach((idsToClear) => {
        if (idsToClear.messageType === 'Approval') {
          const removingData = state.notification.approval?.find(
            (notificationItem) =>
              notificationItem.messageId === idsToClear.messageId
          );
          if (removingData) {
            state.notification.approval = state.notification.approval?.filter(
              (approvalNotificationItem) =>
                removingData.messageId !== approvalNotificationItem.messageId
            );
            if (removingData.newMessage) {
              state.notification.newMessageCount -= 1;
            }
          }
        } else if (idsToClear.messageType === 'Alert') {
          const removingData = state.notification.alert?.find(
            (notificationItem) =>
              notificationItem.messageId === idsToClear.messageId
          );
          if (removingData) {
            state.notification.alert = state.notification.alert?.filter(
              (alertNotificationItem) =>
                removingData.messageId !== alertNotificationItem.messageId
            );
            if (removingData.newMessage) {
              state.notification.newMessageCount -= 1;
            }
          }
        } else if (idsToClear.messageType === 'Info') {
          const removingData = state.notification.info?.find(
            (notificationItem) =>
              notificationItem.messageId === idsToClear.messageId
          );
          if (removingData) {
            state.notification.info = state.notification.info?.filter(
              (infoNotificationItem) =>
                removingData.messageId !== infoNotificationItem.messageId
            );
            if (removingData.newMessage) {
              state.notification.newMessageCount -= 1;
            }
          }
        }
      });
    },
  },
});

export const { reducer, name: sliceKey } = notificationSlice;

export const {
  pushNotificationData,
  pushNewNotificationData,
  clearNotification,
  clearAllNotification,
  markAsRead,
  clearNotificationByTypeAndIds,
} = notificationSlice.actions;
