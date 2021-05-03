/* eslint-disable camelcase */
import { BASE_URL } from '../../../utils/Settings';

const controller = 'FormulaManager';
const controllerCampaign = 'CampaignManager';
const api_GetPendingApprovalItems = 'GetPendingApprovalItems';
const api_GetFormulaSetById = 'GetFormulaSetById';
const api_ApproveFormulaSet = 'ApproveFormulaSet';
const api_RejectFormulaSet = 'RejectFormulaSet';
const api_GetFormulaById = 'GetFormulaById';
const api_ApproveFormula = 'ApproveFormula';
const api_RejectFormula = 'RejectFormula';
const api_GetFormulaSetComments = 'GetFormulaSetComments';
const api_GetFormulaComments = 'GetFormulaComments';
const api_GetCampaignsUnderReview = 'GetCampaignsUnderReview';
const api_UpdateCampaignStatus = 'UpdateCampaignStatus';

const Url = `${BASE_URL}${controller}`;
const UrlCampaign = `${BASE_URL}${controllerCampaign}`;

export const getPendingApprovalItemsUrl = () => {
  return `${Url}/${api_GetPendingApprovalItems}`;
};

export const getFormulaSetByIdUrl = (id) => {
  return `${Url}/${api_GetFormulaSetById}/${id}`;
};

export const approveFormulaSetUrl = (id) => {
  return `${Url}/${api_ApproveFormulaSet}/${id}`;
};

export const rejectFormulaSetUrl = (id) => {
  return `${Url}/${api_RejectFormulaSet}/${id}`;
};

export const getFormulaByIdUrl = (id) => {
  return `${Url}/${api_GetFormulaById}/${id}`;
};

export const approveFormulaUrl = (id) => {
  return `${Url}/${api_ApproveFormula}/${id}`;
};

export const rejectFormulaUrl = (id) => {
  return `${Url}/${api_RejectFormula}/${id}`;
};

export const getFormulaSetCommentsUrl = (id) => {
  return `${Url}/${api_GetFormulaSetComments}/${id}`;
};

export const getFormulaCommentsUrl = (id) => {
  return `${Url}/${api_GetFormulaComments}/${id}`;
};
export const getPendingCampaignsUrl = () => {
  return `${UrlCampaign}/${api_GetCampaignsUnderReview}`;
};
export const UpdateCampaignStatusUrl = () => {
  return `${UrlCampaign}/${api_UpdateCampaignStatus}`;
};
