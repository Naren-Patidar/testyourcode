import { BASE_URL } from 'utils/Settings';

const api = 'AppSettings';

export const getAppSettingsURL = () => {
  return `${BASE_URL}${api}/GetAppSettings`;
};
export const updateAppsettingsURL = () => {
  return `${BASE_URL}${api}/UpdateAppsettings`;
};
