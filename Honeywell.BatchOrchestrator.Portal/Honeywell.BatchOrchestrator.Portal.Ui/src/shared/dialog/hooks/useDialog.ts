import {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  DependencyList,
} from 'react';
import {
  DialogContext,
  DialogPropsType,
  DialogType,
  initialDialogProps,
} from '../context/DialogContext';

/**
 * Callback types provided for descriptive type-hints
 */
type ShowDialog = () => void;
type HideDialog = () => void;
/**
 * Utility function to generate unique number per component instance
 */
const generateDialogKey = (() => {
  let count = 0;

  // eslint-disable-next-line no-plusplus
  return () => `${++count}`;
})();
/**
 * Check whether the argument is a stateless component.
 *
 * We take advantage of the stateless nature of functional components to be
 * inline the rendering of the dialog component as part of another immutable
 * component.
 *
 * This is necessary for allowing the dialog to update based on the inputs passed
 * as the second argument to useDialog without unmounting the previous version of
 * the dialog component.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const isFunctionalComponent = (Component: Function) => {
  const { prototype } = Component;

  return !prototype || !prototype.isReactComponent;
};

/**
 * React hook for showing dialog windows
 */
export const useDialog = (
  component: DialogType,
  inputs: DependencyList = []
): [ShowDialog, HideDialog] => {
  if (!isFunctionalComponent(component)) {
    throw new Error(
      'Only stateless components can be used as an argument to useDialog. You have probably passed a class component where a function was expected.'
    );
  }
  const key = useMemo(generateDialogKey, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dialog = useMemo(() => component, inputs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const dialogOptions = useMemo(() => options, []);
  const context = useContext(DialogContext);
  const [isShown, setShown] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const showDialog = useCallback(() => setShown(true), []);
  const hideDialog = useCallback(() => setShown(false), []);

  useEffect(() => {
    if (isShown) {
      context.showDialog(key, dialog);
    } else {
      context.hideDialog(key);
    }
    // Hide dialog when parent component unmounts
    return () => context.hideDialog(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog, isShown]);

  return [showDialog, hideDialog];
};
