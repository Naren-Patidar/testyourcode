/* eslint-disable no-return-await */
import axios from 'axios';
import { getCookie } from 'utils/utility';
import {
  getFormulaCommentsUrl,
  updateFormulaLockURL,
} from '../../services/view-formula';

import { FM_URL } from '../../../../utils/Settings';

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});

export const setFormulaLockApiCall = async (productId, isLocked) => {
  return await axiosClient.put(`${updateFormulaLockURL(productId, isLocked)}`);
};

export const getFormulaCommentsApiCall = async (productID) => {
  return await axiosClient.get(`${getFormulaCommentsUrl(productID)}`);
};

export const getFormulaDetailsApiCall = async (productID) => {
  const url = `${FM_URL}GetFormulaById/${productID}`;
  return await axiosClient.get(`${url}`);
};
