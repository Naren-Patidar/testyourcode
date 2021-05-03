import './Toastr.scss';
import { Notification } from '@scuf/common';

interface ToastrProps {
  title: string;
  message: string;
  type: 'critical' | 'important' | 'information' | 'success';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeToast: any;
}
export const Toastr: React.FC<ToastrProps> = ({
  title,
  message,
  type,
  closeToast,
}) => {
  return (
    <Notification
      className="toast-notification"
      hasIcon
      title={title}
      severity={type}
      onCloseClick={closeToast}
    >
      {message}
    </Notification>
  );
};
