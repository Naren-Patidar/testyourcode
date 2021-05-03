import { useCallback, useState, useMemo } from 'react';
import * as React from 'react';
import {
  DialogType,
  DialogContext,
  DialogPropsType,
  initialDialogProps,
} from './DialogContext';
import { DialogRoot } from '../DialogRoot';

/**
 * Dialog Provider Props
 */
export interface DialogProviderProps {
  /**
   * Container component for dialog nodes
   */
  rootComponent?: React.ComponentType<any>;

  /**
   * Subtree that will receive dialog context
   */
  children: React.ReactNode;
}

/**
 * Dialog Provider
 *
 * Provides dialog context and renders DialogRoot.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const DialogWrapper = ({ children }: DialogProviderProps) => {
  const [dialogs, setDialogs] = useState<Record<string, DialogType>>({});
  const [options, setDialogOptions] = useState<DialogPropsType>(
    initialDialogProps
  );

  const showDialog = useCallback(
    (key: string, modal: DialogType) =>
      setDialogs((modals) => ({
        ...modals,
        [key]: modal,
      })),
    []
  );
  const hideDialog = useCallback(
    (key: string) =>
      setDialogs((d) => {
        if (!d[key]) {
          return d;
        }
        const newModals = { ...d };
        delete newModals[key];
        return newModals;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const contextValue = useMemo(
    () => ({ showDialog, hideDialog }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <DialogContext.Provider value={contextValue}>
      <>
        {children}
        <DialogRoot dialogs={dialogs} />
      </>
    </DialogContext.Provider>
  );
};
