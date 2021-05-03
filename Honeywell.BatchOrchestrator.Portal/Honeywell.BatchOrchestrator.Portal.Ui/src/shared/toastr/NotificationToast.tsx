import { Icon, Card, Button } from '@scuf/common';
import './NotificationToast.scss';

export enum Type {
  Approval,
  Info,
  Alert,
}

export const NotificationToast: React.FC<{
  message: string;
  title?: string;
  type?: Type;
  action: boolean;
}> = ({ message, title, type, action }) => {
  /** Code for applying buttons on Toast messages */
  const footer = (
    <div className="pt-2 d-flex w-100 justify-content-between">
      <Button type="link" content="View" />
      <Button type="link" content="Action" />
    </div>
  );
  return (
    <div className="notification-toast-card">
      <Card>
        <Icon root="common" name="close" className="close" size="small" />
        <Card.Header title={title}>
          {type === Type.Alert ? (
            <div className="unread-msg red">
              <Icon root="common" name="email-unread" size="small" />
            </div>
          ) : (
            <div className="unread-msg green">
              <Icon root="common" name="email-unread" size="small" />
            </div>
          )}
        </Card.Header>
        <Card.Content style={{ 'font-weight': '100' }}>
          {message}
          {action && footer}
        </Card.Content>
      </Card>
    </div>
  );
};
