export interface ExportFilterData {
  lockId: string;
  type: string;
  exportFileName: string;
  workInstructions: [];
  formulaSets: [];
  encryptionKey?: string;
}

export interface FileList {
  id: string;
  title: string;
}
