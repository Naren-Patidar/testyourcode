import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ImportExportState } from './types';
import { AcquireLock, ExportData } from '../../app/importExport/models';

const acquireLockResponse: AcquireLock = {
  lockId: '',
  machineIp: '',
  isLockAcquired: false,
};

const exportDataResponse: ExportData = {
  lockId: '',
  fileName: '',
  fileExtension: '',
  data: '',
};

const exportLogsResponse = {
  impExpCount: 0,
  impExpStartTimeStamp: '',
  impExpEndTimeStamp: '',
  actionBy: '',
  fileList: [],
};

export const initialState: ImportExportState = {
  acquireResponse: acquireLockResponse,
  exportResponse: exportDataResponse,
  importedEwis: [],
  importedFormula: [],
  importType: '',
  activePopup: '',
  showExportLogs: false,
  genExportLogs: exportLogsResponse,
  getImpExpErrorMessage: '',
};

const importExportSliceKey = 'importExport';

const importExportSlice = createSlice({
  name: importExportSliceKey,
  initialState,
  reducers: {
    changeAcquireLock: (state, { payload }: PayloadAction<any>) => {
      state.acquireResponse = payload;
    },
    setExportData: (state, { payload }: PayloadAction<any>) => {
      state.exportResponse = payload;
    },
    clearExportDataResponse: (state) => {
      state.exportResponse = initialState.exportResponse;
    },
    setImportedEwi: (state, { payload }: PayloadAction<any>) => {
      state.importedEwis = payload;
    },
    setEmptyImportEwi: (state) => {
      state.importedEwis = initialState.importedEwis;
    },
    setImportedFormula: (state, { payload }: PayloadAction<any>) => {
      state.importedFormula = payload;
    },
    setEmptyImportFormula: (state) => {
      state.importedFormula = initialState.importedFormula;
    },
    setImportType: (state, { payload }: PayloadAction<any>) => {
      state.importType = payload;
    },
    setActivePopup: (state, { payload }: PayloadAction<any>) => {
      state.activePopup = payload;
    },
    setShowExportLogs: (state, { payload }: PayloadAction<any>) => {
      state.showExportLogs = payload;
    },
    getGenExportLogs: (state, { payload }: PayloadAction<any>) => {
      state.genExportLogs = payload;
    },
    setEmptyExportLogs: (state) => {
      state.genExportLogs = initialState.genExportLogs;
    },
    setImpExpErrorMessage: (state, { payload }: PayloadAction<string>) => {
      state.getImpExpErrorMessage = payload;
    },
  },
});

export const { reducer, name: sliceKey } = importExportSlice;

export const {
  changeAcquireLock,
  setExportData,
  clearExportDataResponse,
  setImportedEwi,
  setEmptyImportEwi,
  setImportedFormula,
  setEmptyImportFormula,
  setImportType,
  setActivePopup,
  setShowExportLogs,
  getGenExportLogs,
  setEmptyExportLogs,
  setImpExpErrorMessage,
} = importExportSlice.actions;
