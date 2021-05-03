/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { httpClient } from 'core/http-client/http-client';

// controller name
const CONTROLLER = 'ImpExp';
// api routes/endpoint
const ACQUIRELOCK_IMPORT = 'acquireLock';
const RELEASELOCK_IMPORT = 'releaseLock';
const IMPORT_PACKAGE = 'importPackage';
const EXPORT = 'export';
const IMPORT_SELECTED = 'import';
const GENEXPLOG = 'genImpLog';
const GENEXPORTEDFILELOG = 'genExpLog';
export const importExportAPI = {
  acquireLock: () => httpClient.post(`${CONTROLLER}/${ACQUIRELOCK_IMPORT}`),
  releaseLock: () => httpClient.post(`${CONTROLLER}/${RELEASELOCK_IMPORT}`),
  importPackage: (payload) =>
    httpClient.post(
      `${CONTROLLER}/${IMPORT_PACKAGE}`,
      {
        lockId: payload.lockId,
        fileName: payload.fileName,
        fileExtension: payload.fileExtension,
        data: payload.data,
      },
      {
        headers: { X_ENCRYPTION_KEY: payload.encryptionKey },
      }
    ),
  export: (payload) =>
    httpClient.post(`${CONTROLLER}/${EXPORT}`, payload, {
      headers: { X_ENCRYPTION_KEY: payload.encryptionKey },
    }),
  importSelected: (payload) =>
    httpClient.post(`${CONTROLLER}/${IMPORT_SELECTED}`, payload),
  genExpLog: () => httpClient.get(`${CONTROLLER}/${GENEXPLOG}`),
  genExportedFileLog: () =>
    httpClient.get(`${CONTROLLER}/${GENEXPORTEDFILELOG}`),
};
