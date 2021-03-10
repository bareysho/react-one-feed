import { apiInstance } from 'api/api';

const login = ({ username, password }) => {
  return apiInstance.post('/auth/authenticate', { username, password }, { withCredentials: true });
}

const refreshToken = () => {
  return apiInstance.post('/auth/refresh-token', {}, { withCredentials: true });
};

const revokeToken = () => {
  return apiInstance.post('/auth/revoke-token', {}, { withCredentials: true });
};

const recallUser = (id) => {
  return apiInstance.get(`/api/user/${id}`);
}

const registration = ({ username, password, email }) => {
  return apiInstance.post('/auth/registration', { username, password, email });
};

const requestEmailCode = ({ email, type }) => {
  return apiInstance.post('/auth/request-email-code', { email, type })
}

const verifyEmailVerificationCode = ({ id, otp }) => {
  return apiInstance.post('/auth/verify-email-verification-code', { id, otp }, { withCredentials: true });
};

const verifyRecoveryPasswordCode = ({ id, password, otp }) => {
  return apiInstance.post('/auth/verify-recovery-password-code', { id, password, otp })
}

export const authApi = {
  login,
  revokeToken,
  registration,
  recallUser,
  refreshToken,
  verifyEmailVerificationCode,
  requestEmailCode,
  verifyRecoveryPasswordCode,
}

