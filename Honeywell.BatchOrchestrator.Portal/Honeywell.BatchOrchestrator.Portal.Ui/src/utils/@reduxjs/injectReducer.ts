import { createReducer } from '+store/reducers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function injectReducerFactory(store) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function injectReducer(key, reducer) {
    // Check for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    )
      return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(store.createReducer(store.injectedReducers));
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getInjectors(store) {
  return {
    injectReducer: injectReducerFactory(store),
  };
}
