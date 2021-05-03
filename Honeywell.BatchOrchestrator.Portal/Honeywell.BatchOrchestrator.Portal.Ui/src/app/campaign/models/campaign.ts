import { BatchStartMethod } from './campaign-start-method';
import { CampaignType } from './campaign-type';
import { FormulaParameter } from './formula-parameter';
import {
  CampaignUnitSelection,
  UnitSelectionType,
} from './campaign-unit-selection';
import { CampaignCreationStep } from './campaign-step';
import { CampaignBatch } from './campaign-batch';
import { CampaignBatchIdPattern } from './campaign-batchId-pattern';

export enum TypeValues {
  FormulaSet = 0,
  Recipe = 1,
}
export enum CampaignStatusValues {
  Created = 0,
  SubmitForApproval = 1,
  Approved = 2,
}
export enum CampaignStateValues {
  Paused = 0,
  Running = 1,
  Terminating = 2,
  Terminated = 3,
  Completed = 4,
}
export const campaignStatuses = [
  {
    value: CampaignStatusValues.Created,
    text: 'Draft',
  },
  {
    value: CampaignStatusValues.SubmitForApproval,
    text: 'In Review',
  },
  {
    value: CampaignStatusValues.Approved,
    text: 'Approved',
  },
];
export const campaignStates = [
  {
    value: CampaignStateValues.Running,
    text: 'Running',
  },
  {
    value: CampaignStateValues.Paused,
    text: 'Paused',
  },
  {
    value: CampaignStateValues.Terminating,
    text: 'Terminating',
  },
  {
    value: CampaignStateValues.Terminated,
    text: 'Terminated',
  },
  {
    value: CampaignStateValues.Completed,
    text: 'Completed',
  },
];

export interface CampaignFault {
  code: number;
  message: string;
}
export interface Campaign {
  id?: string | null;
  isRecipeBased?: boolean;
  formulaId: string | null;
  formulaName: string;
  formulaSetId: string | null;
  formulaSetName: string;
  recipeName: string;
  campaignType: CampaignType | null;
  productionQty: number | null;
  campaignRefId: string;
  defaultBatchSize: number | null;
  currentBatchSize: number | null;
  minimumBatchSize: number | null;
  batchSizeEngUnit: string;
  isLastBatchScaled: boolean;
  referenceBatch: string;
  yieldParameter: string;
  batchStartMethod: number;
  simultaneousBatches: number;
  isScheduledCampaign: boolean;
  startTime: Date | null;
  batchIdPattern: string;
  status: number;
  state: number | null;
  step: number;
  noOfBatches: number | null;
  productionYield: number;
  campaignFormulaSetParameter: FormulaParameter[];
  isUnitSelectionDeferred: boolean;
  isAutoApproved: boolean;
  campaignUnitSelection: CampaignUnitSelection[];
  rawMaterial: string | null;
  rawMaterialParameterId: string | null;
  campaignBatches: CampaignBatch[];
  campaignBatchIdPattern: CampaignBatchIdPattern | null;
  submitterComment?: string | null;
  approverComment?: string | null;
  BatchIdPatternPreview?: string | null;
  BatchIdPatternContainerList?: [] | null;
  rawMaterialQty?: number | null;
  rawMaterialEngUnit?: string | null;
  fault: CampaignFault;
  batchIdPatternPreviewLength?: number | 0;
  isClassBased?: boolean | null;
}

export const initialCampaignFormValues: Campaign = {
  isRecipeBased: false,
  formulaId: null,
  formulaName: '',
  formulaSetId: null,
  formulaSetName: '',
  batchIdPattern: '',
  batchSizeEngUnit: '',
  batchStartMethod: BatchStartMethod.OperatorToStart,
  campaignFormulaSetParameter: [],
  campaignRefId: '',
  campaignType: null,
  campaignUnitSelection: [],
  isLastBatchScaled: false,
  referenceBatch: '',
  isScheduledCampaign: false,
  startTime: null,
  isUnitSelectionDeferred: true,
  isAutoApproved: false,
  recipeName: '',
  simultaneousBatches: 1,
  status: CampaignStatusValues.Created,
  state: null,
  step: CampaignCreationStep.BasicSetup,
  productionYield: 0,
  rawMaterial: null,
  defaultBatchSize: null,
  currentBatchSize: null,
  minimumBatchSize: null,
  noOfBatches: null,
  productionQty: null,
  yieldParameter: '',
  rawMaterialParameterId: null,
  campaignBatches: [],
  campaignBatchIdPattern: null,
  fault: { code: 0, message: '' },
};

export interface CampaignWorkflowParameter {
  id?: string;
  status?: number;
  state?: number;
  comment?: string;
}
