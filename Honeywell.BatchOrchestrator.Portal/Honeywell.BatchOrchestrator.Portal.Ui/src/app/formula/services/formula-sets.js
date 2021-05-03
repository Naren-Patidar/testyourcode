/* eslint-disable camelcase */
import { BASE_URL } from 'utils/Settings';

const controller = 'FormulaManager';
const api = 'GetAllFormulaSet';
const api_getAllFormulaSet = 'GetFormulaSetWithMetadata';
const api_updateFavorite = 'UpdateFormulaSetAsFavorite';
const api_deleteFormulaSet = 'DeleteFormulaSet';
const api_updateFormulaSetImage = 'UpdateFormulaSetAddImage';
const api_deleteFormulaSetImage = 'UpdateFormulaSetRemoveImage';
const api_getFormulaSetForExport = 'getFormulaSetForExport';

const Url = `${BASE_URL}${controller}`;

export const refreshForExperionModificationURL = () => {
  return `${Url}/Refresh`;
};

export const formulasetURL = () => {
  return `${Url}/${api_getAllFormulaSet}`;
};

export const formulasetByIdURL = (id) => {
  return `${Url}/${api}/${id}`;
};

export const formulaSetUpdateFavoriteByIdURL = (id, isFavorite) => {
  return `${Url}/${api_updateFavorite}/${id}/${isFavorite}`;
};

export const deleteFormulaSetByIdURL = (id, mrName) => {
  return `${Url}/${api_deleteFormulaSet}/${id}/${mrName}`;
};

export const updateFormulaSetImageUrl = (id) => {
  return `${Url}/${api_updateFormulaSetImage}/${id}`;
};

export const deleteFormulaSetImageUrl = (id) => {
  return `${Url}/${api_deleteFormulaSetImage}/${id}`;
};
export const updateFormulaSetLockURL = (formulasetId, isLock) => {
  return `${Url}/UpdateFormulaSetLock/${formulasetId}/${isLock}`;
};
export const getAppSettingsStatusURL = () => {
  return `${Url}/GetAppSettingsStatus`;
};

export const getFormulaSetForExport = () => {
  return `${Url}/getFormulaSetForExport`;
};

export const IsExperionChangeAllowedURL = `${Url}/IsExperionChangeAllowed`;
