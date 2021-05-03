import { httpClient } from 'core/http-client';

const CONTROLLER = 'ClientLogger';
const ENPOINTS = {
  LogClientError: 'LogClientError',
};

export const ErrorLogService = {
  logClientError: (payload: Error) =>
    httpClient.post<any>(`${CONTROLLER}/${ENPOINTS.LogClientError}`, payload),
};
