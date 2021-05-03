export interface UpdateBatch {
  id: string;
  campaignId: string;
  batchYield: number;
  state: string;
  startTime?: Date;
  endTime?: Date;
  currentBatchSize?: number;
}

export interface AddBatch {
  campaignId: string;
  defaultBatchSize?: number;
  currentBatchSize?: number;
}
