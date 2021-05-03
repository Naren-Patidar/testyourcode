import { useEffect, useState } from 'react';
import { useInjectReducer } from 'utils/@reduxjs';
import { useDispatch, useSelector } from 'react-redux';
import { toastr } from 'shared/toastr';
import { BadgedIcon, Badge, Header, ThemeType, Tooltip } from '@scuf/common';
import { UserProfile } from 'core/authentication/models/user-profile';
import { LanguageSelector } from 'locales/LanguageSelector/LanguageSelector';
import bellIcon from 'assets/icons/alert.svg';
import { Type } from 'shared/toastr/NotificationToast';
import {
  pushNewNotificationData,
  reducer,
  sliceKey,
  clearNotificationByTypeAndIds,
} from '+store/notification/notificationSlice';
import { useUserProfile } from '+store/user-profile';
import {
  clearApprovalNotificationMessage,
  getNotificationGroup,
} from '+store/notification/effects';
import { selectNotificationGroup } from '+store/notification/selector';
import SignalRService from '../../../signalr/SignalRConnection';
import NotificationMenu from '../notification/NotificationMenu/NotificationMenu';

interface HeaderProps {
  // profile?: UserProfile;
  title: string;
  drawerOpen: () => void;
  theme: ThemeType;
  themeChange: () => void;
}
export const HeaderAppBar: React.FC<HeaderProps> = (props) => {
  const dispatch = useDispatch();
  const { profile } = useUserProfile();
  const [open, setOpen] = useState(false);
  useInjectReducer({ key: sliceKey, reducer });

  // useEffect(() => {
  //   if (!profile.displayName) {
  //     fetchUserProfile();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [profile]);

  const notificationData = useSelector(selectNotificationGroup);

  /** Making getNotification API call to get data from DB */
  useEffect(() => {
    dispatch(getNotificationGroup());
  }, [dispatch]);

  const getType = (type) => {
    switch (type) {
      case 'Approval':
        return Type.Approval;
      case 'Info':
        return Type.Info;
      default:
        return Type.Alert;
    }
  };

  /** SignalR connection, calls and handling of response */
  useEffect(() => {
    SignalRService.recevieToastMessage((res) => {
      toastr.notificationToast(
        res.messageBody,
        res.messageTitle,
        getType(res.messageType)
      );
    });
    SignalRService.receivewNotification((res) => {
      dispatch(pushNewNotificationData(res));
    });

    SignalRService.reqApproveOrReject((res) => {
      dispatch(clearNotificationByTypeAndIds(res));
    });
  }, [dispatch]);

  /** Counting new messages being pushed to Notification container */
  const newMsgCount = notificationData?.newMessageCount;

  return (
    <Header title={props.title} onMenuToggle={props.drawerOpen}>
      {/* <Header.Search
        onSearch={(searchText) => {
          console.log('Hello World');
        }}
      /> */}
      {/* <Header.IconItem
        icon={
          <Icon
            name={props.theme === ThemeType.Light ? 'sun' : 'clear-night'}
            root="common"
          />
        }
        description="Light"
        onClick={props.themeChange}
      /> */}
      {/* <Header.IconItem
        icon={<Icon name="settings" root="common" />}
        description="Settings"
      /> */}
      {/* <LanguageSelector /> */}
      {/* Bell Icon in header */}
      <Header.Item onClick={() => setOpen(true)}>
        <img src={bellIcon} alt={bellIcon} className="bell-icon" />
        {newMsgCount !== 0 ? (
          <Badge color="red" className="notification-count">
            {newMsgCount}
          </Badge>
        ) : (
          <></>
        )}
      </Header.Item>
      {/* Show notification panel */}
      <NotificationMenu
        open={open}
        setOpen={setOpen}
        notificationData={notificationData}
      />
      <Tooltip
        element={<Header.UserProfile firstName={profile?.userName || ''} />}
        content={' '}
        header={profile?.userName || ''}
        hoverable
        position="bottom center"
      />
    </Header>
  );
};
