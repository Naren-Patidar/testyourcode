/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { toast, Slide } from 'react-toastify';
import { Toastr } from './Toastr';
import { Snackbar } from './Snackbar';
import { NotificationToast, Type } from './NotificationToast';
import { Banner, BannerType } from './Banner';

const success = (message: string, title?: string) => {
  toast(
    <Toastr
      title={title || ''}
      message={message}
      type="success"
      closeToast={false}
    />
  );
};

const error = (message: string, title?: string) => {
  toast(
    <Toastr
      title={title || ''}
      message={message}
      type="critical"
      closeToast={false}
    />
  );
};
const warning = (message: string, title?: string) => {
  toast(
    <Toastr
      title={title || ''}
      message={message}
      type="important"
      closeToast={false}
    />
  );
};
const info = (message: string, title?: string) => {
  toast(
    <Toastr
      title={title || ''}
      message={message}
      type="information"
      closeToast={false}
    />
  );
};
const banner = (
  title: string,
  message: string,
  type?: BannerType,
  action?: () => void
) => {
  toast(
    <Banner title={title} message={message} type={type} action={action} />,
    {
      autoClose: 3000,
      closeOnClick: true,
      transition: Slide,
      position: 'top-center',
      className: 'banner-container',
      bodyClassName: 'banner-body',
    }
  );
};
const snackbar = (message: string) => {
  toast.dark(<Snackbar message={message} />, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};
const notificationToast = (
  message: string,
  title?: string,
  type?: Type,
  action?: boolean
) => {
  toast.dark(
    <NotificationToast
      message={message}
      title={title || ''}
      type={type}
      action={action || false}
    />,
    {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    }
  );
};
export const toastr = {
  success,
  error,
  info,
  warning,
  snackbar,
  notificationToast,
  banner,
};
