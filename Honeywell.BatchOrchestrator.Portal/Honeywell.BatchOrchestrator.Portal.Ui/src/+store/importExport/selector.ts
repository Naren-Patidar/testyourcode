import { createSelector } from 'reselect';
import { RootState } from '../types';
// eslint-disable-next-line import/named
import { initialState } from './importExportSlice';

const selectImportExportState = (state: RootState) =>
  state.importExport || initialState;

export const getAcquireResponse = createSelector(
  [selectImportExportState],
  (state) => state.acquireResponse
);

export const getExportDataResponse = createSelector(
  [selectImportExportState],
  (state) => state.exportResponse
);

export const selectImportedEwi = createSelector(
  [selectImportExportState],
  (state) => state.importedEwis
);

export const selectImportedFormula = createSelector(
  [selectImportExportState],
  (state) => state.importedFormula
);

export const selectImportType = createSelector(
  [selectImportExportState],
  (state) => state.importType
);

export const selectActivePopup = createSelector(
  [selectImportExportState],
  (state) => state.activePopup
);

export const getShowExportLogs = createSelector(
  [selectImportExportState],
  (state) => state.showExportLogs
);

export const getExportLogsResponse = createSelector(
  [selectImportExportState],
  (state) => state.genExportLogs
);

export const getImpExpErrorMessage = createSelector(
  [selectImportExportState],
  (state) => state.getImpExpErrorMessage
);
