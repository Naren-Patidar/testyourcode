/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { httpClient } from '../../../../http-client/http-client';
import { Notification } from '../model/notification';

// controller name
const CONTROLLER = 'Notification';
// api routes/endpoint
const GET_NOTIFICATIONBYGROUP = 'GetNotificationsByGroup';
const ClearNotificationById = 'ClearNotification​';
export const notificationAPI = {
  getNotificationByGroup: () => {
    return httpClient.get<Notification[]>(
      `${CONTROLLER}/${GET_NOTIFICATIONBYGROUP}`
    );
  },
  ClearNotificationById: (id: string) =>
    httpClient.delete<Notification[]>(`${CONTROLLER}/ClearNotification/${id}`),
  createNotification: () =>
    httpClient.post<Notification[]>(`${CONTROLLER}/CreateNotificationTest`),
  ClearApprovalNotification: () =>
    httpClient.delete<Notification[]>(`${CONTROLLER}/ClearNotification`),
  ClearAllNotification: (payload) =>
    httpClient.post<Notification[]>(
      `${CONTROLLER}/ClearAllNotification`,
      payload
    ),
};
