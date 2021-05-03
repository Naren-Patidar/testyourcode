import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExportFilterData } from 'app/importExport/models/exportFilterData';
import { RESPONSE_CODE } from 'utils/app-constants';
import { ImportPackage } from '../../app/importExport/models/importPackage';
import { Importfile } from '../../app/importExport/models/importFile';
import { importExportAPI } from '../../app/importExport/services/importExportAPI';
import {
  changeAcquireLock,
  setActivePopup,
  setExportData,
  setImportedEwi,
  setImportedFormula,
  setImportType,
  setShowExportLogs,
  getGenExportLogs,
  // setImpExpInProgress,
} from './importExportSlice';

export const acquireLock = createAsyncThunk(
  'importExport/acquireLock',
  // eslint-disable-next-line consistent-return
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await importExportAPI.acquireLock();
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL
      ) {
        if (response.data.isLockAcquired) {
          dispatch(changeAcquireLock(response.data));
        }
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const releaseLock = createAsyncThunk(
  'importExport/releaseLock',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await importExportAPI.releaseLock();
      dispatch(
        changeAcquireLock({
          lockId: '',
          machineIp: '',
          isLockAcquired: false,
        })
      );
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const exportData = createAsyncThunk(
  'importExport/exportData',
  // eslint-disable-next-line consistent-return
  async (payload: ExportFilterData, { dispatch, rejectWithValue }) => {
    try {
      const response = await importExportAPI.export(payload);
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL
      ) {
        dispatch(setExportData(response.data));
        dispatch(
          changeAcquireLock({
            lockId: '',
            machineIp: '',
            isLockAcquired: false,
          })
        );
      }
    } catch (err) {
      dispatch(releaseLock());
      return rejectWithValue(err.response.data);
    }
  }
);

export const importPackage = createAsyncThunk(
  'importExport/importPackage',
  // eslint-disable-next-line consistent-return
  async (payload: ImportPackage, { dispatch, rejectWithValue }) => {
    try {
      const response = await importExportAPI.importPackage(payload);
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL
      ) {
        if (response.data.importType === 'EWI') {
          dispatch(setImportedEwi(response.data.fileValidationResults));
          dispatch(setImportType('ewi'));
        } else if (response.data.importType === 'FORMULA') {
          dispatch(setImportedFormula(response.data.fileValidationResults));
          dispatch(setImportType('formula'));
        }
        dispatch(setActivePopup(''));
      }
    } catch (err) {
      dispatch(releaseLock());
      return rejectWithValue(err.response.data);
    }
  }
);

export const importSelected = createAsyncThunk(
  'importExport/importSelected',
  // eslint-disable-next-line consistent-return
  async (payload: Importfile, { dispatch, rejectWithValue }) => {
    try {
      const response = await importExportAPI.importSelected(payload);
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL ||
        response.status === RESPONSE_CODE.NO_CONTENT
      ) {
        dispatch(setShowExportLogs(true));
        dispatch(
          changeAcquireLock({
            lockId: '',
            machineIp: '',
            isLockAcquired: false,
          })
        );
      }
    } catch (err) {
      dispatch(releaseLock());
      return rejectWithValue(err.response.data);
    }
  }
);

export const genExportLogs = createAsyncThunk(
  'importExport/genExpLog',
  // eslint-disable-next-line consistent-return
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await importExportAPI.genExpLog();
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL
      ) {
        dispatch(getGenExportLogs(response.data));
        dispatch(setShowExportLogs(false));
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const genExportedFileLogs = createAsyncThunk(
  'importExport/genExportedFileLog',
  // eslint-disable-next-line consistent-return
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await importExportAPI.genExportedFileLog();
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL
      ) {
        dispatch(getGenExportLogs(response.data));
        dispatch(setShowExportLogs(false));
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
