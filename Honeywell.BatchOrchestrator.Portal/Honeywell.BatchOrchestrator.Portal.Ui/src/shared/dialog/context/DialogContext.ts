import { createContext } from 'react';
import { Modal } from '@scuf/common';

export type DialogType = React.FC<any>;
export type DialogPropsType = JSX.LibraryManagedAttributes<
  typeof Modal,
  Modal['props']
>;
export interface DialogContextType {
  showDialog(key: string, component: DialogType): void;
  hideDialog(key: string): void;
}
export const initialDialogProps: DialogPropsType = {
  closeIcon: true,
  closeOnDimmerClick: false,
  closeOnDocumentClick: false,
  open: false,
  size: 'small',
};
const invariantViolation = () => {
  throw new Error(
    'useDialog is called outside of dialog context. Make sure your app is rendered inside DialogWrapper.'
  );
};

export const DialogContext = createContext<DialogContextType>({
  showDialog: invariantViolation,
  hideDialog: invariantViolation,
});
