import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createReducerEnhancer } from 'utils/@reduxjs';
import logger from 'redux-logger';
import { createReducer } from './reducers';
import * as appReducers from './index';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function configureAppStore() {
  const enhancers = [
    createReducerEnhancer({
      createReducer,
      injectedReducers: { ...appReducers },
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [
      ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
      // logger,
    ],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
  });
  return store;
}
