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

const getUserCreatives = ({ id }) => {
  return apiInstance.get('/api/epn/get-user-creatives', { params: { id }, withCredentials: true });
};

const parseDescriptionLinks = ({ epnAccountId, links, creativeCode, domainCutter }) => {
  return apiInstance.post(
    '/api/epn/parse-description-links',
    { epnAccountId, links, creativeCode, domainCutter },
    { withCredentials: true }
    );
};

const getDomainCutters = ({ epnAccountId }) => {
  return apiInstance.get('/api/epn/get-domain-cutters', { params: { epnAccountId }, withCredentials: true });
};

export const epnApi = {
  linkEpnAccount,
  refreshToken,
  shortLink,
  getUserCreatives,
  parseDescriptionLinks,
  getDomainCutters,
}
