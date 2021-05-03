/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */

import React, { createContext } from 'react';
import { ConnectedExperionModificationController } from './experion-modification-controller';
import { experionModificationInitialState } from '../../../../+store/formula/reducers/experion-modification';

// Create the context
export const experionModificationContextDefaultValue = {
  ...experionModificationInitialState,
};

const ExperionModificationContext = createContext(
  experionModificationContextDefaultValue
);

// Export Provider and Consumer

export const ExperionModificationContextProvider =
  ExperionModificationContext.Provider;
export const ExperionModificationContextConsumer =
  ExperionModificationContext.Consumer;

export const withExperionModificationContext = (Component) => (props) => (
  <ConnectedExperionModificationController>
    <ExperionModificationContextConsumer>
      {(ctx) => <Component {...props} {...ctx} />}
    </ExperionModificationContextConsumer>
  </ConnectedExperionModificationController>
);
