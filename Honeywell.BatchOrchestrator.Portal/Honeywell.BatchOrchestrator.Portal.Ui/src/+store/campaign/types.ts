import { BatchSize, PayloadForBatch } from 'app/campaign/models/batch-size';
import {
  Campaign,
  CampaignFault,
  CampaignStateValues,
  CampaignStatusValues,
} from 'app/campaign/models/campaign';
import { CampaignBatch } from 'app/campaign/models/campaign-batch';
import { CampaignUnitSelection } from 'app/campaign/models/campaign-unit-selection';
import { Formula } from 'app/campaign/models/formula';
import { FormulaParameter } from 'app/campaign/models/formula-parameter';
import { FormulaSet } from 'app/campaign/models/formula-set';
import { RefBatch } from 'app/campaign/models/ref-batch';
import {
  BatchDetails,
  CampaignDetails,
  CampaignType,
  UnitSelection,
} from 'app/campaign/models/campaign-details';
import { ReportParameter } from 'app/campaign/models/report-parameter';
import { CampaignCreationStep } from 'app/campaign/models/campaign-step';
import { AppSettings } from 'app/campaign/models/app-settings';
import { MasterRecipe } from 'app/campaign/models/recipe';
import { MRFormulaSet } from 'app/campaign/models/recipe-formula-set';
// eslint-disable-next-line import/named
export type ActionState = 'loading' | 'finished' | 'error' | null;
export interface CampaignState {
  mode: 'add' | 'edit';
  navigationFrom: 'formula' | 'campaign';
  disableSave: boolean;
  disableNext: boolean;
  disableSubmit: boolean;
  loading: boolean;
  recipeValid: boolean;
  recipeClassBased: boolean | null;
  error: string;
  errorStatusCode: number | null;
  activeStep: CampaignCreationStep;
  newCampaignId: string;
  campaignStatus: CampaignStatusValues;
  campaignState: CampaignStateValues | null;
  selectedCampaign: Campaign;
  formulaSets: FormulaSet[];
  masterRecipes: MasterRecipe[];
  selectedFormulaSetId: string;
  selectedMasterRecipe: string;
  selectedFormulaId: string;
  formulaIds: Formula[];
  refBatches: RefBatch | null;
  batchSize: BatchSize | null;
  rawMaterials: FormulaParameter[];
  formulaParameters: FormulaParameter[];
  payloadForBatch: PayloadForBatch | null;
  searchTextRawMaterials: string;
  searchTextFormulaParams: string;
  actionState?: ActionState;
  selectionUnits: CampaignUnitSelection[];
  batches: CampaignBatch[];
  reportParams: ReportParameter[];
  batchUnitSelections: UnitSelection[];
  minProdQty: number;
  selectedRawMaterial: FormulaParameter | null;
  BatchIdPatterns: AppSettings[];
  formulaParamsEdited: boolean;
  selectionUnitsEdited: boolean;
  campaignsStarting: string[];
  yieldParameterValid: boolean;
  yieldParameterLoading: boolean;
  recipeFormulaSets: MRFormulaSet[];
  selectedMRFormulaSet: MRFormulaSet | null;
  maxSimulataneousBatch: number | null;
  campaignRefIdExist: boolean | null;
  campaignRefIdExistLoading: boolean;
  minNoOfBatches: number;
}

export enum CampaignTabs {
  Active = 0,
  Planned,
  Closed,
}
export interface CampaignsState {
  loading: boolean;
  error: string;
  selectedTab: CampaignTabs;
  plannedCampaigns: Campaign[];
  activeCampaigns: Campaign[];
  closedCampaigns: Campaign[];
}

export interface CampaignSummaryState {
  loading: boolean;
  error: string;
  actionState?: ActionState;
  campaignDetails: CampaignDetails | null;
  campaignType: CampaignType | null;
  batches: BatchDetails[];
  isUnitSelectionDeferred: boolean;
  excessRawMaterialQty: number;
  completedBatch: number;
  campaignFault: CampaignFault;
  productionYield: number;
}
