/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDidUpdate = (callback, dependencyList: ReadonlyArray<any>) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      callback();
    } else {
      didMountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...dependencyList]);
};
