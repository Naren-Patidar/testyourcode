import { Notification } from '../../core/app-shell/components/notification/model/notification';

export interface NotificationGroup {
  notification: {
    alert?: Notification[];
    approval?: Notification[];
    info?: Notification[];
    newMessageCount: number;
  };
}
