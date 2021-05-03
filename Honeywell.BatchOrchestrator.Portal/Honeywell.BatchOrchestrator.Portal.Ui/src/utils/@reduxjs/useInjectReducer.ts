import { useRef } from 'react';
import { useStore } from 'react-redux';
import getInjectors from './injectReducer';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useInjectReducer = ({ key, reducer }) => {
  const store = useStore();

  const isInjected = useRef(false);

  if (!isInjected.current) {
    getInjectors(store).injectReducer(key, reducer);
    isInjected.current = true;
  }
};
