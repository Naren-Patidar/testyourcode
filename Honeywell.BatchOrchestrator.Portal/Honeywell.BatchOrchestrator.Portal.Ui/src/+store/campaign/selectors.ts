/* eslint-disable import/named */
import { IOption } from '@scuf/common/dist/components/Select/ISelectProps';
import { CampaignStateValues } from 'app/campaign/models/campaign';
import { ReportParameter } from 'app/campaign/models/report-parameter';
import { create, filter } from 'lodash';
import { createSelector } from 'reselect';
import { AppConstants } from 'utils';
import { RootState } from '../types';

import {
  initialEditCampaignState,
  initialCampaignsState,
  initialCampaignSummaryState,
} from './slice';

// First select the relevant part from the state
const selectCampaignState = (state: RootState) =>
  state.editCampaign || initialEditCampaignState;

const selectCampaignsState = (state: RootState) =>
  state.campaigns || initialCampaignsState;

const selectCampaignSummaryState = (state: RootState) =>
  state.campaignSummary || initialCampaignSummaryState;

export const selectLoading = createSelector(
  [selectCampaignState],
  (state) => state.loading
);
export const selectActionState = createSelector(
  [selectCampaignState],
  (state) => state.actionState
);
export const selectError = createSelector(
  [selectCampaignState],
  (state) => state.error
);

export const selectErrorStatusCode = createSelector(
  [selectCampaignState],
  (state) => state.errorStatusCode
);

export const selectFormulaSetsSource = createSelector(
  [selectCampaignState],
  (state) => state.formulaSets
);
export const selectFormulaSets = createSelector(
  selectFormulaSetsSource,
  (data) => data?.map((item) => ({ text: item.name, value: item.id }))
);

export const selectedFormulaSet = createSelector(
  selectCampaignState,
  selectFormulaSetsSource,
  (state, formulaSets) =>
    formulaSets?.find((item) => item.id === state.selectedFormulaSetId)
);
export const selectMasterRecipesSource = createSelector(
  [selectCampaignState],
  (state) => state.masterRecipes
);
export const selectMasterRecipes = createSelector(
  selectMasterRecipesSource,
  (data) =>
    data?.map((item) => ({ text: item.recipeName, value: item.recipeName }))
);

export const selectedMasterRecipe = createSelector(
  selectCampaignState,
  selectMasterRecipesSource,
  (state, masterRecipes) =>
    masterRecipes?.find(
      (item) => item.recipeName === state.selectedMasterRecipe
    )
);
export const selectFormulaIdSource = createSelector(
  [selectCampaignState],
  (state) => state.formulaIds
);
export const selectFormulaIds = createSelector(
  selectFormulaIdSource,
  (formulas) => formulas?.map((item) => ({ text: item.name, value: item.id }))
);
export const selectedFormula = createSelector(
  selectCampaignState,
  selectFormulaIdSource,
  (state, formulas) =>
    formulas?.find((item) => item.id === state.selectedFormulaId)
);
export const selectBatchSize = createSelector(
  [selectCampaignState],
  (state) => state.batchSize
);

export const selectRefBatches = createSelector(
  [selectCampaignState],
  (state) => {
    let refBatches: IOption[] = [
      {
        text: 'No Selection',
        value: '',
      },
    ];
    refBatches = [
      ...refBatches,
      ...(state.refBatches?.referenceBatchList?.map((item) => ({
        text: item,
        value: item,
      })) || []),
    ];
    return refBatches;
  }
);
export const selectSearchTextRawMaterials = createSelector(
  [selectCampaignState],
  (state) => state.searchTextRawMaterials
);
export const selectSearchTextFormulaParams = createSelector(
  [selectCampaignState],
  (state) => state.searchTextFormulaParams
);
export const selectRawMaterials = createSelector(
  selectCampaignState,
  selectSearchTextRawMaterials,
  (state, search) =>
    search
      ? state.rawMaterials?.filter(
          (f) =>
            f.description.toLowerCase().includes(search.toLowerCase()) ||
            f.name.toLowerCase().includes(search.toLowerCase())
        )
      : state.rawMaterials
);
export const selectFormulaParameters = createSelector(
  selectCampaignState,
  selectSearchTextFormulaParams,
  (state, search) =>
    search
      ? state.formulaParameters?.filter(
          (f) =>
            f.description.toLowerCase().includes(search.toLowerCase()) ||
            f.name.toLowerCase().includes(search.toLowerCase())
        )
      : state.formulaParameters
);
export const selectPayloadForBatch = createSelector(
  [selectCampaignState],
  (state) => state.payloadForBatch
);

export const selectCampaign = createSelector(
  [selectCampaignState],
  (state) => state.selectedCampaign
);
export const selectSelectionUnits = createSelector(
  [selectCampaignState],
  (state) => state.selectionUnits
);
// export const selectCreatedCampaigns = createSelector(
//   [selectCampaignState],
//   (state) => state.createdCampaigns
// );
export const selectBatches = createSelector(
  [selectCampaignState],
  (state) => state.batches
);
export const selectPlannedCampaigns = createSelector(
  [selectCampaignsState],
  (state) => state.plannedCampaigns
);
export const selectNewCampaignId = createSelector(
  [selectCampaignState],
  (state) => state.newCampaignId
);

export const selectActiveCampaigns = createSelector(
  [selectCampaignsState],
  (state) => state.activeCampaigns
);
export const selectClosedCampaigns = createSelector(
  [selectCampaignsState],
  (state) => state.closedCampaigns
);
export const selectReportParams = createSelector(
  [selectCampaignState],
  (state) => {
    let reportParams: IOption[] = [
      {
        text: 'No Selection',
        value: '',
      },
    ];
    reportParams = [
      ...reportParams,
      ...(state.reportParams?.map((item) => ({
        text: item.description,
        value: item.name,
      })) || []),
    ];
    return reportParams;
  }
);

export const selectBatchSelectionUnit = createSelector(
  [selectCampaignState],
  (state) => state.batchUnitSelections
);

export const selectSelectedCampaignTab = createSelector(
  [selectCampaignsState],
  (state) => state.selectedTab
);

export const selectMode = createSelector(
  [selectCampaignState],
  (state) => state.mode
);
export const selectNavigationFrom = createSelector(
  [selectCampaignState],
  (state) => state.navigationFrom
);
export const selectDisableSave = createSelector(
  [selectCampaignState],
  (state) => state.disableSave
);
export const selectDisableNext = createSelector(
  [selectCampaignState],
  (state) => state.disableNext
);
export const selectDisableSubmit = createSelector(
  [selectCampaignState],
  (state) => state.disableSubmit
);
export const selectCampaignStatus = createSelector(
  [selectCampaignState],
  (state) => state.campaignStatus
);
export const selectCampaignActiveState = createSelector(
  [selectCampaignState],
  (state) => state.campaignState
);
export const selectCampaignActiveStep = createSelector(
  [selectCampaignState],
  (state) => state.activeStep
);
export const selectCampaignFieldDisabled = createSelector(
  selectCampaignActiveState,
  (campaignState) =>
    campaignState === CampaignStateValues.Paused ||
    campaignState === CampaignStateValues.Running
);
export const selectCampaignInterimFieldDisabled = createSelector(
  selectNewCampaignId,
  selectCampaignStatus,
  (campaignId, campaignStatus) =>
    !!(campaignId && campaignId !== AppConstants.EMPTY_GUID)
);
export const selectUpdateBatch = createSelector(
  [selectCampaignState],
  (state) => state.actionState
);

export const selectMinProdQty = createSelector(
  [selectCampaignState],
  (state) => state.minProdQty
);

export const selectAddBatch = createSelector(
  [selectCampaignState],
  (state) => state.actionState
);
export const selectSelectedRawMaterial = createSelector(
  [selectCampaignState],
  (state) => state.selectedRawMaterial
);
export const selectBatchIdPatterns = createSelector(
  [selectCampaignState],
  (state) => {
    const newState =
      state.BatchIdPatterns?.map((item) => ({
        id: item.id,
        text: item.patternPreview,
        value: item.patternPreview,
        key: item.key,
        patternJson: item.value,
      })) || [];
    newState.push({
      id: '',
      text: 'Customize batch Id',
      value: 'CustomizeBatchId',
      key: '',
      patternJson: '',
    });
    return newState;
  }
);

export const selectRecipeValid = createSelector(
  [selectCampaignState],
  (state) => state.recipeValid
);

export const selectFormulaParamsEdited = createSelector(
  [selectCampaignState],
  (state) => state.formulaParamsEdited
);

export const selectSelectionUnitsEdited = createSelector(
  [selectCampaignState],
  (state) => state.selectionUnitsEdited
);

export const selectCampaignsStarting = createSelector(
  [selectCampaignState],
  (state) => state.campaignsStarting
);

export const selectYieldParameterValid = createSelector(
  [selectCampaignState],
  (state) => state.yieldParameterValid
);
export const selectYieldParameterLoading = createSelector(
  [selectCampaignState],
  (state) => state.yieldParameterLoading
);
export const selectRecipeClassBased = createSelector(
  [selectCampaignState],
  (state) => state.recipeClassBased
);
export const selectRecipeFormulaSets = createSelector(
  [selectCampaignState],
  (state) => state.recipeFormulaSets
);
export const selectSelectedMRFormulaSet = createSelector(
  [selectCampaignState],
  (state) => state.selectedMRFormulaSet
);
export const selectCampaignBatchIdPatternByCampaignId = createSelector(
  [selectCampaignState],
  (state) => state.selectedCampaign.campaignBatchIdPattern
);

export const selectMaxSimulataneousBatch = createSelector(
  [selectCampaignState],
  (state) => state.maxSimulataneousBatch
);

export const selectCampaignRefIdExist = createSelector(
  [selectCampaignState],
  (state) => state.campaignRefIdExist
);
export const selectCampaignRefIdExistLoading = createSelector(
  [selectCampaignState],
  (state) => state.campaignRefIdExistLoading
);

export const selectMinNoOfBatches = createSelector(
  [selectCampaignState],
  (state) => state.minNoOfBatches
);

export const selectCampaignSummaryBatches = createSelector(
  [selectCampaignSummaryState],
  (state) => state.batches
);
export const selectCampaignSummaryDetails = createSelector(
  [selectCampaignSummaryState],
  (state) => state.campaignDetails
);
export const selectCampaignSummaryCampaignFault = createSelector(
  [selectCampaignSummaryState],
  (state) => state.campaignFault
);
export const selectCampaignSummaryType = createSelector(
  [selectCampaignSummaryState],
  (state) => state.campaignType
);
export const selectCampaignSummaryCompletedBatch = createSelector(
  [selectCampaignSummaryState],
  (state) => state.completedBatch
);
export const selectCampaignSummaryExcessRawMaterialQty = createSelector(
  [selectCampaignSummaryState],
  (state) => state.excessRawMaterialQty
);
export const selectCampaignSummaryIsUnitSelectionDeferred = createSelector(
  [selectCampaignSummaryState],
  (state) => state.isUnitSelectionDeferred
);
export const selectCampaignSummaryProductionYield = createSelector(
  [selectCampaignSummaryState],
  (state) => state.productionYield
);
export const selectCampaignSummaryActionState = createSelector(
  [selectCampaignSummaryState],
  (state) => state.actionState
);
