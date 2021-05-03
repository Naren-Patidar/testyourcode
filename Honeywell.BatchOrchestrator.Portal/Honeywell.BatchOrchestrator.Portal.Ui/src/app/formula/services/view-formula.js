/* eslint-disable camelcase */
import { BASE_URL } from '../../../utils/Settings';

const controller = 'FormulaManager';
const api = 'FormulaManager';

const api_GetFormulaComments = 'GetFormulaComments';

const Url = `${BASE_URL}${controller}`;

export const getFormulaCommentsUrl = (id) => {
  return `${Url}/${api_GetFormulaComments}/${id}`;
};
export const updateFormulaLockURL = (formulaId, isLocked) => {
  return `${BASE_URL}${api}/UpdateFormulaLock/${formulaId}/${isLocked}`;
};
