export enum CampaignCategory {
  Active = 0,
  Planned,
  Closed,
}

export interface CampaignFilter {
  campaignCategory: CampaignCategory;
  showAll?: boolean;
}
