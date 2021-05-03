/* eslint-disable camelcase */
const url = window.location.href;
const uriFragments = url.split('/');
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `${uriFragments[0].split(':')[0]}://${
        uriFragments[2]
      }/BatchOrchestratorAPI/api/`
    : 'https://r520-nresv:50101/BatchOrchestratorAPI/api/';
// export const BASE_URL =  ;
const API_URL = `${BASE_URL}FormulaSet/`;
const FM_URL = `${BASE_URL}FormulaManager/`;
const Images_path = `${uriFragments[0].split(':')[0]}://${
  uriFragments[2]
}/ProductionPortal/ImagePath/FormulaSet`;
const AUDITTRAIL_URL = `${BASE_URL}AuditTrail/GetAuditTrails`;
export const SIGNALR_URL =
  process.env.NODE_ENV === 'production'
    ? `${uriFragments[0].split(':')[0]}://${
        uriFragments[2]
      }/BatchOrchestratorAPI/`
    : 'https://r520-nresv:50101/BatchOrchestratorAPI/';
export const HELP_URL = `${uriFragments[0].split(':')[0]}://${
  uriFragments[2]
}/ProductionPortal`;
export const IMAGE_SIZE_LIMIT = '100000'; // 1KB
export { API_URL };
export { FM_URL };
export { Images_path };
export { AUDITTRAIL_URL };
