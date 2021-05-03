/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
import React, { createContext } from 'react';
import { ConnectedBatchManagementController } from './create-batch-controller';
import { createBatchInitialState } from '../../../../+store/formula/reducers/create-batch';

// get the initial data/state
export const createBatchContextDefaultValue = {
  ...createBatchInitialState,
};

//Create the conetext using initial data/state
const BatchManagementContext = createContext(createBatchContextDefaultValue);

//Export Provider and Consumer
export const BatchManagementContextProvider = BatchManagementContext.Provider;
export const BatchManagementContextConsumer = BatchManagementContext.Consumer;

//Export the context
export const withBatchManagementContext = (Component) => (props) => (
  <ConnectedBatchManagementController>
    <BatchManagementContextConsumer>
      {(ctx) => <Component {...props} {...ctx} />}
    </BatchManagementContextConsumer>
  </ConnectedBatchManagementController>
);
