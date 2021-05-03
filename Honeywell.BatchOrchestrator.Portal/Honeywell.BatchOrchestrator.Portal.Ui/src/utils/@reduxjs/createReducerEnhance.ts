// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createReducerEnhancer(params: {
  createReducer: any;
  injectedReducers: any;
}) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (createStore) => (...args) => {
    const store = createStore(...args);

    return {
      ...store,
      createReducer: params.createReducer,
      injectedReducers: params.injectedReducers,
    };
  };
}
