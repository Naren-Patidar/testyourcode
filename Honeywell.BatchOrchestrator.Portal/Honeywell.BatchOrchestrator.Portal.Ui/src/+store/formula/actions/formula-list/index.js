/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import {
  formulaListByFormulaSetIdURL,
  deleteFormulaByFormulaIdURL,
} from 'app/formula/services/formula-management';
import { RESPONSE_CODE } from 'utils/app-constants';
import { errorHandler } from 'core/error';
import { getCookie } from 'utils/utility';
import * as types from './types';

// const xsrfToken = getCookie('XSRF-REQUEST-TOKEN');
const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
export const setFormulaListToStore = (data) => {
  return {
    type: types.GET_FORMULA_LIST_BY_FORMULASETID,
    payload: data,
  };
};

export const getFormulaListByFormulaSetId = (formulsSetId) => async (
  dispatch
) => {
  try {
    const response = await axiosClient.get(
      `${formulaListByFormulaSetIdURL(formulsSetId)}`
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(setFormulaListToStore(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const deleteFormulaByFormulaId = (formulaId) => async () => {
  try {
    const response = await axiosClient.delete(
      `${deleteFormulaByFormulaIdURL(formulaId)}`
    );
    // eslint-disable-next-line no-empty
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return response;
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};
