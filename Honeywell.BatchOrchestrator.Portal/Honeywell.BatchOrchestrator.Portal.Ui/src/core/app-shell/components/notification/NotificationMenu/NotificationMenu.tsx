import { Accordion, Badge, Button, Card, Icon, Tooltip } from '@scuf/common';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import pinIcon from 'assets/icons/pin-icon.svg';
import { AppRoutes } from 'routing/app.route-names';
import { useInjectReducer } from 'utils/@reduxjs';
import {
  toUtcMoment,
  toLocalTimeStringFormatted,
} from 'app/../utils/date-utils';
import { useClickInside, useClickOutSide } from 'utils/hooks';
import {
  clearAllNotificationMessages,
  clearNotificationMessages,
  createNewNotification,
} from '+store/notification/effects';
import {
  markAsRead,
  reducer,
  sliceKey,
} from '+store/notification/notificationSlice';
import { BlurredBackdrop } from '../../BlurredBackdrop/BlurredBackdrop';
import './NotificationMenu.scss';

/** Component to render notification Message Body */
const MessageBody = ({ data, actionHandler }) => {
  const [showMore, setShowMore] = useState(false);
  const [text, setText] = useState(
    data.messageBody.length > 95 ? 'Read more' : ''
  );

  const handleClick = (e) => {
    e.preventDefault();
    setText(showMore ? 'Read more' : 'Read less');
    setShowMore(!showMore);
  };

  return (
    <>
      <div className={showMore ? '' : 'max-content'}>{data.messageBody}</div>

      <div className="d-flex w-100 pt-2">
        <div className="mr-auto readmore-action">
          <Button type="link" content={text} onClick={handleClick} />
        </div>

        {data.messageType === 'Approval' && (
          <Link
            to={{
              pathname: AppRoutes.VIEW_APPROVALS.path,
              state: data.source,
            }}
            href="/#"
          >
            <Button
              type="link"
              content={data.actionText}
              onClick={actionHandler}
            />
          </Link>
        )}
        {data.messageType === 'Alert' && (
          <div className="ml-auto">
            <Button
              type="link"
              content={data.actionText}
              onClick={actionHandler}
            />
          </div>
        )}
        {data.messageType === 'Info' && (
          <div className="ml-auto">
            <Button
              type="link"
              content={data.actionText}
              onClick={actionHandler}
            />
          </div>
        )}
      </div>
    </>
  );
};

const NotificationMenu: React.FC<{
  open: boolean;
  setOpen: any;
  notificationData: any;
}> = ({ open, setOpen, notificationData }) => {
  const [accordianActive, setAccordianActive] = useState('APPROVAL');
  const [accArray, setAccArray] = useState<Array<any>>([]);
  const dispatch = useDispatch();
  useInjectReducer({ key: sliceKey, reducer });
  const notificationRef = useRef(null);
  const closeNotificationBar = () => {
    setOpen(false);
  };
  useClickInside(notificationRef, closeNotificationBar);
  /** Mark notifications as read on accordion toggle */
  const clearState = () => {
    if (accordianActive === 'APPROVAL') {
      dispatch(markAsRead({ type: 'Approval' }));
    }
    if (accordianActive === 'ALERT') {
      dispatch(markAsRead({ type: 'Alert' }));
    }
    if (accordianActive === 'INFO') {
      dispatch(markAsRead({ type: 'Info' }));
    }
  };

  /** API call to clear notification by messageId */
  const clearNotification = (id: string, type: string) => {
    dispatch(clearNotificationMessages({ id, type }));
  };

  /** Test API call to create notification */
  // const createNotification = () => {
  //   dispatch(createNewNotification());
  // };

  /** API call to clear all notification */
  const clearAll = (id: any, type: string) => {
    dispatch(clearAllNotificationMessages({ id, type }));
  };

  const alerts = notificationData.alert;
  const infos = notificationData.info;
  const approvals = notificationData.approval;

  /** Accordion title component with Bagde to indicate new notification */
  const Title = ({ title, type }) => {
    return (
      <div style={{ display: 'flex' }}>
        {notificationData[type] && notificationData[type][0]?.newMessage && (
          <Badge
            color="blue"
            className="cat-badge"
            style={{ alignSelf: 'center', marginRight: 5 }}
            empty
          />
        )}
        <div>
          {title} ({notificationData[type]?.length})
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`notification-menu-wrapper ${open ? '' : 'collapsed'}`}>
        {/* Pin icon will be used when pin functionality is introduced */}
        {/* <img src={pinIcon} alt={pinIcon} className="pl-3" /> */}

        {/* Create notication button for testing purpose */}
        {/* <button type="button" style={{ padding: 3 }} onClick={createNotification}>
        Create Notification
      </button> */}

        <Icon
          root="common"
          name="close"
          size="small"
          className="close"
          onClick={() => setOpen(false)}
        />
        {approvals?.length === 0 &&
          alerts?.length === 0 &&
          infos?.length === 0 && (
            <div className="text-center pt-5">
              <Icon root="common" name="badge-important" size="large" />
              <p className="pt-2">There are no notification to display</p>
            </div>
          )}

        <Accordion className="pt-5 pl-3">
          {/* Accordion for approval notification */}

          {approvals?.length > 0 ? (
            <Accordion.Content
              title={<Title title="Approvals" type="approval" />}
              active={accordianActive === 'APPROVAL'}
              onClick={() => {
                clearState();
                setAccordianActive(
                  accordianActive === 'APPROVAL' ? '' : 'APPROVAL'
                );
              }}
            >
              {approvals &&
                approvals.map((approval) => (
                  <Link
                    to={{
                      pathname: AppRoutes.VIEW_APPROVALS.path,
                      state: approval.source,
                    }}
                    href="/#"
                    onClick={() => {
                      setOpen(false);
                      clearState();
                    }}
                  >
                    <Card>
                      <Card.Header title={approval.messageTitle}>
                        <div className="unread-msg green">
                          <Icon
                            root="common"
                            name="email-unread"
                            size="small"
                          />
                        </div>
                        <Tooltip
                          element={
                            <span className="small">
                              {toUtcMoment(approval.createdOn).fromNow()}
                            </span>
                          }
                          content={toLocalTimeStringFormatted(
                            approval.createdOn
                          )}
                          size="mini"
                          position="bottom right"
                        />
                        <div className="new-msg">
                          {approval.newMessage && <Badge color="blue" empty />}
                        </div>
                      </Card.Header>
                      <Card.Content style={{ fontWeight: '100' }}>
                        <MessageBody
                          data={approval}
                          actionHandler={() => {
                            setOpen(false);
                            clearState();
                          }}
                        />
                      </Card.Content>
                    </Card>
                  </Link>
                ))}
            </Accordion.Content>
          ) : (
            []
          )}
          {/* Accordion for Alert Notifications */}
          {alerts?.length > 0 ? (
            <Accordion.Content
              title={<Title title="Alerts" type="alert" />}
              active={accordianActive === 'ALERT'}
              onClick={() => {
                clearState();
                setAccordianActive(accordianActive === 'ALERT' ? '' : 'ALERT');
              }}
            >
              <div className="clearall-btn">
                <Button
                  type="link"
                  content="Clear All"
                  onClick={() =>
                    clearAll(
                      alerts.map(({ messageId }) => messageId),
                      'Alert'
                    )
                  }
                />
              </div>
              {alerts &&
                alerts.map((alert) => (
                  <Card>
                    <Card.Header title={alert.messageTitle}>
                      <div className="unread-msg red">
                        <Icon root="common" name="email-unread" size="small" />
                      </div>
                      <Tooltip
                        element={
                          <span className="small">
                            {toUtcMoment(alert.createdOn).fromNow()}
                          </span>
                        }
                        content={toLocalTimeStringFormatted(alert.createdOn)}
                        size="mini"
                        position="bottom right"
                      />
                      <div className="new-msg">
                        {alert.newMessage && <Badge color="blue" empty />}
                      </div>
                    </Card.Header>
                    <Card.Content style={{ fontWeight: '100' }}>
                      <MessageBody
                        data={alert}
                        actionHandler={() =>
                          clearNotification(`${alert.messageId}`, 'Alert')
                        }
                      />
                    </Card.Content>
                  </Card>
                ))}
            </Accordion.Content>
          ) : (
            []
          )}
          {/* Accordion for Info Notifications */}

          {infos?.length > 0 ? (
            <Accordion.Content
              title={<Title title="Infos" type="info" />}
              active={accordianActive === 'INFO'}
              onClick={() => {
                clearState();
                setAccordianActive(accordianActive === 'INFO' ? '' : 'INFO');
              }}
            >
              <div className="clearall-btn">
                <Button
                  type="link"
                  content="Clear All"
                  onClick={() =>
                    clearAll(
                      infos.map(({ messageId }) => messageId),
                      'Info'
                    )
                  }
                />
              </div>
              {infos &&
                infos.map((info) => (
                  <Card>
                    <Card.Header title={info.messageTitle}>
                      <div className="unread-msg green">
                        <Icon root="common" name="email-unread" size="small" />
                      </div>
                      <Tooltip
                        element={
                          <span className="small">
                            {toUtcMoment(info.createdOn).fromNow()}
                          </span>
                        }
                        content={toLocalTimeStringFormatted(info.createdOn)}
                        size="mini"
                        position="bottom right"
                      />
                      <div className="new-msg">
                        {info.newMessage && <Badge color="blue" empty />}
                      </div>
                    </Card.Header>
                    <Card.Content style={{ fontWeight: '100' }}>
                      <MessageBody
                        data={info}
                        actionHandler={() =>
                          clearNotification(`${info.messageId}`, 'Info')
                        }
                      />
                    </Card.Content>
                  </Card>
                ))}
            </Accordion.Content>
          ) : (
            []
          )}
        </Accordion>
      </div>

      {open && <BlurredBackdrop show={open} ref={notificationRef} />}
    </>
  );
};

export default NotificationMenu;
