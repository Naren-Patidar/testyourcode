export interface CampaignBatch {
  id: string;
  campaignId: string;
  batchId: string;
  activityId: string;
  executionId: number;
  defaultBatchSize: number;
  currentBatchSize: number;
  batchOrder: number;
  state: number;
  stage: number;
  statusDescription: string;
  startTime: Date;
  endTime: Date;
  status: number;
}
