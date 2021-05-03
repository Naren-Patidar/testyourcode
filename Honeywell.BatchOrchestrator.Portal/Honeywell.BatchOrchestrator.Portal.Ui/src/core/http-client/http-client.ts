import axios, { AxiosError } from 'axios';
import { errorHandler } from 'core/error';
import { toastr } from 'shared/toastr';
import { RESPONSE_CODE } from 'utils/app-constants';
import { BASE_URL } from 'utils/Settings';
import { getCookie } from 'utils/utility';

const xsrfToken = getCookie('X-XSRF-TOKEN');
export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  async (err: AxiosError) => {
    const error = { ...err };
    if (error.isAxiosError) {
      if (
        error.response?.status === RESPONSE_CODE.FORBIDDEN ||
        error.response?.status === RESPONSE_CODE.UNAUTHORIZED ||
        error.response?.status === RESPONSE_CODE.INTERNAL_SERVER_ERROR ||
        error.response?.status === RESPONSE_CODE.BAD_REQUEST
      ) {
        const { message } = errorHandler(error.response);
        error.response.data = message;
      }
    }

    return Promise.reject(error);
  }
);
