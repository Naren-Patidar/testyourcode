import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppVersionService } from 'core/app-shell/services/app-version-service';
import { AdvanceBatchLicenseService } from 'core/app-shell/services/advanceBatch-license-service';

export const getVersion = createAsyncThunk('appShell/getVersion', async () => {
  const response = await AppVersionService.getVersion();
  return response.data;
});

export const getAdvanceBatchLicense = createAsyncThunk(
  'appShell/getAdvanceBatchLicense',
  async () => {
    const response = await AdvanceBatchLicenseService.GetAdvanceBatchLicense();
    return response.data;
  }
);
