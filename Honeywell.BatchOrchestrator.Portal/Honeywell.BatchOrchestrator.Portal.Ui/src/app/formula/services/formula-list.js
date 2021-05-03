/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import { BASE_URL } from '../../../utils/Settings';

const api = 'FormulaManager';

export const formulaListByFormulaSetIdURL = (formulaSetId) => {
  return `${BASE_URL}${api}/GetFormulaListByFormulaSetId/${formulaSetId}`;
};
export const deleteFormulaByFormulaIdURL = (formulaId) => {
  return `${BASE_URL}${api}/DeleteFormula/${formulaId}`;
};
export const updateFormulaLockURL = (formulaId, isLocked) => {
  return `${BASE_URL}${api}/UpdateFormulaLock/${formulaId}/${isLocked}`;
};
