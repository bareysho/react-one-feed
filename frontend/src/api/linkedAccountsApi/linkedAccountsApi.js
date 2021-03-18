import { apiInstance } from 'api/api';

const fetchLinkedAccount = (params) => {
  return apiInstance.get('/api/accounts/fetch-linked-account', { params, withCredentials: true });
};

const getLinkedAccounts = () => {
  return apiInstance.get('/api/accounts/get-linked-accounts', { withCredentials: true });
};
export const linkedAccountApi = {
  fetchLinkedAccount,
  getLinkedAccounts,
}
