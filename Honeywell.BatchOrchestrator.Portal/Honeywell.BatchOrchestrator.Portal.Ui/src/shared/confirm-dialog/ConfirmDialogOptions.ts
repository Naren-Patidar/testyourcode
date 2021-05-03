export interface ConfirmDialogOptions {
  // catchOnCancel?: boolean;
  title?: string;
  message?: string;
  note?: string;
  messageLength?: number;
  cancelText?: string;
  confirmText?: string;
  showCommentBox?: boolean;
  commentsRequired?: boolean;
  comments?: string;
  type?: 'confirm' | 'alert';
}
