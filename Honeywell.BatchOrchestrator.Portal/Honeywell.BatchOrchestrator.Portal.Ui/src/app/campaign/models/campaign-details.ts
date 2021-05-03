import {
  CampaignFault,
  CampaignStateValues,
  CampaignStatusValues,
} from './campaign';

export interface CampaignDetails {
  batchIdPattern: string;
  batchStartMethod: number;
  isScheduledCampaign: boolean;
  simultaneousBatches: number;
  startTime: Date | null;
}

export interface CampaignType {
  batchSizeEngUnit: string;
  campaignRefId: string;
  campaignType: number;
  currentBatchSize: number;
  defaultBatchSize: number;
  minimumBatchSize: number;
  formulaId: string;
  formulaName: string;
  formulaSetName: string;
  formulasetId: string;
  isLastBatchScaled: boolean;
  isRecipeBased: boolean;
  productionQty: number;
  estimatedQty: number;
  recipeName: string;
  referenceBatch: string;
  identificationNumber: string;
  state: CampaignStateValues | null;
  status: CampaignStatusValues | null;
  noOfBatches: number | null;
}

export interface BatchDetails {
  batchId: string;
  batchOrder: number;
  batchYield: number;
  campaignId: string;
  currentBatchSize: number;
  defaultBatchSize: number;
  executionId: number;
  activityId: string;
  id: string;
  isStatusUnknown: boolean;
  stage: string;
  state: string;
  status: string;
  statusDescription: string;
  editable?: boolean;
  startTime: Date | null;
  endTime: Date | null;
  batchUnitSelection: UnitSelection[];
  isUnitSelectionDeferred: boolean;
}
export enum BatchStateValues {
  Running = 1,
  Aborted,
  Complete,
  Stopped,
}

export interface UnitSelection {
  unitName: string;
  primaryUnit: string;
}
