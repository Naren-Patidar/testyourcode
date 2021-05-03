import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { SIGNALR_URL } from 'utils/Settings';

export const HubMethods = {
  OnCampaignStatusChanged: 'OnCampaignStatusChanged',
  OnBatchStatusChanged: 'OnBatchStatusChanged',
  OnRecipeModificationDetected: 'OnRecipeModificationDetected',
  OnSendMessageByConnectionId: 'OnSendMessageByConnectionId',
  OnSendToastMessage: 'OnSendToastMessage',
  OnApproveOrReject: 'OnApproveOrReject',
  OnPermissionsUpdated: 'OnPermissionsUpdated',
};
class SignalRController {
  rConnection: HubConnection;

  constructor() {
    this.rConnection = new HubConnectionBuilder()
      .withUrl(`${SIGNALR_URL}notify`, {
        transport: HttpTransportType.LongPolling,
        withCredentials: true,
      })
      .build();

    this.rConnection
      .start()
      .then((e) => {
        console.log('Connect started', this.rConnection.connectionId);
      })
      .catch((err) => {
        console.log('signalr connection error');
      });
  }

  removeHandlers = (hubMethods: string[]) => {
    hubMethods.forEach((method) => {
      this.rConnection?.off(method);
    });
  };

  onCampaignStatusChanged = (callback) => {
    this.rConnection?.on(HubMethods.OnCampaignStatusChanged, (res) => {
      callback(res);
    });
  };

  OnBatchStatusChanged = (callback) => {
    this.rConnection?.on(HubMethods.OnBatchStatusChanged, (res) => {
      callback(res);
    });
  };

  OnRecipeModificationDetected = (callback) => {
    this.rConnection?.on(HubMethods.OnRecipeModificationDetected, (res) => {
      callback(res);
    });
  };

  receivewNotification = (callback) => {
    this.rConnection?.on(HubMethods.OnSendMessageByConnectionId, (res) => {
      callback(res);
    });
  };

  recevieToastMessage = (callback) => {
    this.rConnection?.on(HubMethods.OnSendToastMessage, (res) => {
      callback(res);
    });
  };

  reqApproveOrReject = (callback) => {
    this.rConnection?.on(HubMethods.OnApproveOrReject, (res) => {
      callback(res);
    });
  };

  OnPermissionsUpdated = (callback) => {
    this.rConnection?.on(HubMethods.OnPermissionsUpdated, (res) => {
      callback(res);
    });
  };
}

const SignalRService = new SignalRController();
export default SignalRService;
