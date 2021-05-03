import { httpClient } from '../../http-client';

const CONTROLLER = 'LicenceModel';
const ENPOINTS = {
  GetAdvanceBatchLicense: 'LicenceCheck',
};

export const AdvanceBatchLicenseService = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  GetAdvanceBatchLicense: () =>
    httpClient.get<boolean>(`${CONTROLLER}/${ENPOINTS.GetAdvanceBatchLicense}`),
};
