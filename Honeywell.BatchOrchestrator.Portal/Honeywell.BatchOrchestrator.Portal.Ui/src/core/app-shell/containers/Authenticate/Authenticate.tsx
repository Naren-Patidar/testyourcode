/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import SignalRService, { HubMethods } from 'core/signalr/SignalRConnection';
import { useCallback, useEffect } from 'react';
import { useConfirm } from 'shared/confirm-dialog';
import { Loader } from '@scuf/common';
import { AppConstants } from 'utils/app-constants';
import { useUserProfile } from '+store/user-profile';
import { UnAuthorizedAccess } from '../UnAuthorizedAccess/UnAuthorizedAccess';

export const AuthenticateView: React.FC = ({ children }) => {
  const { authenticated, authenticating, fetchUserProfile } = useUserProfile();
  const confirm = useConfirm();
  const raiseAlert = async (message: string) => {
    const { confirmed } = await confirm.show({
      title: 'Alert',
      confirmText: 'Ok',
      message,
      type: 'alert',
    });
  };
  useEffect(() => {
    fetchUserProfile();
    return () => {
      if (SignalRService) {
        SignalRService.removeHandlers([HubMethods.OnPermissionsUpdated]);
      }
    };
  }, []);
  // useEffect(() => {
  //   if (authenticated !== null && !authenticated) {
  //     raiseAlert(AppConstants.AUTHENTICATION_FAILED);
  //   }
  // }, [authenticated]);
  const OnPermissionsUpdated = useCallback(() => {
    if (SignalRService) {
      SignalRService.OnPermissionsUpdated(() => {
        fetchUserProfile();
      });
    }
  }, []);
  useEffect(() => {
    OnPermissionsUpdated();
  }, []);
  return (
    <>
      {authenticating ? (
        <Loader />
      ) : authenticated ? (
        children
      ) : (
        <UnAuthorizedAccess
          title="Failed to fetch user profile"
          message="Could not fetch user profile"
        />
      )}
    </>
  );
};
