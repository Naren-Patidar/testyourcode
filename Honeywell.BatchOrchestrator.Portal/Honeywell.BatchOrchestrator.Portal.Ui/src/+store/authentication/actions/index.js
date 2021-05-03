/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { formulasetURL } from 'app/formula/services/formula-sets';
import { RESPONSE_CODE } from 'utils/app-constants';
import { errorHandler } from 'core/error';
import { getCookie } from 'utils/utility';
import {
  SET_IS_FIRST_TIME_LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './types';

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
export const setFirstTimeLogin = (isFirstTimeLogin = false) => ({
  type: SET_IS_FIRST_TIME_LOGIN,
  isFirstTimeLogin,
});

export const loginRequestActionCreator = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccessActionCreator = (auth) => {
  return {
    type: LOGIN_SUCCESS,
    payload: auth,
  };
};

export const loginFailureActionCreator = (formErrors) => {
  return {
    type: LOGIN_FAILURE,
    payload: formErrors,
  };
};

export const updateStoreForFormulaSet = (data) => {
  return {
    type: 'GetFormulaSet',
    payload: data,
  };
};

export const getFormulaSets = (id) => async (dispatch) => {
  try {
    const response = await axiosClient.get(`${formulasetURL()}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(updateStoreForFormulaSet(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};
