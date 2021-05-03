/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { errorHandler } from 'core/error';
import { RESPONSE_CODE } from 'utils/app-constants';
import { getCookie } from 'utils/utility';
import * as types from './types';
import {
  getAppSettingsURL,
  updateAppsettingsURL,
} from '../../../app/application-settings/services/app-settings';

// const xsrfToken = getCookie('XSRF-REQUEST-TOKEN');
const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});

export const setAppSettingsListToStore = (data) => {
  return {
    type: types.GET_APP_SETTING_LIST,
    payload: data,
  };
};

export const getAppSettingsList = () => async (dispatch) => {
  try {
    const response = await axiosClient.get(`${getAppSettingsURL()}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(setAppSettingsListToStore(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const updateAppsettingsChanges = (appSettingsList) => async () => {
  try {
    const response = await axiosClient.put(
      updateAppsettingsURL(),
      appSettingsList
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      // dispatch(setFormulaListToStore(data));
      return response;
    }
    return errorHandler(response);
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};
