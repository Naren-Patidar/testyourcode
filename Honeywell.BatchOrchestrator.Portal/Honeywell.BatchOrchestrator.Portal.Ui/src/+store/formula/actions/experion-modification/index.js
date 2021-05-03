/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import { RESPONSE_CODE } from 'utils/constants/api';
import { errorHandler } from 'core/error';
import { getCookie } from 'utils/utility';
import * as types from './types';
import {
  deleteFormulaSetURL,
  getFormulaListURL,
  getModifiedListOfParametersURL,
  applyExperionChangesURL,
  saveSelectionForApplyChangesURL,
} from '../../../../app/formula/services/experion-modification';

// const xsrfToken = getCookie('XSRF-REQUEST-TOKEN');
const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
export const setModifiedParameterListToStore = (data) => {
  return {
    type: types.SET_MODIFIED_PARAMETER_LIST,
    payload: data,
  };
};

export const getModifiedListOfParameters = (masterRacipeId) => async (
  dispatch
) => {
  try {
    const response = await axiosClient.get(
      `${getModifiedListOfParametersURL(masterRacipeId)}`
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(setModifiedParameterListToStore(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const setFormulaListToStore = (data) => {
  return {
    type: types.SET_EXPERION_MODIFICATION_FORMULA_LIST,
    payload: data,
  };
};

export const getExperionModificationFormulaListByFormulaSetId = (
  formulsSetId
) => async (dispatch) => {
  try {
    const response = await axiosClient.get(
      `${getFormulaListURL(formulsSetId)}`
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

export const applyExperionModificationChanges = (
  formulsSetId,
  parameterList
) => async (dispatch) => {
  try {
    const response = await axiosClient.put(
      applyExperionChangesURL(formulsSetId),
      parameterList
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      // dispatch(setFormulaListToStore(data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const SaveSelectionForApplyChanges = (
  formulsSetId,
  formulaIdList
) => async (dispatch) => {
  try {
    const response = await axiosClient.put(
      saveSelectionForApplyChangesURL(formulsSetId),
      formulaIdList
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      // dispatch(setFormulaListToStore(data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const deleteFormulaSet = (formulsSetId, recipeName) => async (
  dispatch
) => {
  try {
    const response = await axiosClient.delete(
      deleteFormulaSetURL(formulsSetId, recipeName)
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      // dispatch(setFormulaListToStore(data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};
