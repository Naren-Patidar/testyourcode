/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { httpClient } from 'core/http-client';

const CONTROLLER = 'FormulaManager';
const ENPOINTS = {
  GetProductVersion: 'GetProductVersion',
};

export const AppVersionService = {
  getVersion: () =>
    httpClient.get<string>(`${CONTROLLER}/${ENPOINTS.GetProductVersion}`),
};
