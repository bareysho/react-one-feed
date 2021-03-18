import { apiInstance } from 'api/api';

const linkYouTubeAccount = (params) => {
  return apiInstance.post('/api/auth/google/callback', params,{ withCredentials: true });
};

const getAuthLink = () => {
  return apiInstance.get('/api/auth/google',{ withCredentials: true });
};

export const youTubeApi = {
  getAuthLink,
  linkYouTubeAccount,
}
