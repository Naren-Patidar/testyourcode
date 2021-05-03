import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/@reduxjs';
import { getUserProfile } from './effects';
import {
  selectUserAuthenticated,
  // eslint-disable-next-line import/named
  selectUserAuthenticating,
  selectUserProfile,
} from './selectors';
import { userProfileReducer, userProfileSliceKey } from './slice';

export const useUserProfile = () => {
  useInjectReducer({ key: userProfileSliceKey, reducer: userProfileReducer });
  const profile = useSelector(selectUserProfile);
  const authenticated = useSelector(selectUserAuthenticated);
  const authenticating = useSelector(selectUserAuthenticating);
  const dispatch = useDispatch();

  const fetchUserProfile = useCallback(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return {
    profile,
    authenticated,
    authenticating,
    fetchUserProfile,
  };
};
