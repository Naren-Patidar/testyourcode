/* eslint-disable eqeqeq */
/* eslint-disable spaced-comment */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import {
  createBatchURL,
  getUnitListURL,
  getFormulaByFormulaIdURL,
  getAllFormulaSetURL,
  formulaListByFormulaSetIdURL,
  referenceBatchesURL,
  batchSizeURL,
} from '../../../../app/formula/services/create-batch';
import { RESPONSE_CODE } from 'utils/app-constants';
import { errorHandler } from 'core/error';
import * as types from './types';
import { getCookie } from 'utils/utility';

// const xsrfToken = getCookie('XSRF-REQUEST-TOKEN');
const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
export const setUnitsListToStore = (data) => {
  return {
    type: types.GET_UNITS_LIST,
    payload: data,
  };
};

export const setAllFormulsSet = (data) => {
  return {
    type: types.GET_ALL_FORMULASET,
    payload: data,
  };
};

export const setFormulaToStore = (data) => {
  return {
    type: types.GET_FORMULA_PARAMS,
    payload: data,
  };
};

export const getFormulaByFormulaId = (formulaId) => async (dispatch) => {
  try {
    const response = await axiosClient.get(
      `${getFormulaByFormulaIdURL(formulaId)}`
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(setFormulaToStore(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const createBatch = (newBatchData) => async (dispatch) => {
  try {
    const response = await axiosClient.post(
      `${createBatchURL(newBatchData)}`,
      JSON.stringify(newBatchData),
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.status === RESPONSE_CODE.SUCCESS) {
      return { status: response.status, data: response.data };
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const getUnitsList = (masterRecipeName) => async (dispatch) => {
  try {
    //dispatch(setUnitsListToStore(unitdata));
    const response = await axiosClient.get(
      `${getUnitListURL(masterRecipeName)}`
    );
    if (response.status == RESPONSE_CODE.SUCCESS) {
      dispatch(setUnitsListToStore(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const getAllFormulaSet = () => async (dispatch) => {
  try {
    //dispatch(setUnitsListToStore(unitdata));
    const response = await axiosClient.get(`${getAllFormulaSetURL()}`);
    if (response.status == RESPONSE_CODE.SUCCESS) {
      dispatch(setAllFormulsSet(response.data));
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

export const setRefBatchesToStore = (data) => {
  return {
    type: types.GET_REFRENCE_BATHCES,
    payload: data,
  };
};
export const getReferenceBatches = (recipeName) => async (dispatch) => {
  try {
    const response = await axiosClient.get(
      `${referenceBatchesURL(recipeName)}`
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(setRefBatchesToStore(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const setBatchSizeToStore = (data) => {
  return {
    type: types.GET_BATCH_SIZE,
    payload: data,
  };
};
export const getBatchSize = (recipeName) => async (dispatch) => {
  try {
    const response = await axiosClient.get(`${batchSizeURL(recipeName)}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(setBatchSizeToStore(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};
