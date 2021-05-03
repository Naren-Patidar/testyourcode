export interface FileImported {
  id: string;
  fileName: string;
  fileAction: number | null;
  formulaSetFileName?: string;
  title?: string;
  description?: string;
  conflict?: string;
  isConflicted?: boolean;
  importOptions?: number[];
}
export interface Importfile {
  lockId: string;
  importedFileList: FileImported[];
}
