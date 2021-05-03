/* eslint-disable @typescript-eslint/no-use-before-define */
import { useCallback, useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useDialog } from 'shared/dialog';
import { useDidUpdate } from 'utils/hooks';
import { ConfirmDialog, ConfirmDialogProps } from './ConfirmDialog';
import { ConfirmDialogOptions } from './ConfirmDialogOptions';

function createElementConfirmDialog(properties: ConfirmDialogProps) {
  let divTarget = document.querySelector('#prod-portal-confirm-dialog');
  if (divTarget) {
    render(<ConfirmDialog {...properties} />, divTarget);
  } else {
    // Mount the ConfirmDialog component
    divTarget = document.createElement('div');
    divTarget.id = 'prod-portal-confirm-dialog';
    document.body.appendChild(divTarget);
    render(<ConfirmDialog {...properties} />, divTarget);
  }
}
interface ConfirmReturnProps {
  confirmed: boolean;
  comments?: string;
}
export const useConfirm = (): {
  show: (options?: ConfirmDialogOptions) => Promise<ConfirmReturnProps>;
} => {
  const [open, setOpen] = useState(false);
  // const [comments, setComments] = useState('');
  const awaitingPromiseRef = useRef<{
    resolve: (data: ConfirmReturnProps) => void;
  }>();
  const [
    dialogOptions,
    setDialogOptions,
  ] = useState<ConfirmDialogOptions | null>(null);

  const onCloseHandler = () => {
    setOpen(false);
    hideDialog();
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve({ confirmed: false });
    }
  };
  const onConfirmHandler = (data?: string) => {
    // setComments(data || '');
    setOpen(false);
    hideDialog();
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve({ confirmed: true, comments: data });
    }
  };
  const [dialogProps, setDialogProps] = useState<ConfirmDialogProps | null>(
    null
  );

  const [showDialog, hideDialog] = useDialog(
    () => dialogProps && <ConfirmDialog {...dialogProps} />,
    [dialogProps]
  );
  useEffect(() => {
    setDialogProps({
      ...dialogOptions,
      open,
      onClose: onCloseHandler,
      onConfirm: onConfirmHandler,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOptions, open]);
  // useDidUpdate(() => {
  //   createElementConfirmDialog(updatedProps);
  // }, []);
  useEffect(() => {
    if (dialogProps && open) {
      showDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogProps, open]);

  const show = (options?: ConfirmDialogOptions) => {
    if (options) {
      setDialogOptions(options);
    }

    setOpen(true);
    return new Promise<ConfirmReturnProps>((res) => {
      awaitingPromiseRef.current = { resolve: res };
    });
  };

  return { show };
};
