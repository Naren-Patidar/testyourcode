import { memo, useState, useEffect, ComponentType } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  DialogPropsType,
  DialogType,
  initialDialogProps,
} from './context/DialogContext';

interface DialogRootProps {
  /**
   * Map of dialog instances associated by unique ids
   */
  dialogs: Record<string, DialogType>;
}

/**
 * Dialog renderer props
 */
interface DialogRendererProps {
  /**
   * Functional component representing the dialog
   */
  component: DialogType;
}

/**
 * Component responsible for rendering the dialog.
 *
 * The identity of `Component` may change dependeing on the inputs passed to
 * `useDialog`. If we simply rendered `<Component />` then the dialog would be
 * susceptible to rerenders whenever one of the inputs change.
 */
const DialogRenderer = memo(({ component, ...rest }: DialogRendererProps) =>
  component({ ...rest })
);

/**
 * Dialog Root
 *
 * Renders dialogs using react portal.
 */
export const DialogRoot = memo(({ dialogs }: DialogRootProps) => {
  const [mountNode, setMountNode] = useState<Element | undefined>(undefined);

  // This effect will not be ran in the server environment
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMountNode(document.body), []);

  return mountNode
    ? ReactDOM.createPortal(
        <>
          {Object.keys(dialogs).map((key) => (
            <DialogRenderer key={key} component={dialogs[key]} />
          ))}
        </>,
        mountNode
      )
    : null;
});
