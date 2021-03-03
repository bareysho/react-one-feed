import { apiInstance } from 'api/api';

const login = ({ username, password }) => {
  return apiInstance.post('/auth/authenticate', { username, password }, { withCredentials: true });
}

const logout = () => {
  return apiInstance.post('/auth/revoke-token', {}, { withCredentials: true });
};

const recallUser = (id) => {
  return apiInstance.get(`/api/user/${id}`);
}

const registration = (params) => {
  return apiInstance.post('/auth/registration', params);
};

export const authApi = {
  login,
  logout,
  registration,
  recallUser,
}

