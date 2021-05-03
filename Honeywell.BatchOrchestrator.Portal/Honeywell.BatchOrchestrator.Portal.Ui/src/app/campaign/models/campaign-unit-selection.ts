export interface CampaignUnitSelection {
  id?: string;
  campaignId?: string;
  unitClassName?: string; // Name of Class Label
  unitName?: string;
  unitParameterName?: string;
  primaryUnit?: string;
  primaryUnitCurrent?: string;
  changeType?: string;
  unitSelectionList: string[];
}

export enum UnitSelectionType {
  PreselectUnits = 0,
  DeferToOperator,
}
export const unitSelectionTypeVals = [
  {
    value: false,
    text: 'Preselect units',
    disabled: false,
  },
  {
    value: true,
    text: 'Defer to operator',
    disabled: false,
  },
];
