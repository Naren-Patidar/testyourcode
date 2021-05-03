import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { DialogWrapper } from 'shared/dialog';
import { AppConstants } from 'utils/app-constants';
// import SignalRConnection from 'core/signalr/signalr-connection';
import { ErrorBoundaryContainer } from 'core/error/ErrorBoundary';
import { AppContainer } from '../core/app-shell';
import { configureAppStore } from '+store/configureStore';
import 'locales/i18n';

// const signalR = SignalRConnection();
const store = configureAppStore();
export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={AppConstants.BASE_URL}>
        <ErrorBoundaryContainer>
          <DialogWrapper>
            <AppContainer />
          </DialogWrapper>
        </ErrorBoundaryContainer>
        <ToastContainer
          hideProgressBar
          closeOnClick={false}
          closeButton={false}
          newestOnTop
          autoClose={false}
          position="bottom-right"
          toastClassName="toast-notification-wrap"
          limit={3}
        />
      </BrowserRouter>
    </Provider>
  );
};
