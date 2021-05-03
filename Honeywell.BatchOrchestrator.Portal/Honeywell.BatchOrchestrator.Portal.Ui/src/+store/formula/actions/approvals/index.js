/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import {
  getPendingApprovalItemsUrl,
  getFormulaSetByIdUrl,
  approveFormulaSetUrl,
  rejectFormulaSetUrl,
  approveFormulaUrl,
  rejectFormulaUrl,
  getFormulaByIdUrl,
  getFormulaSetCommentsUrl,
  getFormulaCommentsUrl,
  getPendingCampaignsUrl,
  UpdateCampaignStatusUrl,
} from 'app/formula/services/approval-items';
import { RESPONSE_CODE } from 'utils/app-constants';
import { errorHandler } from 'core/error';
import { getCookie } from 'utils/utility';
import {
  UPDATE_PENDING_APPROVAL_ITEMS,
  UPDATE_FORMULA_SET,
  UPDATE_FORMULA,
  UPDATE_FORMULA_SET_COMMENTS,
  UPDATE_FORMULA_COMMENTS,
  UPDATE_PENDING_CAMPAIGN_LIST,
} from './types';

// const xsrfToken = getCookie('XSRF-REQUEST-TOKEN');
const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
export const updatePendingItems = (data) => {
  return {
    type: UPDATE_PENDING_APPROVAL_ITEMS,
    payload: data,
  };
};

export const updateFormulaSet = (data) => {
  return {
    type: UPDATE_FORMULA_SET,
    payload: data,
  };
};

export const getPendingItems = () => async (dispatch) => {
  try {
    const response = await axiosClient.get(`${getPendingApprovalItemsUrl()}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(updatePendingItems(response.data));
      // return errorHandler();
    }
    return errorHandler(response);
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const getFormulaSet = (id) => async (dispatch) => {
  try {
    const response = await axiosClient.get(`${getFormulaSetByIdUrl(id)}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(updateFormulaSet(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const approveFormulaSetStatus = (id, comment) => async (dispatch) => {
  try {
    const response = await axiosClient.post(
      `${approveFormulaSetUrl(id)}`,
      JSON.stringify(comment || ''),
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return response.status;
    }
    return errorHandler(response);
  } catch (err) {
    // No action on error
    return errorHandler();
  }
};

export const rejectFormulaSetStatus = (id, comment) => async (dispatch) => {
  try {
    const response = await axiosClient.post(
      `${rejectFormulaSetUrl(id)}`,
      JSON.stringify(comment || ''),
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return response.status;
    }
    return errorHandler(response);
  } catch (err) {
    // No action on error
    return errorHandler();
  }
};

export const updateFormula = (data) => {
  return {
    type: UPDATE_FORMULA,
    payload: data,
  };
};

export const getFormula = (id) => async (dispatch) => {
  try {
    const response = await axiosClient.get(`${getFormulaByIdUrl(id)}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(updateFormula(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const approveFormulaStatus = (id, comment) => async (dispatch) => {
  try {
    const response = await axiosClient.post(
      `${approveFormulaUrl(id)}`,
      JSON.stringify(comment || ''),
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return response.status;
    }
    return errorHandler(response);
  } catch (err) {
    // No action on error
    return errorHandler();
  }
};

export const rejectFormulaStatus = (id, comment) => async (dispatch) => {
  try {
    const response = await axiosClient.post(
      `${rejectFormulaUrl(id)}`,
      JSON.stringify(comment || ''),
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return response.status;
    }
    return errorHandler(response);
  } catch (err) {
    // No action on error
    return errorHandler();
  }
};

export const updateFormulaSetComments = (data) => {
  return {
    type: UPDATE_FORMULA_SET_COMMENTS,
    payload: data,
  };
};

export const updateFormulaComments = (data) => {
  return {
    type: UPDATE_FORMULA_COMMENTS,
    payload: data,
  };
};
export const updatePendingCampaignList = (data) => {
  return {
    type: UPDATE_PENDING_CAMPAIGN_LIST,
    payload: data,
  };
};
export const getFormulaSetComments = (id) => async (dispatch) => {
  try {
    const response = await axiosClient.get(`${getFormulaSetCommentsUrl(id)}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(updateFormulaSetComments(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};
export const getFormulaComments = (id) => async (dispatch) => {
  try {
    const response = await axiosClient.get(`${getFormulaCommentsUrl(id)}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(updateFormulaComments(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};
export const getPendingCampaigns = () => async (dispatch) => {
  try {
    const response = await axiosClient.get(`${getPendingCampaignsUrl()}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      dispatch(updatePendingCampaignList(response.data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const UpdateCampaignStatus = (CampaignWorkflowParameterVM) => async (
  dispatch
) => {
  try {
    const response = await axiosClient.post(
      `${UpdateCampaignStatusUrl()}`,
      CampaignWorkflowParameterVM,
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      return response.status;
    }
    return errorHandler(response);
  } catch (err) {
    // No action on error
    return errorHandler();
  }
};
