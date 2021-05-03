export interface ImportedEwi {
  id: string;
  title: string;
  description: string;
  validationResultString: string;
  importOptions: number[];
  conflict?: string;
  isConflicted: boolean;
}
