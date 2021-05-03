/* eslint-disable camelcase */
import { BASE_URL } from '../../../../utils/Settings';

const controller = 'FormulaManager';
const api_GetFormulaSetComments = 'GetFormulaSetComments';

const Url = `${BASE_URL}${controller}`;

export const updateFormulaSetLockURL = (formulasetId, isLock) => {
  return `${Url}/UpdateFormulaSetLock/${formulasetId}/${isLock}`;
};

export const getFormulaSetCommentsUrl = (id) => {
  return `${Url}/${api_GetFormulaSetComments}/${id}`;
};
