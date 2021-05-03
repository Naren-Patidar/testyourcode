import { createAsyncThunk } from '@reduxjs/toolkit';
import { PayloadForBatch } from 'app/campaign/models/batch-size';
import {
  Campaign,
  CampaignWorkflowParameter,
} from 'app/campaign/models/campaign';
import { AddBatch, UpdateBatch } from 'app/campaign/models/update-batch';
import { CampaignFilter } from 'app/campaign/models/campaign-filter';
// eslint-disable-next-line import/named
import { CampaignService } from 'app/campaign/services/campaign-service';
import { AppConstants, RESPONSE_CODE } from 'utils';
import { BatchDetails } from 'app/campaign/models/campaign-details';
import { toastr } from 'shared/toastr';

export const saveCampaign = createAsyncThunk(
  'campaign/saveCampaign',
  async (body: Campaign, { rejectWithValue }) => {
    try {
      const response =
        body.id && body.id !== AppConstants.EMPTY_GUID
          ? await CampaignService.updateCampaign(body)
          : await CampaignService.createCampaign(body);
      return response.data;
    } catch (error) {
      if (
        error.response.status === RESPONSE_CODE.INTERNAL_SERVER_ERROR ||
        error.response.status === RESPONSE_CODE.BAD_REQUEST
      ) {
        toastr.banner('Internal Server Error', error.response.data, 'error');
      }

      return rejectWithValue(error.response.data);
    }
  }
);
export const getMasterRecipes = createAsyncThunk(
  'campaign/getMasterRecipes',
  async (argFirst, { rejectWithValue }) => {
    try {
      const response = await CampaignService.getMasterRecipes();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const getFormulaSets = createAsyncThunk(
  'campaign/getFormulaSets',
  async () => {
    const response = await CampaignService.getFormulaSets();
    return response.data;
  }
);
export const getFormulaIds = createAsyncThunk(
  'campaign/getFormulaIds',
  async (formulaSet: string) => {
    const response = await CampaignService.getFormulaIds(formulaSet);
    return response.data;
  }
);
export const getBatchSize = createAsyncThunk(
  'campaign/getBatchSize',
  async (body: PayloadForBatch) => {
    const response = await CampaignService.getBatchSize(body);
    return response.data;
  }
);
export const getRefBatches = createAsyncThunk(
  'campaign/getRefBatches',
  async (body: PayloadForBatch) => {
    const response = await CampaignService.getRefBatches(body);
    return response.data;
  }
);

export const getRawMaterials = createAsyncThunk(
  'campaign/getRawMaterials',
  async (body: PayloadForBatch) => {
    const response = await CampaignService.getRawMaterials(body);
    return response.data;
  }
);

export const getFormulaParameters = createAsyncThunk(
  'campaign/getFormulaParameters',
  async (body: PayloadForBatch) => {
    const response = await CampaignService.getFormulaParameters(body);
    return response.data;
  }
);

export const getSelectionUnits = createAsyncThunk(
  'campaign/getSelectionUnits',
  async (body: PayloadForBatch) => {
    const response = await CampaignService.getSelectionUnits(body);
    return response.data;
  }
);
export const getBatches = createAsyncThunk(
  'campaign/getBatches',
  async (body: PayloadForBatch) => {
    const response = await CampaignService.getBatches(body);
    return response.data;
  }
);
export const getPlannedCampaigns = createAsyncThunk(
  'campaign/getPlannedCampaigns',
  async (data: CampaignFilter, { rejectWithValue }) => {
    try {
      const response = await CampaignService.getCampaignsForDashboard(data);
      return response.data;
    } catch (error) {
      if (
        error.response.status === RESPONSE_CODE.INTERNAL_SERVER_ERROR ||
        error.response.status === RESPONSE_CODE.BAD_REQUEST
      ) {
        toastr.banner('Internal Server Error', error.response.data, 'error');
      }
      return rejectWithValue(error.response);
    }
  }
);
export const getActiveCampaigns = createAsyncThunk(
  'campaign/getActiveCampaigns',
  async (data: CampaignFilter, { rejectWithValue }) => {
    try {
      const response = await CampaignService.getCampaignsForDashboard(data);
      return response.data;
    } catch (error) {
      if (
        error.response.status === RESPONSE_CODE.INTERNAL_SERVER_ERROR ||
        error.response.status === RESPONSE_CODE.BAD_REQUEST
      ) {
        toastr.banner('Internal Server Error', error.response.data, 'error');
      }
      return rejectWithValue(error.response);
    }
  }
);
export const getClosedCampaigns = createAsyncThunk(
  'campaign/getClosedCampaigns',
  async (data: CampaignFilter, { rejectWithValue }) => {
    try {
      const response = await CampaignService.getCampaignsForDashboard(data);
      return response.data;
    } catch (error) {
      if (
        error.response.status === RESPONSE_CODE.INTERNAL_SERVER_ERROR ||
        error.response.status === RESPONSE_CODE.BAD_REQUEST
      ) {
        toastr.banner('Internal Server Error', error.response.data, 'error');
      }

      return rejectWithValue(error.response);
    }
  }
);
export const startCampaign = createAsyncThunk(
  'campaign/startCampaign',
  async (data: Campaign, { rejectWithValue }) => {
    try {
      const response = await CampaignService.startCampaign(data);
      return response.data;
    } catch (error) {
      if (
        error.response.status === RESPONSE_CODE.INTERNAL_SERVER_ERROR ||
        error.response.status === RESPONSE_CODE.BAD_REQUEST
      ) {
        toastr.banner('Internal Server Error', error.response.data, 'error');
      }

      return rejectWithValue(error.response);
    }
  }
);

export const getCampaignDetails = createAsyncThunk(
  'campaign/GetCampaignSummary/',
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await CampaignService.getCampaignDetails(data);
      const batchDetails = response.data.batches.map((item: BatchDetails) => {
        item.isUnitSelectionDeferred = response.data.isUnitSelectionDeferred;
        return item;
      });
      response.data.batches = batchDetails;
      return response.data;
    } catch (error) {
      if (
        error.response.status === RESPONSE_CODE.INTERNAL_SERVER_ERROR ||
        error.response.status === RESPONSE_CODE.BAD_REQUEST
      ) {
        toastr.banner('Internal Server Error', error.response.data, 'error');
      }

      return rejectWithValue(error.response);
    }
  }
);

export const getCampaignReportParams = createAsyncThunk(
  'campaign/getCampaignReportParams',
  async (data: PayloadForBatch) => {
    const response = await CampaignService.getCampaignReportParams(data);
    return response.data;
  }
);

export const getBatchSelectionUnit = createAsyncThunk(
  'campaign/getSelectionUnit',
  async (data: string) => {
    const response = await CampaignService.getBatchSelectionUnit(data);
    return response.data;
  }
);
export const changeCampaignState = createAsyncThunk(
  'campaign/changeCampaignState',
  async (data: CampaignWorkflowParameter) => {
    const response = await CampaignService.changeCampaignState(data);
  }
);

export const getCampaignById = createAsyncThunk(
  'campaign/GetCampaignById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await CampaignService.getCampaignById(id);
      return response.data;
    } catch (error) {
      toastr.banner('Internal Server Error', error.response.data, 'error');
      return rejectWithValue(error.response);
    }
  }
);

export const setUpdateBatch = createAsyncThunk(
  'campaign/updateBatch',
  async (data: UpdateBatch) => {
    const response = await CampaignService.updateBatch(data);
  }
);
export const getMinimumProductionQuantity = createAsyncThunk(
  'campaign/GetMinimumProductionQuantity',
  async (id: string) => {
    const response = await CampaignService.getMinimumProductionQuantity(id);

    return response.data;
  }
);
export const getMinimumNumberOfBatches = createAsyncThunk(
  'campaign/GetMinimumNumberOfBatches',
  async (id: string) => {
    const response = await CampaignService.getMinimumNumberOfBatches(id);

    return response.data;
  }
);
export const deleteCampaign = createAsyncThunk(
  'campaign/DeleteCampaign',
  async (id: string) => {
    const response = await CampaignService.deleteCampaign(id);

    return response.data;
  }
);
export const addBatch = createAsyncThunk(
  'campaign/addBatch',
  async (data: AddBatch) => {
    const response = await CampaignService.addBatch(data);
    return response.data;
  }
);
export const getBatchIdPatterns = createAsyncThunk(
  'appSettings/getBatchIdPatterns',
  async (payload: Campaign) => {
    const response = await CampaignService.getBatchIdPatterns(payload);
    return response.data;
  }
);
export const deleteBatch = createAsyncThunk(
  'campaign/DeleteBatch',
  async (id: string) => {
    const response = await CampaignService.deleteBatch(id);

    return response.data;
  }
);
export const isRecipeValidForBatchCreation = createAsyncThunk(
  'campaign/isRecipeValidForBatchCreation',
  async (data: string) => {
    const response = await CampaignService.isRecipeValidForBatchCreation(data);
    return response.data;
  }
);

export const isYieldParameterValid = createAsyncThunk(
  'campaign/IsYieldParameterValid',
  async (data: string) => {
    const response = await CampaignService.isYieldParameterValid(data);
    return response.data;
  }
);

export const isRecipeClassBased = createAsyncThunk(
  'campaign/IsRecipeClassBased',
  async (recipe: string) => {
    const response = await CampaignService.isRecipeClassBased(recipe);
    return response.data;
  }
);

export const getRecipeFormulaSets = createAsyncThunk(
  'campaign/GetRecipeFormulaSets',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await CampaignService.getRecipeFormulaSets();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getRecipeFormulaSet = createAsyncThunk(
  'campaign/GetRecipeFormulaSet',
  async (
    arg: { formulaSetId: string; recipeName?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await CampaignService.getRecipeFormulaSet(
        arg.formulaSetId,
        arg.recipeName ?? ''
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCampaignBatchIdPatternByCampaignId = createAsyncThunk(
  'campaign/GetCampaignBatchIdPatternByCampaignId',
  async (campaignId: string) => {
    const response = await CampaignService.GetCampaignBatchIdPatternByCampaignId(
      campaignId
    );
    return response.data;
  }
);

export const getMaxOwners = createAsyncThunk(
  'campaign/GetMaxOwners',
  async (recipeName: string, { rejectWithValue }) => {
    try {
      const response = await CampaignService.GetMaxOwners(recipeName);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const isCampaignRefIdExist = createAsyncThunk(
  'campaign/IsCampaignRefIdExist',
  async (data: string) => {
    const response = await CampaignService.IsCampaignRefIdExist(data);
    return response.data;
  }
);

export const getUpdatedBatchDetails = createAsyncThunk(
  'campaign/GetUpdatedBatchDetails',
  async (campaignId: string) => {
    const response = await CampaignService.GetUpdatedBatchDetails(campaignId);

    return response.data;
  }
);

export const getCampaignBasicSetupInfo = createAsyncThunk(
  'campaign/GetCampaignBasicSetupInfo',
  async (campaignId: string) => {
    const response = await CampaignService.GetCampaignBasicSetupInfo(
      campaignId
    );

    return response.data;
  }
);
