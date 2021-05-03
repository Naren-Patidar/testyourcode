/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-cycle */
import React, { createContext } from 'react';
import { ConnectedAppSettingsController } from './app-settings-controller';
import { appSettingsInitialState } from '../../../../+store/app-settings/reducers/app-settings';

// Create the context
export const appSettingsContextDefaultValue = {
  ...appSettingsInitialState,
};

const AppSettingsContext = createContext(appSettingsContextDefaultValue);

// Export Provider and Consumer

export const AppSettingsContextProvider = AppSettingsContext.Provider;
export const AppSettingsContextConsumer = AppSettingsContext.Consumer;

export const withAppSettingsContext = (Component) => (props) => (
  <ConnectedAppSettingsController>
    <AppSettingsContextConsumer>
      {(ctx) => <Component {...props} {...ctx} />}
    </AppSettingsContextConsumer>
  </ConnectedAppSettingsController>
);
