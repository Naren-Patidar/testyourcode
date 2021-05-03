/* eslint-disable camelcase */

export interface Notification {
  messageId: string;
  isActionReqd?: boolean;
  messageTitle: string;
  messageBody: string;
  isAcknowledged?: boolean;
  messageType?: string; //If its info then show 'green' cross button else if alert show 'red' cross button
  actionName?: string;
  source?: string;
  createdOn?: string;
  newMessage?: boolean;
}
