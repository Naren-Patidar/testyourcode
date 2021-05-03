import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/@reduxjs';
import { getVersion, getAdvanceBatchLicense } from './effects';
import { selectSidebarOpen, selectVersion, selectLicense } from './selectors';
import { actions, reducer, sliceKey } from './slice';

export const useAppShellFacade = () => {
  useInjectReducer({ key: sliceKey, reducer });
  const sidebarOpen = useSelector(selectSidebarOpen);
  const version = useSelector(selectVersion);
  const advancedBatchLicense = useSelector(selectLicense);
  const dispatch = useDispatch();

  const fetchVersion = useCallback(() => {
    dispatch(getVersion());
  }, [dispatch]);
  const toggleSidebar = useCallback(() => {
    dispatch(actions.toggleSidebar());
  }, [dispatch]);
  const setSidebar = useCallback(
    (data: boolean) => {
      dispatch(actions.setSidebar(data));
    },
    [dispatch]
  );

  const fetchAdvancedBatchLicense = useCallback(() => {
    dispatch(getAdvanceBatchLicense());
  }, [dispatch]);

  return {
    sidebarOpen,
    version,
    advancedBatchLicense,
    fetchVersion,
    setSidebar,
    toggleSidebar,
    fetchAdvancedBatchLicense,
  };
};
