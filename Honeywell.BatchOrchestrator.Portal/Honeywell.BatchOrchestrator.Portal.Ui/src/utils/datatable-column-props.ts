export interface ColumnProps {
  field: string;
  header: string | JSX.Element;
  sortable?: boolean;
  editable?: boolean;
  editFieldType?: 'text' | 'number';
  renderer?: (cellData: any) => JSX.Element;
  customEditRenderer?: (cellData: any) => JSX.Element;
  align?: 'left' | 'center' | 'right';
  placeholder?: string;
  initialWidth?: string | number;
  className?: string;
}
