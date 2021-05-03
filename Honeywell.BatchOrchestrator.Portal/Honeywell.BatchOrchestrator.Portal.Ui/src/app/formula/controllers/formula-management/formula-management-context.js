/* eslint-disable import/no-cycle */
import React, { createContext } from 'react';
import { ConnectedFormulaManagementController } from './formula-management-controller';
import { formulaManagementInitialState } from '+store/formula/reducers/formula-management';

// Create the context
export const formulaManagementContextDefaultValue = {
  ...formulaManagementInitialState,
};

const FormulaManagementContext = createContext(
  formulaManagementContextDefaultValue
);

// Export Provider and Consumer

export const FormulaManagementContextProvider =
  FormulaManagementContext.Provider;
export const FormulaManagementContextConsumer =
  FormulaManagementContext.Consumer;

export const withFormulaManagementContext = (Component) => (props) => (
  <ConnectedFormulaManagementController>
    <FormulaManagementContextConsumer>
      {(ctx) => <Component {...props} {...ctx} />}
    </FormulaManagementContextConsumer>
  </ConnectedFormulaManagementController>
);
