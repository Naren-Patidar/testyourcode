/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

import { RESPONSE_CODE } from 'utils/app-constants';
import {
  formulasetURL,
  formulasetByIdURL,
  formulaSetUpdateFavoriteByIdURL,
  deleteFormulaSetByIdURL,
  updateFormulaSetImageUrl,
  refreshForExperionModificationURL,
  deleteFormulaSetImageUrl,
  getAppSettingsStatusURL,
  getFormulaSetForExport,
  // eslint-disable-next-line import/named
  IsExperionChangeAllowedURL,
} from 'app/formula/services/formula-sets';
import { errorHandler } from 'core/error';
import { getCookie } from 'utils/utility';
import {
  SET_FORMULASETS,
  UPDATE_EXPERION_CHANGES_MR_ITEMS,
  UPDATE_SIGNALR_CONNECTION_STATUS,
  DELELE_FORMULASET,
  IS_EXPERION_CHANGE_ALLOWED,
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
export const updateStoreForFormulaSet = (data) => {
  return {
    type: SET_FORMULASETS,
    payload: data,
  };
};

export const removeFormulaSet = () => {
  return {
    type: DELELE_FORMULASET,
  };
};

export const getFormulaSets = () => async (dispatch) => {
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

export const refreshForExperionModification = () => async (dispatch) => {
  try {
    const response = await axiosClient.get(
      `${refreshForExperionModificationURL()}`
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      // dispatch(updateStoreForFormulaSet(data));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const updateFavoriteFlagFormulaSet = (id, isFavorite) => async (
  dispatch
) => {
  try {
    const response = await axiosClient.put(
      `${formulaSetUpdateFavoriteByIdURL(id, isFavorite)}`
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      try {
        const res = await axiosClient.get(`${formulasetURL()}`);
        if (res.status === RESPONSE_CODE.SUCCESS) {
          dispatch(updateStoreForFormulaSet(res.data));
        } else {
          return errorHandler(res);
        }
      } catch (error) {
        // No action on error
        return errorHandler();
      }
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const deleteFormulaSetById = (id, mrName) => async (dispatch) => {
  try {
    const response = await axiosClient.delete(
      `${deleteFormulaSetByIdURL(id, mrName)}`
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      try {
        const res = await axiosClient.get(`${formulasetURL()}`);
        if (res.status === RESPONSE_CODE.SUCCESS) {
          dispatch(updateStoreForFormulaSet(res.data));
        } else {
          return errorHandler(res);
        }
      } catch (error) {
        // No action on error
        return errorHandler();
      }
      return response;
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const uploadImageForFormulaSetById = (id, imageFile) => async (
  dispatch
) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await axiosClient.put(
      `${updateFormulaSetImageUrl(id)}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    if (response.status === RESPONSE_CODE.SUCCESS) {
      try {
        const res = await axiosClient.get(`${formulasetURL()}`);
        if (res.status === RESPONSE_CODE.SUCCESS) {
          dispatch(updateStoreForFormulaSet(res.data));
        } else {
          return errorHandler(res);
        }
      } catch (error) {
        // No action on error
        return errorHandler();
      }
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const deleteFormulaSetImageById = (id) => async (dispatch) => {
  try {
    const response = await axiosClient.put(`${deleteFormulaSetImageUrl(id)}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      try {
        const res = await axiosClient.get(`${formulasetURL()}`);
        if (res.status === RESPONSE_CODE.SUCCESS) {
          dispatch(updateStoreForFormulaSet(res.data));
        } else {
          return errorHandler(res);
        }
      } catch (error) {
        // No action on error
        return errorHandler();
      }
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const updateExperionChangesMRList = (data) => {
  return {
    type: UPDATE_EXPERION_CHANGES_MR_ITEMS,
    payload: data,
  };
};

export const updateSignalRConnectionStatus = (data) => {
  return {
    type: UPDATE_SIGNALR_CONNECTION_STATUS,
    payload: data,
  };
};

export const getAppSettingsStatus = () => async (dispatch) => {
  try {
    const response = await axiosClient.get(`${getAppSettingsStatusURL()}`);
    console.log(response);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      // dispatch(updateStoreForFormulaSet(data));
      return response;
    }

    return errorHandler(response);
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const getFormulaSetsForExport = () => async (dispatch) => {
  try {
    const response = await axiosClient.get(`${getFormulaSetForExport()}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      const changeddata = response.data.map((eachFormula) => {
        return {
          ...eachFormula,
          parentchecked: false,
          partialchecked: false,
          formulas: eachFormula.formulas
            ? eachFormula.formulas.map((eachchild) => {
                return {
                  ...eachchild,
                  checked: false,
                };
              })
            : [],
          noofformula: eachFormula.formulas.length,
        };
      });
      dispatch(updateStoreForFormulaSet(changeddata));
    } else {
      return errorHandler(response);
    }
  } catch (error) {
    return errorHandler();
  }
};

export const isExperionChangesAllowed = async (recipe, formulaSetName) => {
  try {
    const response = await axiosClient.get(
      `${IsExperionChangeAllowedURL}/${recipe}/${formulaSetName}`
    );

    return response.data;
  } catch (error) {
    // No action on error
    return errorHandler();
  }
};

export const removeFormulaSets = () => async (dispatch) => {
  dispatch(removeFormulaSet());
};
