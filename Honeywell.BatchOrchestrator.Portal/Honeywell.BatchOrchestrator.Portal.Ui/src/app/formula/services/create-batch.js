/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import { BASE_URL } from '../../../utils/Settings';

const api = 'formulamanager';

export const createBatchURL = (newBatchData) => {
  return `${BASE_URL}${api}/CreateBatch`;
};

export const getUnitListURL = (masterRecipeName) => {
  return `${BASE_URL}${api}/GetAssignedUnits/${masterRecipeName}`;
};

export const getFormulaByFormulaIdURL = (formulaId) => {
  return `${BASE_URL}${api}/GetFormulaById/${formulaId}`;
};

export const getAllFormulaSetURL = () => {
  return `${BASE_URL}${api}/GetAllFormulaSet`;
};

export const formulaListByFormulaSetIdURL = (formulaSetId) => {
  return `${BASE_URL}${api}/GetFormulaListByFormulaSetId/${formulaSetId}`;
};
export const referenceBatchesURL = (recipeName) => {
  return `${BASE_URL}${api}/GetReferenceBatch/${recipeName}`;
};
export const batchSizeURL = (recipeName) => {
  return `${BASE_URL}${api}/GetBatchSize/${recipeName}`;
};
