/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PayloadForBatch } from 'app/campaign/models/batch-size';
import { Campaign } from 'app/campaign/models/campaign';
import { BatchDetails } from 'app/campaign/models/campaign-details';
import { CampaignFilter } from 'app/campaign/models/campaign-filter';
import { CampaignCreationStep } from 'app/campaign/models/campaign-step';
import { FormulaParameter } from 'app/campaign/models/formula-parameter';
import { MRFormulaSet } from 'app/campaign/models/recipe-formula-set';
import { AddBatch, UpdateBatch } from 'app/campaign/models/update-batch';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/@reduxjs';
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
  getActiveCampaigns,
  getBatchSelectionUnit,
  changeCampaignState,
  getCampaignById,
  setUpdateBatch,
  getMinimumProductionQuantity,
  deleteCampaign,
  getClosedCampaigns,
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
  selectActionState,
  selectBatches,
  selectBatchSize,
  selectCampaign,
  selectPlannedCampaigns,
  selectedFormula,
  selectedFormulaSet,
  selectError,
  selectErrorStatusCode,
  selectFormulaIds,
  selectFormulaParameters,
  selectFormulaSets,
  selectLoading,
  selectNewCampaignId,
  selectPayloadForBatch,
  selectRawMaterials,
  selectRefBatches,
  selectReportParams,
  selectSelectionUnits,
  selectActiveCampaigns,
  selectBatchSelectionUnit,
  selectSelectedCampaignTab,
  selectMode,
  selectCampaignStatus,
  selectCampaignActiveState,
  selectCampaignFieldDisabled,
  selectCampaignActiveStep,
  selectUpdateBatch,
  selectMinProdQty,
  selectClosedCampaigns,
  selectSelectedRawMaterial,
  selectSearchTextFormulaParams,
  selectSearchTextRawMaterials,
  selectedMasterRecipe,
  selectMasterRecipes,
  selectAddBatch,
  selectDisableSave,
  selectBatchIdPatterns,
  selectRecipeValid,
  selectDisableNext,
  selectDisableSubmit,
  selectNavigationFrom,
  selectFormulaParamsEdited,
  selectSelectionUnitsEdited,
  selectCampaignsStarting,
  selectYieldParameterValid,
  selectYieldParameterLoading,
  selectRecipeClassBased,
  selectRecipeFormulaSets,
  selectSelectedMRFormulaSet,
  selectCampaignBatchIdPatternByCampaignId,
  selectCampaignInterimFieldDisabled,
  selectMaxSimulataneousBatch,
  selectCampaignRefIdExist,
  selectCampaignRefIdExistLoading,
  selectCampaignSummaryBatches,
  selectCampaignSummaryCampaignFault,
  selectCampaignSummaryCompletedBatch,
  selectCampaignSummaryDetails,
  selectCampaignSummaryExcessRawMaterialQty,
  selectCampaignSummaryIsUnitSelectionDeferred,
  selectCampaignSummaryProductionYield,
  selectCampaignSummaryType,
  selectCampaignSummaryActionState,
  selectMinNoOfBatches,
} from './selectors';
import {
  campaignActions,
  campaignReducer,
  campaignSliceKey,
  campaignsReducer,
  campaignsSliceKey,
  campaignsActions,
  campaignSummaryActions,
  campaignSummarySliceKey,
  campaignSummaryReducer,
} from './slice';
import { ActionState, CampaignTabs } from './types';

export const useCampaignFacade = () => {
  useInjectReducer({ key: campaignSliceKey, reducer: campaignReducer });
  useInjectReducer({ key: campaignsSliceKey, reducer: campaignsReducer });
  useInjectReducer({
    key: campaignSummarySliceKey,
    reducer: campaignSummaryReducer,
  });

  const loading = useSelector(selectLoading);
  const actionState = useSelector(selectActionState);
  const error = useSelector(selectError);
  const errorStatusCode = useSelector(selectErrorStatusCode);
  const campaign = useSelector(selectCampaign);

  const batchSize = useSelector(selectBatchSize);
  const formulaIds = useSelector(selectFormulaIds);
  const refBatches = useSelector(selectRefBatches);
  const formulaSetSelected = useSelector(selectedFormulaSet);
  const formulaSelected = useSelector(selectedFormula);
  const formulaSets = useSelector(selectFormulaSets);
  const rawMaterials = useSelector(selectRawMaterials);
  const formulaParams = useSelector(selectFormulaParameters);
  const payloadForBatch = useSelector(selectPayloadForBatch);
  const selectionUnits = useSelector(selectSelectionUnits);
  const plannedCampaigns = useSelector(selectPlannedCampaigns);
  const activeCampaigns = useSelector(selectActiveCampaigns);
  const closedCampaigns = useSelector(selectClosedCampaigns);
  const batches = useSelector(selectBatches);
  const newCampaignId = useSelector(selectNewCampaignId);
  const reportParams = useSelector(selectReportParams);
  const batchUnitSelections = useSelector(selectBatchSelectionUnit);
  const selectedCampaignTab = useSelector(selectSelectedCampaignTab);
  const campaignStatus = useSelector(selectCampaignStatus);
  const campaignState = useSelector(selectCampaignActiveState);
  const campaignFieldDisabled = useSelector(selectCampaignFieldDisabled);
  const campaignInterimFieldDisabled = useSelector(
    selectCampaignInterimFieldDisabled
  );
  const activeStep = useSelector(selectCampaignActiveStep);
  const updateBatch = useSelector(selectUpdateBatch);
  const minProdQty = useSelector(selectMinProdQty);
  const minNoOfBatches = useSelector(selectMinNoOfBatches);
  const addedBatch = useSelector(selectAddBatch);
  const mode = useSelector(selectMode);
  const navigationFrom = useSelector(selectNavigationFrom);
  const disableSave = useSelector(selectDisableSave);
  const disableNext = useSelector(selectDisableNext);
  const disableSubmit = useSelector(selectDisableSubmit);
  const selectedRawMaterial = useSelector(selectSelectedRawMaterial);
  const searchTextFormulaParams = useSelector(selectSearchTextFormulaParams);
  const searchTextRawMaterials = useSelector(selectSearchTextRawMaterials);
  const batchIdPatterns = useSelector(selectBatchIdPatterns);
  const masterRecipeSelected = useSelector(selectedMasterRecipe);
  const masterRecipes = useSelector(selectMasterRecipes);
  const recipeValid = useSelector(selectRecipeValid);
  const formulaParamsEdited = useSelector(selectFormulaParamsEdited);
  const selectionUnitsEdited = useSelector(selectSelectionUnitsEdited);
  const campaignsInStarting = useSelector(selectCampaignsStarting);
  const yieldParameterValid = useSelector(selectYieldParameterValid);
  const yieldParameterLoading = useSelector(selectYieldParameterLoading);
  const recipeClassBased = useSelector(selectRecipeClassBased);
  const recipeFormulaSets = useSelector(selectRecipeFormulaSets);
  const selectedMRFormulaSet = useSelector(selectSelectedMRFormulaSet);
  const selectCampaignBatchIdPattern = useSelector(
    selectCampaignBatchIdPatternByCampaignId
  );
  const maxSimulataneousBatch = useSelector(selectMaxSimulataneousBatch);
  const campaignRefIdExist = useSelector(selectCampaignRefIdExist);
  const campaignRefIdExistLoading = useSelector(
    selectCampaignRefIdExistLoading
  );

  const campaignSummaryBatches = useSelector(selectCampaignSummaryBatches);
  const campaignSummaryCampaignFault = useSelector(
    selectCampaignSummaryCampaignFault
  );
  const campaignSummaryCompletedBatch = useSelector(
    selectCampaignSummaryCompletedBatch
  );
  const campaignSummaryCampaignDetails = useSelector(
    selectCampaignSummaryDetails
  );
  const campaignSummaryExcessRawMaterialQty = useSelector(
    selectCampaignSummaryExcessRawMaterialQty
  );
  const campaignSummaryIsUnitSelectionDeferred = useSelector(
    selectCampaignSummaryIsUnitSelectionDeferred
  );
  const campaignSummaryProductionYield = useSelector(
    selectCampaignSummaryProductionYield
  );
  const campaignSummaryCampaignType = useSelector(selectCampaignSummaryType);
  const campaignSummaryActionState = useSelector(
    selectCampaignSummaryActionState
  );

  const dispatch = useDispatch();

  const initializeCampaignState = useCallback(() => {
    dispatch(campaignActions.setInitCampaignState());
  }, [dispatch]);
  const setMasterRecipe = useCallback(
    (recipe: string) => {
      dispatch(campaignActions.setMasterRecipe(recipe));
    },
    [dispatch]
  );
  const setFormulaSetId = useCallback(
    (id: string) => {
      dispatch(campaignActions.setFormulaSetId(id));
    },
    [dispatch]
  );
  const setFormulaId = useCallback(
    (id: string) => {
      dispatch(campaignActions.setFormulaId(id));
    },
    [dispatch]
  );
  const addCampaign = useCallback(
    (payload: Campaign) => {
      dispatch(saveCampaign(payload));
    },
    [dispatch]
  );
  const fetchAllRecipeFormulaSets = useCallback(() => {
    dispatch(getRecipeFormulaSets());
  }, [dispatch]);
  const fetchRecipeFormulaSet = useCallback(
    ({
      formulaSetId,
      recipeName,
    }: {
      formulaSetId: string;
      recipeName?: string;
    }) => {
      dispatch(getRecipeFormulaSet({ formulaSetId, recipeName }));
    },
    [dispatch]
  );
  const fetchAllFormulaSets = useCallback(() => {
    dispatch(getFormulaSets());
  }, [dispatch]);
  const fetchFormulaIds = useCallback(
    (formulaSet: string) => {
      dispatch(getFormulaIds(formulaSet));
    },
    [dispatch]
  );
  const fetchBatchSize = useCallback(
    (payload: PayloadForBatch) => {
      dispatch(getBatchSize(payload));
    },
    [dispatch]
  );
  const fetchRefBatches = useCallback(
    (payload: PayloadForBatch) => {
      dispatch(getRefBatches(payload));
    },
    [dispatch]
  );
  const fetchRawMaterials = useCallback(
    (payload: PayloadForBatch) => {
      dispatch(getRawMaterials(payload));
    },
    [dispatch]
  );
  const fetchFormulaParameters = useCallback(
    (payload: PayloadForBatch) => {
      dispatch(getFormulaParameters(payload));
    },
    [dispatch]
  );
  const setPayloadForBatch = useCallback(
    (data: PayloadForBatch) => {
      dispatch(campaignActions.setPayloadForBatch(data));
    },
    [dispatch]
  );
  const setSearchTextRawMaterials = useCallback(
    (data: string) => {
      dispatch(campaignActions.setSearchTextRawMaterials(data));
    },
    [dispatch]
  );
  const setSearchTextFormulaParams = useCallback(
    (data: string) => {
      dispatch(campaignActions.setSearchTextFormulaParams(data));
    },
    [dispatch]
  );
  const setFormulaParamterEdited = useCallback(
    (data: boolean) => {
      dispatch(campaignActions.setFormulaParamterEdited(data));
    },
    [dispatch]
  );
  const setSelectionUnitsEdited = useCallback(
    (data: boolean) => {
      dispatch(campaignActions.setSelectionUnitsEdited(data));
    },
    [dispatch]
  );
  const updateFormulaParamter = useCallback(
    (data: FormulaParameter) => {
      dispatch(campaignActions.updateFormulaParamter(data));
    },
    [dispatch]
  );
  const markEditableRawMaterial = useCallback(
    (data: FormulaParameter) => {
      dispatch(campaignActions.markEditableRawMaterial(data));
    },
    [dispatch]
  );
  const updateRawMaterial = useCallback(
    (data: FormulaParameter) => {
      dispatch(campaignActions.updateRawMaterial(data));
    },
    [dispatch]
  );
  const setError = useCallback(
    (data: string) => {
      dispatch(campaignActions.setError(data));
    },
    [dispatch]
  );
  const setDisableSave = useCallback(
    (data: boolean) => {
      dispatch(campaignActions.setDisableSave(data));
    },
    [dispatch]
  );
  const setDisableNext = useCallback(
    (data: boolean) => {
      dispatch(campaignActions.setDisableNext(data));
    },
    [dispatch]
  );
  const setDisableSubmit = useCallback(
    (data: boolean) => {
      dispatch(campaignActions.setDisableSubmit(data));
    },
    [dispatch]
  );
  const fetchSelectionUnits = useCallback(
    (payload: PayloadForBatch) => {
      dispatch(getSelectionUnits(payload));
    },
    [dispatch]
  );
  const fetchBatches = useCallback(
    (payload: PayloadForBatch) => {
      dispatch(getBatches(payload));
    },
    [dispatch]
  );
  const setSelectedCampaign = useCallback(
    (data: Campaign) => {
      dispatch(campaignActions.setSelectedCampaign(data));
    },
    [dispatch]
  );
  const setActionState = useCallback(
    (data: ActionState) => {
      dispatch(campaignActions.setActionState(data));
    },
    [dispatch]
  );
  const fetchPlannedCampaigns = useCallback(
    (data: CampaignFilter) => {
      dispatch(getPlannedCampaigns(data));
    },
    [dispatch]
  );
  const fetchActiveCampaigns = useCallback(
    (data: CampaignFilter) => {
      dispatch(getActiveCampaigns(data));
    },
    [dispatch]
  );
  const fetchClosedCampaigns = useCallback(
    (data: CampaignFilter) => {
      dispatch(getClosedCampaigns(data));
    },
    [dispatch]
  );

  const executeStartCampaign = useCallback(
    (data: Campaign) => {
      dispatch(startCampaign(data));
    },
    [dispatch]
  );
  const fetchCampaignDetails = useCallback(
    (payload: string) => {
      dispatch(getCampaignDetails(payload));
    },
    [dispatch]
  );
  const fetchReportParams = useCallback(
    (data: PayloadForBatch) => {
      dispatch(getCampaignReportParams(data));
    },
    [dispatch]
  );
  const fetchBatchSelectionUnit = useCallback(
    (payload: string) => {
      dispatch(getBatchSelectionUnit(payload));
    },
    [dispatch]
  );
  const changeCampaignsState = useCallback(
    (data) => {
      dispatch(changeCampaignState(data));
    },
    [dispatch]
  );
  const setMRFormulaSet = useCallback(
    (data: MRFormulaSet) => {
      dispatch(campaignActions.setMRFormulaSet(data));
    },
    [dispatch]
  );

  const setSelectedTab = useCallback(
    (data: CampaignTabs) => {
      dispatch(campaignsActions.setSelectedTab(data));
    },
    [dispatch]
  );
  const fetchCampaignById = useCallback(
    (payload: string) => {
      dispatch(getCampaignById(payload));
    },
    [dispatch]
  );
  const setMode = useCallback(
    (payload: 'add' | 'edit') => {
      dispatch(campaignActions.setMode(payload));
    },
    [dispatch]
  );
  const setNavigationFrom = useCallback(
    (payload: 'formula' | 'campaign') => {
      dispatch(campaignActions.setNavigationFrom(payload));
    },
    [dispatch]
  );
  const setActiveStep = useCallback(
    (data: CampaignCreationStep) => {
      dispatch(campaignActions.setActiveStep(data));
    },
    [dispatch]
  );
  const changeUpdateBatch = useCallback(
    (data: UpdateBatch) => {
      dispatch(setUpdateBatch(data));
    },
    [dispatch]
  );
  const fetchMinimumProductionQuantity = useCallback(
    (id: string) => {
      dispatch(getMinimumProductionQuantity(id));
    },
    [dispatch]
  );
  const removeCampaign = useCallback(
    (id: string) => {
      dispatch(deleteCampaign(id));
    },
    [dispatch]
  );
  const addBatches = useCallback(
    (data: AddBatch) => {
      dispatch(addBatch(data));
    },
    [dispatch]
  );
  const markEditableBatch = useCallback(
    (data: BatchDetails) => {
      dispatch(campaignSummaryActions.markEditableBatch(data));
    },
    [dispatch]
  );
  const setSelectedRawMaterial = useCallback(
    (data: FormulaParameter | null) => {
      dispatch(campaignActions.setSelectedRawMaterial(data));
    },
    [dispatch]
  );
  const fetchBatchIdPatterns = useCallback(
    (data: Campaign) => {
      dispatch(getBatchIdPatterns(data));
    },
    [dispatch]
  );
  const fetchMasterRecipes = useCallback(() => {
    dispatch(getMasterRecipes());
  }, [dispatch]);

  const isRecipeValid = useCallback(
    (recipeName: string) => {
      dispatch(isRecipeValidForBatchCreation(recipeName));
    },
    [dispatch]
  );
  const removeBatch = useCallback(
    (id: string) => {
      dispatch(deleteBatch(id));
    },
    [dispatch]
  );
  const isYieldParamValid = useCallback(
    (data: string) => {
      dispatch(isYieldParameterValid(data));
    },
    [dispatch]
  );
  const resetYieldParameterValidation = useCallback(() => {
    dispatch(campaignActions.resetYieldParameterValidation());
  }, [dispatch]);
  const resetCampaignRefIdExist = useCallback(() => {
    dispatch(campaignActions.resetCampaignRefIdExist());
  }, [dispatch]);

  const isCampaignReferenceIdExist = useCallback(
    (data: string) => {
      dispatch(isCampaignRefIdExist(data));
    },
    [dispatch]
  );

  const isRecipeClassBasedForSCMRCM = useCallback(
    (data: string) => {
      dispatch(isRecipeClassBased(data));
    },
    [dispatch]
  );
  const resetRecipeClassBased = useCallback(() => {
    dispatch(campaignActions.resetRecipeClassBased());
  }, [dispatch]);

  const fetchCampaignBatchIdPatternByCampaignId = useCallback(
    (campaignId: string) => {
      dispatch(getCampaignBatchIdPatternByCampaignId(campaignId));
    },
    [dispatch]
  );
  const fetchMaxSimultaneousBatch = useCallback(
    (recipeName: string) => {
      dispatch(getMaxOwners(recipeName));
    },
    [dispatch]
  );

  const fetchUpdatedBatchDetails = useCallback(
    (campaignId: string) => {
      dispatch(getUpdatedBatchDetails(campaignId));
    },
    [dispatch]
  );
  const fetchCampaignBasicSetupInfo = useCallback(
    (campaignId: string) => {
      dispatch(getCampaignBasicSetupInfo(campaignId));
    },
    [dispatch]
  );

  const setRecipeFormulaSet = useCallback(
    (data: Campaign) => {
      dispatch(campaignActions.setRecipeFormulaSet(data));
    },
    [dispatch]
  );
  const fetchMinimumNumberOfBatches = useCallback(
    (data: string) => {
      dispatch(getMinimumNumberOfBatches(data));
    },
    [dispatch]
  );

  return {
    loading,
    actionState,
    campaign,
    plannedCampaigns,
    error,
    errorStatusCode,
    batchSize,
    formulaIds,
    refBatches,
    formulaSets,
    formulaSetSelected,
    formulaSelected,
    rawMaterials,
    formulaParams,
    payloadForBatch,
    selectionUnits,
    batches,
    newCampaignId,
    activeCampaigns,
    closedCampaigns,
    reportParams,
    batchUnitSelections,
    selectedCampaignTab,
    mode,
    navigationFrom,
    campaignStatus,
    campaignState,
    campaignFieldDisabled,
    activeStep,
    updateBatch,
    minProdQty,
    selectedRawMaterial,
    searchTextFormulaParams,
    searchTextRawMaterials,
    masterRecipeSelected,
    masterRecipes,
    disableSave,
    batchIdPatterns,
    disableNext,
    disableSubmit,
    recipeValid,
    formulaParamsEdited,
    selectionUnitsEdited,
    campaignsInStarting,
    yieldParameterValid,
    yieldParameterLoading,
    recipeClassBased,
    recipeFormulaSets,
    selectedMRFormulaSet,
    selectCampaignBatchIdPattern,
    campaignInterimFieldDisabled,
    maxSimulataneousBatch,
    campaignRefIdExist,
    campaignRefIdExistLoading,
    campaignSummaryBatches,
    campaignSummaryCampaignDetails,
    campaignSummaryCampaignFault,
    campaignSummaryCampaignType,
    campaignSummaryCompletedBatch,
    campaignSummaryExcessRawMaterialQty,
    campaignSummaryIsUnitSelectionDeferred,
    campaignSummaryProductionYield,
    campaignSummaryActionState,
    minNoOfBatches,
    initializeCampaignState,
    setFormulaSetId,
    setMasterRecipe,
    addCampaign,
    fetchAllFormulaSets,
    fetchRecipeFormulaSet,
    fetchBatchSize,
    fetchRefBatches,
    fetchFormulaIds,
    fetchRawMaterials,
    fetchFormulaParameters,
    setPayloadForBatch,
    setSearchTextRawMaterials,
    setSearchTextFormulaParams,
    updateFormulaParamter,
    setError,
    fetchSelectionUnits,
    fetchPlannedCampaigns,
    fetchBatches,
    setSelectedCampaign,
    setActionState,
    executeStartCampaign,
    fetchCampaignDetails,
    fetchActiveCampaigns,
    fetchClosedCampaigns,
    fetchReportParams,
    fetchBatchSelectionUnit,
    changeCampaignsState,
    setSelectedTab,
    fetchCampaignById,
    setMode,
    setNavigationFrom,
    setActiveStep,
    changeUpdateBatch,
    fetchMinimumProductionQuantity,
    removeCampaign,
    addBatches,
    markEditableBatch,
    updateRawMaterial,
    markEditableRawMaterial,
    setSelectedRawMaterial,
    setFormulaId,
    fetchMasterRecipes,
    setDisableSave,
    fetchBatchIdPatterns,
    setDisableNext,
    setDisableSubmit,
    isRecipeValid,
    removeBatch,
    setFormulaParamterEdited,
    setSelectionUnitsEdited,
    isYieldParamValid,
    resetYieldParameterValidation,
    resetRecipeClassBased,
    isRecipeClassBasedForSCMRCM,
    fetchAllRecipeFormulaSets,
    setMRFormulaSet,
    fetchCampaignBatchIdPatternByCampaignId,
    fetchMaxSimultaneousBatch,
    resetCampaignRefIdExist,
    isCampaignReferenceIdExist,
    fetchUpdatedBatchDetails,
    setRecipeFormulaSet,
    fetchCampaignBasicSetupInfo,
    fetchMinimumNumberOfBatches,
  };
};
