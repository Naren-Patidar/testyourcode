export enum CampaignType {
  ProductionQuantity = 0,
  NoOfBatches,
  RawMaterialConsumption,
  ContinuousCampaign,
}

export const campaignTypes = [
  // {
  //   value: null,
  //   text: 'Please select campaign type',
  // },
  {
    value: CampaignType.ProductionQuantity,
    text: 'Production quantity',
  },
  {
    value: CampaignType.NoOfBatches,
    text: 'No. of batches',
  },
  {
    value: CampaignType.RawMaterialConsumption,
    text: 'Raw material consumption',
  },
  {
    value: CampaignType.ContinuousCampaign,
    text: 'Continuous campaign',
  },
];
