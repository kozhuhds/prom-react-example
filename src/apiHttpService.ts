import axios, { AxiosInstance } from 'axios';
import { callConfig, PROM_UI_REQUEST_SECONDS_COUNT } from './constants';

export const apiHttpService: AxiosInstance = axios.create({});

apiHttpService.interceptors.request.use((req) => {
  req.headers = {
    'request-startTime': performance.now().toString(),
  };
  return req;
});

apiHttpService.interceptors.response.use((res) => {
  const start = res.config.headers?.['request-startTime']
    ? +res.config.headers?.['request-startTime']
    : 0;
  const end = performance.now();

  callConfig.call.metrics?.observe(
    PROM_UI_REQUEST_SECONDS_COUNT.name,
    {
      uri: res.config.url?.replace(/\?.*/, '') || 'unknown',
      method: res.config.method?.toUpperCase() || 'unknown',
      statusCode: res.status.toString(),
    },
    (end - start) / 1000,
  );

  return res;
});
