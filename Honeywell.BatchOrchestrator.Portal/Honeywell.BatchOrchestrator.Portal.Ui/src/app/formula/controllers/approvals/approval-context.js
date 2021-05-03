/* eslint-disable import/no-cycle */
import React, { createContext } from 'react';
import { ConnectedApprovalController } from './approval-controller';
import { approvalInitialState } from '+store/formula/reducers/approval';

// Create the context
export const ApprovalContextDefaultValue = {
  ...approvalInitialState,
};

const ApprovalContext = createContext(approvalInitialState);

// Export Provider and Consumer

export const ApprovalContextProvider = ApprovalContext.Provider;
export const ApprovalContextConsumer = ApprovalContext.Consumer;

export const withApprovalContext = (Component) => (props) => (
  <ConnectedApprovalController>
    <ApprovalContextConsumer>
      {(ctx) => <Component {...props} {...ctx} />}
    </ApprovalContextConsumer>
  </ConnectedApprovalController>
);
