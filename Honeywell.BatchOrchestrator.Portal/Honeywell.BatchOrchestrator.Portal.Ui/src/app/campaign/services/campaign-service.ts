/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { httpClient } from 'core/http-client';
import { Campaign, CampaignWorkflowParameter } from '../models/campaign';
import { CampaignFilter } from '../models/campaign-filter';
import { BatchSize, PayloadForBatch } from '../models/batch-size';
import { RefBatch } from '../models/ref-batch';
import { Formula } from '../models/formula';
import { FormulaSet } from '../models/formula-set';
import { FormulaParameter } from '../models/formula-parameter';
import { CampaignUnitSelection } from '../models/campaign-unit-selection';
import { CampaignBatch } from '../models/campaign-batch';
import { BatchDetails, UnitSelection } from '../models/campaign-details';
import { ReportParameter } from '../models/report-parameter';
import { MasterRecipe } from '../models/recipe';
import { AddBatch, UpdateBatch } from '../models/update-batch';
import { MRFormulaSet } from '../models/recipe-formula-set';
import { CampaignBatchIdPattern } from '../models/campaign-batchId-pattern';
import { OperationResult } from '../models/operation-result';
import { CampaignSummaryState } from '+store/campaign/types';

const CONTROLLER = 'CampaignManager';
const BATCHCONTROLLER = 'Batch';
const APPSETTINGSCONTROLLER = 'AppSettings';
const ENPOINTS = {
  CreateCampaign: 'CreateCampaign',
  UpdateCampaign: 'UpdateCampaign',
  GetMRFormulaSetList: 'GetFormulaSetAndRecipeList',
  GetMRFormulaSet: 'GetFormulaSetAndRecipe',
  GetFormulaSetList: 'GetFormulaSetList',
  GetFormulaListById: 'GetFormulaListById',
  GetBatchSize: 'GetBatchSize',
  GetReferenceBatch: 'GetReferenceBatch',
  GetRawMaterials: 'GetRawMaterials',
  GetFormulaParameters: 'GetFormulaParameters',
  GetUnitSelection: 'GetUnitSelection',
  GetBatches: 'GetBatches',
  GetReportParameters: 'GetReportParameters',
  GetCampaignDetails: 'GetCampaignSummary',
  GetActiveCampaigns: 'GetActiveCampaigns',
  GetBatchUnitSelection: 'GetLatestUnitsOfBatch',
  ChangeCampaignState: 'UpdateCampaignStateById',
  GetCampaignById: 'GetCampaignById',
  UpdateBatch: 'UpdateBatch',
  GetMinimumProductionQuantity: 'GetMinimumProductionQuantity',
  DeleteCampaign: 'DeleteCampaign',
  GetCampaigns: 'GetCampaigns',
  GetRecipeList: 'GetRecipeList',
  AddBatch: 'AddBatch',
  GetBatchIdPatterns: 'GetBatchIdPatterns',
  IsRecipeValidForBatchCreation: 'IsRecipeValidForBatchCreation',
  IsYieldParameterValid: 'IsBatchYieldParameterValid',
  RemoveBatch: 'RemoveBatch',
  IsRecipeClassBased: 'IsRecipeClassBased',
  GetCampaignBatchIdPatternByCampaignId:
    'GetCampaignBatchIdPatternByCampaignId',
  StartCampaign: 'StartCampaign',
  GetMaxOwners: 'GetMaxOwners',
  IsCampaignRefIdExist: 'IsCampaignRefIdExist',
  GetUpdatedBatchDetails: 'GetUpdatedBatchDetails',
  GetCampaignBasicSetupInfo: 'GetCampaignBasicSetupInfo',
  GetMinimumNumberOfBatches: 'GetMinimumNumberOfBatches',
};
const EPKSDataAccessController = 'EPKSDataAccess';
const EPKSDataAccessEnpoints = {
  StartCampaign: 'StartCampaign',
  GetActiveCampaigns: 'GetActiveCampaigns',
};

export const CampaignService = {
  getCampaignsForDashboard: (payload: CampaignFilter) =>
    httpClient.post<Campaign[]>(
      `${CONTROLLER}/${ENPOINTS.GetCampaigns}`,
      payload
    ),
  createCampaign: (payload: Campaign) =>
    httpClient.post<OperationResult>(
      `${CONTROLLER}/${ENPOINTS.CreateCampaign}`,
      payload
    ),
  updateCampaign: (payload: Campaign) =>
    httpClient.put<OperationResult>(
      `${CONTROLLER}/${ENPOINTS.UpdateCampaign}/${payload.id}`,
      payload
    ),
  changeCampaignState: (payload: CampaignWorkflowParameter) =>
    httpClient.put<any>(
      `${CONTROLLER}/${ENPOINTS.ChangeCampaignState}`,
      payload
    ),
  getRecipeFormulaSets: () =>
    httpClient.get<MRFormulaSet[]>(
      `${CONTROLLER}/${ENPOINTS.GetMRFormulaSetList}`
    ),
  getRecipeFormulaSet: (formulaSetId = '', recipeName = '') =>
    httpClient.get<MRFormulaSet>(`${CONTROLLER}/${ENPOINTS.GetMRFormulaSet}`, {
      params: {
        formulaSetId,
        recipeName,
      },
    }),
  getFormulaSets: () =>
    httpClient.get<FormulaSet[]>(`${CONTROLLER}/${ENPOINTS.GetFormulaSetList}`),
  getMasterRecipes: () =>
    httpClient.get<MasterRecipe[]>(`${CONTROLLER}/${ENPOINTS.GetRecipeList}`),
  getFormulaIds: (formulaSet: string) =>
    httpClient.get<Formula[]>(
      `${CONTROLLER}/${ENPOINTS.GetFormulaListById}/${formulaSet}`
    ),
  getBatchSize: (payload: PayloadForBatch) =>
    httpClient.post<BatchSize>(
      `${CONTROLLER}/${ENPOINTS.GetBatchSize}`,
      payload
    ),
  getRefBatches: (payload: PayloadForBatch) =>
    httpClient.post<RefBatch>(
      `${CONTROLLER}/${ENPOINTS.GetReferenceBatch}`,
      payload
    ),
  getRawMaterials: (payload: PayloadForBatch) =>
    httpClient.post<FormulaParameter[]>(
      `${CONTROLLER}/${ENPOINTS.GetRawMaterials}`,
      payload
    ),
  getFormulaParameters: (payload: PayloadForBatch) =>
    httpClient.post<FormulaParameter[]>(
      `${CONTROLLER}/${ENPOINTS.GetFormulaParameters}`,
      payload
    ),
  getSelectionUnits: (payload: PayloadForBatch) =>
    httpClient.post<CampaignUnitSelection[]>(
      `${CONTROLLER}/${ENPOINTS.GetUnitSelection}`,
      payload
    ),
  getBatches: (payload: PayloadForBatch) =>
    httpClient.post<CampaignBatch[]>(
      `${CONTROLLER}/${ENPOINTS.GetBatches}`,
      payload
    ),
  startCampaign: (payload: Campaign) =>
    httpClient.put<string>(
      `${CONTROLLER}/${ENPOINTS.StartCampaign}/${payload.id}`
    ),

  getCampaignDetails: (id: string) =>
    httpClient.get<CampaignSummaryState>(
      `${CONTROLLER}/${ENPOINTS.GetCampaignDetails}/${id}`
    ),

  getCampaignReportParams: (payload: PayloadForBatch) =>
    httpClient.post<ReportParameter[]>(
      `${CONTROLLER}/${ENPOINTS.GetReportParameters}`,
      payload
    ),

  getBatchSelectionUnit: (id: string) =>
    httpClient.get<UnitSelection[]>(
      `${BATCHCONTROLLER}/${ENPOINTS.GetBatchUnitSelection}/${id}`
    ),
  getCampaignById: (id: string) =>
    httpClient.get<Campaign>(`${CONTROLLER}/${ENPOINTS.GetCampaignById}/${id}`),

  updateBatch: (payload: UpdateBatch) =>
    httpClient.post<boolean>(
      `${BATCHCONTROLLER}/${ENPOINTS.UpdateBatch}`,
      payload
    ),
  getMinimumProductionQuantity: (id: string) =>
    httpClient.post<number>(
      `${CONTROLLER}/${ENPOINTS.GetMinimumProductionQuantity}`,
      `"${id}"`
    ),
  getMinimumNumberOfBatches: (id: string) =>
    httpClient.post<number>(
      `${CONTROLLER}/${ENPOINTS.GetMinimumNumberOfBatches}`,
      `"${id}"`
    ),
  deleteCampaign: (id: string) =>
    httpClient.post<boolean>(
      `${CONTROLLER}/${ENPOINTS.DeleteCampaign}`,
      `"${id}"`
    ),
  addBatch: (payload: AddBatch) =>
    httpClient.post<boolean>(
      `${BATCHCONTROLLER}/${ENPOINTS.AddBatch}`,
      payload
    ),
  getBatchIdPatterns: (payload: Campaign) =>
    httpClient.post<Campaign>(
      `${APPSETTINGSCONTROLLER}/${ENPOINTS.GetBatchIdPatterns}`,
      payload
    ),
  isRecipeValidForBatchCreation: (payload: string) =>
    httpClient.get<boolean>(
      `${CONTROLLER}/${ENPOINTS.IsRecipeValidForBatchCreation}/${payload}`
    ),
  deleteBatch: (id: string) =>
    httpClient.post<boolean>(
      `${BATCHCONTROLLER}/${ENPOINTS.RemoveBatch}`,
      `"${id}"`
    ),
  isYieldParameterValid: (data: string) =>
    httpClient.post<boolean>(
      `${CONTROLLER}/${ENPOINTS.IsYieldParameterValid}`,
      `"${data}"`
    ),
  isRecipeClassBased: (recipe: string) =>
    httpClient.get<boolean>(
      `${CONTROLLER}/${ENPOINTS.IsRecipeClassBased}/${recipe}`
    ),
  GetCampaignBatchIdPatternByCampaignId: (campaignId: string) =>
    httpClient.get<CampaignBatchIdPattern>(
      `${BATCHCONTROLLER}/${ENPOINTS.GetCampaignBatchIdPatternByCampaignId}/${campaignId}`
    ),
  GetMaxOwners: (recipeName: string) =>
    httpClient.get<number>(
      `${CONTROLLER}/${ENPOINTS.GetMaxOwners}/${recipeName}`
    ),
  IsCampaignRefIdExist: (data: string) =>
    httpClient.get<boolean>(
      `${CONTROLLER}/${ENPOINTS.IsCampaignRefIdExist}/${data}`
    ),
  GetUpdatedBatchDetails: (campaignId: string) =>
    httpClient.get<{ batches: BatchDetails[]; completedBatch: number }>(
      `${BATCHCONTROLLER}/${ENPOINTS.GetUpdatedBatchDetails}/${campaignId}`
    ),
  GetCampaignBasicSetupInfo: (campaignId: string) =>
    httpClient.get<CampaignSummaryState>(
      `${CONTROLLER}/${ENPOINTS.GetCampaignBasicSetupInfo}/${campaignId}`
    ),
};
