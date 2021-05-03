/**
 * The below line is VERY IMPORTANT DO NOT DELETE as it is required to make application work in IE11 with CRA
 * version >4.0.0
 */
/** @jsxRuntime classic */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'abortcontroller-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import { App } from './app';

const MOUNT_NODE = document.querySelector('#root') as HTMLElement;
ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  MOUNT_NODE
);
// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}
