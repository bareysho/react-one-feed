import { apiInstance } from 'api/api';

const linkEpnAccount = (params) => {
  return apiInstance.post('/api/epn/login', params, { withCredentials: true });
};

const refreshToken = () => {
  return apiInstance.get('/api/epn/refresh-token', { withCredentials: true });
};

const shortLink = (params) => {
  return apiInstance.post('/api/epn/short-link', params, { withCredentials: true });
};

export const epnApi = {
  linkEpnAccount,
  refreshToken,
  shortLink
}
