import { ImportedEwi } from '../../app/importExport/models/importedEwi';
import { ImportedFormula } from '../../app/importExport/models/importedFormula';

export interface ImportExportState {
  acquireResponse: {
    lockId: string;
    machineIp: string;
    isLockAcquired: boolean;
  };
  exportResponse: {
    lockId: string;
    fileName: string;
    fileExtension: string;
    data: string;
  };
  importedEwis: ImportedEwi[];
  importedFormula: ImportedFormula[];
  importType: string;
  activePopup: string;
  showExportLogs: boolean;
  genExportLogs: {
    impExpCount: number;
    impExpStartTimeStamp: string;
    impExpEndTimeStamp: string;
    actionBy: string;
    fileList: FileList[];
  };
  getImpExpErrorMessage: string;
}
