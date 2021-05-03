/* eslint-disable no-self-assign */
/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from '@reduxjs/toolkit';
import { BatchSize, PayloadForBatch } from 'app/campaign/models/batch-size';
import {
  Campaign,
  CampaignStateValues,
  CampaignStatusValues,
  initialCampaignFormValues,
} from 'app/campaign/models/campaign';
import { CampaignBatch } from 'app/campaign/models/campaign-batch';
import {
  BatchDetails,
  UnitSelection,
} from 'app/campaign/models/campaign-details';
import { CampaignCreationStep } from 'app/campaign/models/campaign-step';
import { CampaignUnitSelection } from 'app/campaign/models/campaign-unit-selection';
import { Formula } from 'app/campaign/models/formula';
import { FormulaParameter } from 'app/campaign/models/formula-parameter';
import { FormulaSet } from 'app/campaign/models/formula-set';
import { MasterRecipe } from 'app/campaign/models/recipe';
import { RefBatch } from 'app/campaign/models/ref-batch';
import { ReportParameter } from 'app/campaign/models/report-parameter';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { MRFormulaSet } from 'app/campaign/models/recipe-formula-set';
import { toLocalDate } from 'utils/date-utils';
import {
  getBatches,
  getBatchSize,
  getCampaignReportParams,
  getPlannedCampaigns,
  getFormulaIds,
  getFormulaParameters,
  getFormulaSets,
  getRawMaterials,
  getRefBatches,
  getSelectionUnits,
  saveCampaign,
  startCampaign,
  getCampaignDetails,
  getBatchSelectionUnit,
  changeCampaignState,
  getCampaignById,
  setUpdateBatch,
  getMinimumProductionQuantity,
  deleteCampaign,
  getClosedCampaigns,
  getActiveCampaigns,
  getMasterRecipes,
  addBatch,
  getBatchIdPatterns,
  isRecipeValidForBatchCreation,
  deleteBatch,
  isYieldParameterValid,
  isRecipeClassBased,
  getRecipeFormulaSets,
  getRecipeFormulaSet,
  getCampaignBatchIdPatternByCampaignId,
  getMaxOwners,
  isCampaignRefIdExist,
  getUpdatedBatchDetails,
  getCampaignBasicSetupInfo,
  getMinimumNumberOfBatches,
} from './effects';
import {
  ActionState,
  CampaignsState,
  CampaignState,
  CampaignSummaryState,
  CampaignTabs,
} from './types';

export const editCampaignSliceKeyName = 'editCampaign';
export const campaignsSliceKeyName = 'campaigns';
export const campaignSummarySliceKeyName = 'campaignSummary';

export const initialEditCampaignState: CampaignState = {
  mode: 'add',
  navigationFrom: 'campaign',
  disableSave: false,
  disableNext: false,
  disableSubmit: false,
  recipeValid: false,
  recipeClassBased: null,
  error: '',
  errorStatusCode: null,
  activeStep: CampaignCreationStep.BasicSetup,
  newCampaignId: '',
  campaignStatus: CampaignStatusValues.Created,
  campaignState: null,
  loading: false,
  selectedCampaign: initialCampaignFormValues,
  selectedFormulaSetId: '',
  selectedFormulaId: '',
  selectedMasterRecipe: '',
  formulaIds: [],
  formulaSets: [],
  batchSize: null,
  refBatches: null,
  rawMaterials: [],
  formulaParameters: [],
  payloadForBatch: null,
  searchTextRawMaterials: '',
  searchTextFormulaParams: '',
  actionState: null,
  selectionUnits: [],
  batches: [],
  reportParams: [],
  batchUnitSelections: [],
  minProdQty: 1,
  selectedRawMaterial: null,
  BatchIdPatterns: [],
  masterRecipes: [],
  formulaParamsEdited: false,
  selectionUnitsEdited: false,
  campaignsStarting: [],
  yieldParameterValid: true,
  yieldParameterLoading: false,
  recipeFormulaSets: [],
  selectedMRFormulaSet: null,
  maxSimulataneousBatch: null,
  campaignRefIdExist: null,
  campaignRefIdExistLoading: false,
  minNoOfBatches: 1,
};
export const initialCampaignsState: CampaignsState = {
  error: '',
  loading: false,
  selectedTab: CampaignTabs.Active,
  plannedCampaigns: [],
  activeCampaigns: [],
  closedCampaigns: [],
};

export const initialCampaignSummaryState: CampaignSummaryState = {
  loading: false,
  error: '',
  campaignDetails: null,
  campaignType: null,
  batches: [],
  isUnitSelectionDeferred: true,
  completedBatch: 0,
  excessRawMaterialQty: 0,
  campaignFault: { code: 0, message: '' },
  productionYield: 0,
};
/**
 * Campaign Dashboard related Slice
 */
const campaignsSlice = createSlice({
  name: campaignsSliceKeyName,
  initialState: initialCampaignsState,
  reducers: {
    setSelectedTab(state, action: PayloadAction<CampaignTabs>) {
      state.selectedTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPlannedCampaigns.pending, (state: CampaignsState) => {
      state.loading = true;
    });
    builder.addCase(
      getPlannedCampaigns.fulfilled,
      (state: CampaignsState, action: PayloadAction<Campaign[]>) => {
        state.loading = false;
        state.plannedCampaigns = action.payload;
      }
    );
    builder.addCase(
      getPlannedCampaigns.rejected,
      (state: CampaignsState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(getActiveCampaigns.pending, (state: CampaignsState) => {
      state.loading = true;
    });
    builder.addCase(
      getActiveCampaigns.fulfilled,
      (state: CampaignsState, action: PayloadAction<Campaign[]>) => {
        state.loading = false;
        state.activeCampaigns = action.payload;
      }
    );
    builder.addCase(
      getActiveCampaigns.rejected,
      (state: CampaignsState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(getClosedCampaigns.pending, (state: CampaignsState) => {
      state.loading = true;
    });
    builder.addCase(
      getClosedCampaigns.fulfilled,
      (state: CampaignsState, action: PayloadAction<Campaign[]>) => {
        state.loading = false;
        state.closedCampaigns = action.payload;
      }
    );
    builder.addCase(
      getClosedCampaigns.rejected,
      (state: CampaignsState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

/**
 * Create/Edit and Campaign Action related Slice
 */
const editCampaignSlice = createSlice({
  name: editCampaignSliceKeyName,
  initialState: initialEditCampaignState,
  reducers: {
    setInitCampaignState(state) {
      return { ...initialEditCampaignState };
    },
    setMode(state, action: PayloadAction<'add' | 'edit'>) {
      state.mode = action.payload;
    },
    setNavigationFrom(state, action: PayloadAction<'formula' | 'campaign'>) {
      state.navigationFrom = action.payload;
    },
    setDisableSave(state, action: PayloadAction<boolean>) {
      state.disableSave = action.payload;
    },
    setDisableNext(state, action: PayloadAction<boolean>) {
      state.disableNext = action.payload;
    },
    setDisableSubmit(state, action: PayloadAction<boolean>) {
      state.disableSubmit = action.payload;
    },
    setActiveStep(state, action: PayloadAction<CampaignCreationStep>) {
      state.activeStep = action.payload;
    },
    setActionState(state, action: PayloadAction<ActionState>) {
      state.actionState = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setSelectedCampaign(state, action: PayloadAction<Campaign>) {
      state.selectedCampaign = action.payload;
    },
    setMRFormulaSet(state, action: PayloadAction<MRFormulaSet>) {
      state.selectedMRFormulaSet = action.payload;
    },
    setMasterRecipe(state, action: PayloadAction<string>) {
      state.selectedMasterRecipe = action.payload;
    },
    setFormulaSetId(state, action: PayloadAction<string>) {
      state.selectedFormulaSetId = action.payload;
    },
    setFormulaId(state, action: PayloadAction<string>) {
      state.selectedFormulaId = action.payload;
    },
    setPayloadForBatch(state, action: PayloadAction<PayloadForBatch>) {
      state.payloadForBatch = action.payload;
    },
    setSearchTextRawMaterials(state, action: PayloadAction<string>) {
      state.searchTextRawMaterials = action.payload;
    },
    setSearchTextFormulaParams(state, action: PayloadAction<string>) {
      state.searchTextFormulaParams = action.payload;
    },
    setFormulaParamterEdited(state, action: PayloadAction<boolean>) {
      state.formulaParamsEdited = action.payload;
    },
    setSelectionUnitsEdited(state, action: PayloadAction<boolean>) {
      state.selectionUnitsEdited = action.payload;
    },
    updateFormulaParamter(state, action: PayloadAction<FormulaParameter>) {
      const formulaParams = [...state.formulaParameters];
      const index = formulaParams.findIndex(
        (f) => f.name === action.payload.name
      );
      formulaParams.splice(index, 1, action.payload);
      state.formulaParameters = formulaParams;
    },

    markEditableRawMaterial(state, action: PayloadAction<FormulaParameter>) {
      const rawMaterials: FormulaParameter[] = state.rawMaterials.map(
        (item) => ({
          ...item,
          editable: false,
        })
      );
      const index = rawMaterials.findIndex((f) => f.id === action.payload.id);
      rawMaterials.splice(index, 1, action.payload);
      state.rawMaterials = rawMaterials;
    },
    updateRawMaterial(state, action: PayloadAction<FormulaParameter>) {
      const rawMaterials = [...state.rawMaterials];
      const index = rawMaterials.findIndex((f) => f.id === action.payload.id);
      rawMaterials.splice(index, 1, action.payload);
      state.rawMaterials = rawMaterials;
    },
    setSelectedRawMaterial(
      state,
      action: PayloadAction<FormulaParameter | null>
    ) {
      state.selectedRawMaterial = action.payload;
    },
    resetYieldParameterValidation(state) {
      state.disableSave = false;
      state.disableNext = false;
      state.yieldParameterValid = true;
      state.error = '';
      state.yieldParameterLoading = false;
    },
    resetCampaignRefIdExist(state) {
      state.campaignRefIdExist = null;
      state.error = '';
      state.campaignRefIdExistLoading = false;
    },
    resetRecipeClassBased(state) {
      state.recipeClassBased = null;
    },
    setRecipeFormulaSet(state, { payload }: PayloadAction<Campaign>) {
      const mrRecipe: MRFormulaSet = {
        id: payload.formulaSetId ?? '',
        isClassBased: payload.isClassBased ?? false,
        isRecipeBased: payload.isRecipeBased ?? false,
        name: payload.formulaSetName,
        recipeName: payload.recipeName,
        description: '',
      };
      state.selectedMRFormulaSet = mrRecipe;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveCampaign.pending,
      (state: CampaignState, { meta: { arg: campaign } }) => {
        state.actionState = 'loading';
        state.selectedCampaign = campaign;
      }
    );
    builder.addCase(
      saveCampaign.fulfilled,
      (state: CampaignState, { payload }) => {
        if (payload.success) {
          state.actionState = 'finished';
          state.error = '';
          state.newCampaignId = payload.createdId;
          state.campaignStatus = state.selectedCampaign.status;
          state.campaignState = state.selectedCampaign.state ?? null;
          state.selectedCampaign = {
            ...state.selectedCampaign,
            id: payload.createdId,
          };
          state.mode = 'edit';
        } else {
          state.actionState = 'error';
          state.error = payload.message;
        }
      }
    );
    builder.addCase(
      saveCampaign.rejected,
      (state: CampaignState, action: any) => {
        state.actionState = 'error';
        state.error = action.payload;
      }
    );
    builder.addCase(
      getMasterRecipes.fulfilled,
      (state: CampaignState, action: PayloadAction<MasterRecipe[]>) => {
        state.masterRecipes = action.payload;
      }
    );
    builder.addCase(getRecipeFormulaSets.pending, (state: CampaignState) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      getRecipeFormulaSets.fulfilled,
      (state: CampaignState, action: PayloadAction<MRFormulaSet[]>) => {
        state.loading = false;
        state.recipeFormulaSets = action.payload;
      }
    );
    builder.addCase(
      getRecipeFormulaSets.rejected,
      (state: CampaignState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.data;
        state.errorStatusCode = action.payload?.status;
      }
    );
    builder.addCase(getRecipeFormulaSet.pending, (state: CampaignState) => {
      state.error = '';
    });
    builder.addCase(
      getRecipeFormulaSet.fulfilled,
      (state: CampaignState, action: PayloadAction<MRFormulaSet>) => {
        state.selectedMRFormulaSet = action.payload;
      }
    );
    builder.addCase(
      getRecipeFormulaSet.rejected,
      (state: CampaignState, action: PayloadAction<any>) => {
        state.error = action.payload;
      }
    );
    builder.addCase(
      getMasterRecipes.rejected,
      (state: CampaignState, action: any) => {
        state.errorStatusCode = action.payload.status;
        state.error = action.payload.data;
      }
    );
    builder.addCase(
      getFormulaSets.fulfilled,
      (state: CampaignState, action: PayloadAction<FormulaSet[]>) => {
        state.formulaSets = action.payload;
      }
    );
    builder.addCase(
      getFormulaIds.fulfilled,
      (state: CampaignState, action: PayloadAction<Formula[]>) => {
        state.formulaIds = action.payload;
      }
    );
    builder.addCase(
      getBatchSize.fulfilled,
      (state: CampaignState, action: PayloadAction<BatchSize>) => {
        state.batchSize = action.payload;
      }
    );
    builder.addCase(
      getRefBatches.fulfilled,
      (state: CampaignState, action: PayloadAction<RefBatch>) => {
        state.refBatches = action.payload;
      }
    );
    builder.addCase(getRawMaterials.pending, (state: CampaignState) => {
      state.loading = true;
    });
    builder.addCase(
      getRawMaterials.fulfilled,
      (state: CampaignState, action: PayloadAction<FormulaParameter[]>) => {
        state.loading = false;
        state.rawMaterials = action.payload;
      }
    );
    builder.addCase(
      getRawMaterials.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(getFormulaParameters.pending, (state: CampaignState) => {
      state.loading = true;
    });
    builder.addCase(
      getFormulaParameters.fulfilled,
      (state: CampaignState, action: PayloadAction<FormulaParameter[]>) => {
        state.loading = false;
        state.formulaParameters = action.payload;
      }
    );
    builder.addCase(
      getFormulaParameters.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(getSelectionUnits.pending, (state: CampaignState) => {
      state.loading = true;
    });
    builder.addCase(
      getSelectionUnits.fulfilled,
      (
        state: CampaignState,
        action: PayloadAction<CampaignUnitSelection[]>
      ) => {
        state.loading = false;
        state.selectionUnits = action.payload;
      }
    );
    builder.addCase(
      getSelectionUnits.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(getBatches.pending, (state: CampaignState) => {
      state.loading = true;
    });
    builder.addCase(
      getBatches.fulfilled,
      (state: CampaignState, action: PayloadAction<CampaignBatch[]>) => {
        state.loading = false;
        state.batches = action.payload;
      }
    );
    builder.addCase(
      getBatches.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(startCampaign.pending, (state: CampaignState, { meta }) => {
      state.actionState = 'loading';
      if (meta.arg.id) {
        state.campaignsStarting.push(meta.arg.id);
      }
    });
    builder.addCase(
      startCampaign.fulfilled,
      (state: CampaignState, { payload }) => {
        state.actionState = 'finished';
        state.campaignsStarting.splice(
          state.campaignsStarting.indexOf(payload),
          1
        );
      }
    );
    builder.addCase(
      startCampaign.rejected,
      (state: CampaignState, action: any) => {
        state.actionState = 'error';
        state.error = action.payload;
      }
    );

    builder.addCase(getCampaignReportParams.pending, (state: CampaignState) => {
      state.loading = true;
    });
    builder.addCase(
      getCampaignReportParams.fulfilled,
      (state: CampaignState, action: PayloadAction<ReportParameter[]>) => {
        state.loading = false;
        state.reportParams = action.payload;
      }
    );
    builder.addCase(
      getCampaignReportParams.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(getBatchSelectionUnit.pending, (state: CampaignState) => {
      state.loading = true;
    });
    builder.addCase(
      getBatchSelectionUnit.fulfilled,
      (state: CampaignState, action: PayloadAction<UnitSelection[]>) => {
        state.loading = false;
        state.batchUnitSelections = action.payload;
      }
    );
    builder.addCase(
      getBatchSelectionUnit.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(getCampaignById.pending, (state: CampaignState) => {
      state.loading = true;
    });
    builder.addCase(
      getCampaignById.fulfilled,
      (state: CampaignState, action: PayloadAction<Campaign>) => {
        state.loading = false;
        // state.selectedFormulaSetId = action.payload.formulaSetId;
        state.newCampaignId = action.payload.id || '';
        const campaign: Campaign = {
          ...action.payload,
          startTime: action.payload.startTime
            ? toLocalDate(`${action.payload.startTime}`)
            : null,
        };
        state.selectedCampaign = campaign;
        state.campaignStatus = action.payload.status;
        state.campaignState = action.payload.state ?? null;
        state.activeStep = action.payload.step;
      }
    );
    builder.addCase(
      getCampaignById.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(setUpdateBatch.pending, (state: CampaignState) => {
      state.actionState = 'loading';
    });
    builder.addCase(
      setUpdateBatch.fulfilled,
      (state: CampaignState, action: PayloadAction<any>) => {
        state.actionState = 'finished';
      }
    );
    builder.addCase(
      setUpdateBatch.rejected,
      (state: CampaignState, action: any) => {
        state.actionState = 'error';
        state.error = action.payload;
      }
    );
    builder.addCase(
      getMinimumProductionQuantity.pending,
      (state: CampaignState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getMinimumProductionQuantity.fulfilled,
      (state: CampaignState, action: PayloadAction<number>) => {
        state.loading = false;
        state.minProdQty = action.payload;
      }
    );
    builder.addCase(
      getMinimumProductionQuantity.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(
      getMinimumNumberOfBatches.pending,
      (state: CampaignState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getMinimumNumberOfBatches.fulfilled,
      (state: CampaignState, action: PayloadAction<number>) => {
        state.loading = false;
        state.minNoOfBatches = action.payload;
      }
    );
    builder.addCase(
      getMinimumNumberOfBatches.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(deleteCampaign.pending, (state: CampaignState) => {
      state.actionState = 'loading';
    });
    builder.addCase(
      deleteCampaign.fulfilled,
      (state: CampaignState, action: PayloadAction<boolean>) => {
        state.actionState = 'finished';
      }
    );
    builder.addCase(
      deleteCampaign.rejected,
      (state: CampaignState, action: any) => {
        state.actionState = 'error';
        state.error = action.payload;
      }
    );
    builder.addCase(changeCampaignState.pending, (state: CampaignState) => {
      state.loading = true;
      state.actionState = 'loading';
    });
    builder.addCase(
      changeCampaignState.fulfilled,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.actionState = 'finished';
      }
    );
    builder.addCase(
      changeCampaignState.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.actionState = 'error';
        state.error = action.payload;
      }
    );
    builder.addCase(addBatch.pending, (state: CampaignState) => {
      state.actionState = 'loading';
    });
    builder.addCase(
      addBatch.fulfilled,
      (state: CampaignState, action: PayloadAction<any>) => {
        state.actionState = 'finished';
      }
    );
    builder.addCase(addBatch.rejected, (state: CampaignState, action: any) => {
      state.actionState = 'error';
      state.error = action.payload;
    });
    builder.addCase(getBatchIdPatterns.pending, (state: CampaignState) => {
      state.loading = true;
    });
    builder.addCase(
      getBatchIdPatterns.fulfilled,
      (state: CampaignState, action: PayloadAction<any>) => {
        state.BatchIdPatterns = action.payload;
      }
    );
    builder.addCase(
      getBatchIdPatterns.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(
      getCampaignBatchIdPatternByCampaignId.pending,
      (state: CampaignState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getCampaignBatchIdPatternByCampaignId.fulfilled,
      (state: CampaignState, action: PayloadAction<any>) => {
        state.selectedCampaign = {
          ...state.selectedCampaign,
          campaignBatchIdPattern: action.payload,
        };
      }
    );
    builder.addCase(
      getCampaignBatchIdPatternByCampaignId.rejected,
      (state: CampaignState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(
      isRecipeValidForBatchCreation.pending,
      (state: CampaignState) => {
        state.error = '';
        state.recipeValid = false;
      }
    );
    builder.addCase(
      isRecipeValidForBatchCreation.fulfilled,
      (state: CampaignState, action: PayloadAction<boolean>) => {
        if (!action.payload) {
          state.error = 'Recipe is not valid';
          state.disableSave = true;
          state.disableNext = true;
          state.recipeValid = false;
        } else {
          state.error = '';
          state.disableSave = false;
          state.disableNext = false;
          state.recipeValid = true;
        }
      }
    );
    builder.addCase(
      isRecipeValidForBatchCreation.rejected,
      (state: CampaignState, action: any) => {
        state.disableSave = true;
        state.disableNext = true;
        state.loading = false;
        state.error = action.payload;
        state.recipeValid = false;
      }
    );
    builder.addCase(deleteBatch.pending, (state: CampaignState) => {
      state.actionState = 'loading';
    });
    builder.addCase(
      deleteBatch.fulfilled,
      (state: CampaignState, action: PayloadAction<boolean>) => {
        state.actionState = 'finished';
      }
    );
    builder.addCase(
      deleteBatch.rejected,
      (state: CampaignState, action: any) => {
        state.actionState = 'error';
        state.error = action.payload;
      }
    );
    builder.addCase(isYieldParameterValid.pending, (state: CampaignState) => {
      state.error = '';
      state.yieldParameterLoading = true;
      state.yieldParameterValid = true;
    });
    builder.addCase(
      isYieldParameterValid.fulfilled,
      (state: CampaignState, action: PayloadAction<boolean>) => {
        state.yieldParameterLoading = false;
        if (!action.payload) {
          state.disableSave = true;
          state.disableNext = true;
          state.yieldParameterValid = false;
        } else {
          state.disableSave = false;
          state.disableNext = false;
          state.yieldParameterValid = true;
        }
      }
    );
    builder.addCase(
      isYieldParameterValid.rejected,
      (state: CampaignState, action: any) => {
        state.disableSave = true;
        state.disableNext = true;
        state.yieldParameterLoading = false;
        state.error = action.payload;
        state.yieldParameterValid = false;
      }
    );
    builder.addCase(isRecipeClassBased.pending, (state: CampaignState) => {
      state.recipeClassBased = null;
    });
    builder.addCase(
      isRecipeClassBased.fulfilled,
      (state: CampaignState, action: PayloadAction<boolean>) => {
        state.recipeClassBased = action.payload;
      }
    );
    builder.addCase(
      isRecipeClassBased.rejected,
      (state: CampaignState, action: any) => {
        state.recipeClassBased = false;
      }
    );
    builder.addCase(
      getMaxOwners.fulfilled,
      (state: CampaignState, action: PayloadAction<number>) => {
        state.maxSimulataneousBatch = action.payload;
        state.error =
          action.payload < 1
            ? "You can't create campaign as Max owners are less than 1"
            : '';
      }
    );
    builder.addCase(
      getMaxOwners.rejected,
      (state: CampaignState, action: any) => {
        state.maxSimulataneousBatch = 0;
        state.error = "You can't create campaign as Max owners are less than 1";
      }
    );
    builder.addCase(isCampaignRefIdExist.pending, (state: CampaignState) => {
      state.error = '';
      state.campaignRefIdExistLoading = true;
    });
    builder.addCase(
      isCampaignRefIdExist.fulfilled,
      (state: CampaignState, action: PayloadAction<boolean>) => {
        state.campaignRefIdExistLoading = false;
        if (action.payload) {
          state.disableSave = true;
          state.disableNext = true;
          state.campaignRefIdExist = true;
        } else {
          state.disableSave = false;
          state.disableNext = false;
          state.campaignRefIdExist = false;
        }
      }
    );
    builder.addCase(
      isCampaignRefIdExist.rejected,
      (state: CampaignState, action: any) => {
        state.disableSave = true;
        state.disableNext = true;
        state.campaignRefIdExistLoading = false;
        state.error = action.payload;
        state.campaignRefIdExist = false;
      }
    );
  },
});

/**
 * Campaign Summary related Slice
 */
const campaignSummarySlice = createSlice({
  name: campaignSummarySliceKeyName,
  initialState: initialCampaignSummaryState,
  reducers: {
    markEditableBatch(state, action: PayloadAction<BatchDetails>) {
      const BatchDetailsData: BatchDetails[] = state.batches.map((item) => ({
        ...item,
        editable: false,
      }));
      const index = BatchDetailsData.findIndex(
        (f) => f.id === action.payload.id
      );
      BatchDetailsData.splice(index, 1, action.payload);
      state.batches = BatchDetailsData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCampaignDetails.pending,
      (state: CampaignSummaryState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getCampaignDetails.fulfilled,
      (state: CampaignSummaryState, { payload }) => {
        const {
          campaignDetails,
          campaignType,
          campaignFault,
          excessRawMaterialQty,
          isUnitSelectionDeferred,
          productionYield,
          batches,
          completedBatch,
        } = payload;
        state.loading = false;
        state.campaignDetails = campaignDetails;
        state.campaignType = campaignType;
        state.campaignFault = campaignFault;
        state.excessRawMaterialQty = excessRawMaterialQty;
        state.isUnitSelectionDeferred = isUnitSelectionDeferred;
        state.productionYield = productionYield;
        state.batches = batches;
        state.completedBatch = completedBatch;
      }
    );
    builder.addCase(
      getCampaignDetails.rejected,
      (state: CampaignSummaryState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(
      getUpdatedBatchDetails.pending,
      (state: CampaignSummaryState) => {
        state.loading = true;
        state.actionState = 'loading';
      }
    );
    builder.addCase(
      getUpdatedBatchDetails.fulfilled,
      (
        state: CampaignSummaryState,
        action: PayloadAction<{
          batches: BatchDetails[];
          completedBatch: number;
        }>
      ) => {
        state.loading = false;
        state.actionState = 'finished';
        const { batches, completedBatch } = action.payload;
        if (batches?.length > 0) {
          // const existingBatches = [...state.campaignSummary.batches];
          // const updatedBatches = existingBatches.map((batch) => {
          //   const updatedBatch =
          //     batches.find((f) => f.id === batch.id) ?? batch;
          //   updatedBatch.isUnitSelectionDeferred =
          //     batch.isUnitSelectionDeferred;
          //   return updatedBatch;
          // });

          state.batches = batches;
          state.completedBatch = completedBatch;
        }
      }
    );
    builder.addCase(
      getUpdatedBatchDetails.rejected,
      (state: CampaignSummaryState, action: any) => {
        state.loading = false;
        state.actionState = 'error';
        state.error = action.payload;
      }
    );
    builder.addCase(
      getCampaignBasicSetupInfo.pending,
      (state: CampaignSummaryState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getCampaignBasicSetupInfo.fulfilled,
      (
        state: CampaignSummaryState,
        action: PayloadAction<CampaignSummaryState>
      ) => {
        state.loading = false;
        const {
          campaignDetails,
          campaignType,
          campaignFault,
          excessRawMaterialQty,
          isUnitSelectionDeferred,
          productionYield,
        } = action.payload;

        state.campaignType = campaignType;
        state.campaignDetails = campaignDetails;
        state.campaignFault = campaignFault;
        state.excessRawMaterialQty = excessRawMaterialQty;
        state.isUnitSelectionDeferred = isUnitSelectionDeferred;
        state.productionYield = productionYield;
      }
    );
    builder.addCase(
      getCampaignBasicSetupInfo.rejected,
      (state: CampaignSummaryState, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});
export const {
  actions: campaignActions,
  reducer: campaignReducer,
  name: campaignSliceKey,
} = editCampaignSlice;

export const {
  actions: campaignsActions,
  reducer: campaignsReducer,
  name: campaignsSliceKey,
} = campaignsSlice;

export const {
  actions: campaignSummaryActions,
  reducer: campaignSummaryReducer,
  name: campaignSummarySliceKey,
} = campaignSummarySlice;
