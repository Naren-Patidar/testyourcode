export interface FormulaParameter {
  id: string;
  campaignId: string;
  name: string;
  description: string;
  paramType: string;
  defaultValue: string;
  totalQuantityForCampaign: number | null;
  optionValue: string;
  minValue: string;
  maxValue: string;
  engUnit: string;
  scalable: boolean;
  isRawMaterial: boolean;
  accessLock: string;
  paramIndex: number;
  editable?: boolean;
}
