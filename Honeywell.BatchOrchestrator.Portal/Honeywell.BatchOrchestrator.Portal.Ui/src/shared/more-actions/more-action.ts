export interface MoreAction {
  name: string;
  disabled?: boolean;
  disabledTooltip?: string;
  onClick: (data: any) => void;
}
