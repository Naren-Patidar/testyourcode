import { CampaignType } from './campaign-type';

export interface BatchSize {
  defaultBatchSize: number;
  currentBatchSize: number;
  batchSizeEngUnit: string;
}
export interface PayloadForBatch {
  id?: string | null;
  campaignType?: CampaignType | null;
  isRecipeBased?: boolean;
  recipeName?: string;
  formulaId?: string | null;
  defaultBatchSize?: number | null;
  currentBatchSize?: number | null;
  batchIdPattern?: string;
  productionQty?: number | null;
  minimumBatchSize?: number | null;
  isLastBatchScaled?: boolean;
  rawMaterialParameterId?: string | null;
  rawMaterialQty?: number | null;
  noOfBatches?: number | null;
}
