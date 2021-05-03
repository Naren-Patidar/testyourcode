import { CampaignStatusValues, CampaignStateValues } from '../models/campaign';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getCampaignStateParams(
  //   existingStatus: CampaignStatusValues,
  action: 'save' | 'submit',
  autoApprove: boolean,
  existingState: CampaignStateValues | null
) {
  let status = CampaignStatusValues.Created;
  let state: CampaignStateValues | null = null;

  // eslint-disable-next-line default-case
  switch (action) {
    case 'save':
      state =
        existingState === CampaignStateValues.Running ||
        existingState === CampaignStateValues.Paused
          ? CampaignStateValues.Paused
          : existingState;
      break;
    case 'submit':
      status = autoApprove
        ? CampaignStatusValues.Approved
        : CampaignStatusValues.SubmitForApproval;
      state =
        existingState === CampaignStateValues.Running ||
        existingState === CampaignStateValues.Paused
          ? CampaignStateValues.Paused
          : existingState;
      break;
  }
  return { status, state };
}
