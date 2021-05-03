/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import { BASE_URL } from '../../../utils/Settings';

const api = 'FormulaManager';

export const getModifiedListOfParametersURL = (masterRacipeId) => {
  return `${BASE_URL}${api}/CompareMasterRecipe/${masterRacipeId}`;
};

export const applyExperionChangesURL = (formulasetId) => {
  return `${BASE_URL}${api}/UpdateExperionChanges/${formulasetId}`;
};

export const saveSelectionForApplyChangesURL = (formulasetId) => {
  return `${BASE_URL}${api}/UpdateFormulaListForExpChanges/${formulasetId}`;
};

export const getFormulaListURL = (formulasetId) => {
  return `${BASE_URL}${api}/GetformulaeByFormulaSetId/${formulasetId}`;
};
export const deleteFormulaSetURL = (formulasetId, recipeName) => {
  return `${BASE_URL}${api}/DeleteFormulaSet/${formulasetId}/${recipeName}`;
};
