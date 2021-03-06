/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader } from '@scuf/common';
import React, { lazy, Suspense } from 'react';

// interface Opts {
//   fallback: React.ReactNode;
// }
type Unpromisify<T> = T extends Promise<infer P> ? P : never;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const lazyLoad = <
  T extends Promise<any>,
  U extends React.ComponentType<any>
>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U
  // opts: Opts = { fallback: <Loader /> }
) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = () =>
      importFunc().then((module) => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazy(lazyFactory);

  return (props: React.ComponentProps<U>): JSX.Element => (
    <Suspense fallback={<Loader />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
