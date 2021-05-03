import { CampaignUnitSelection } from '../models/campaign-unit-selection';

export const getUpdatedUnitSelection = (units: CampaignUnitSelection[]) => {
  const updatedUnits = units.map((unit) => ({
    ...unit,
    primaryUnitCurrent: unit.primaryUnit,
  }));
  return updatedUnits;
};
