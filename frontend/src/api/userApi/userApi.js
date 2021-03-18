import { apiInstance } from 'api/api';

const changePassword = ({ currentPassword, password }) => {
  return apiInstance.patch('/api/user/change-password', { currentPassword, password })
}

const recoveryPassword = ({ email, otp, password }) => {
  return apiInstance.patch('/api/user/recovery-password', { email, otp, password });
}

const changeEmail = ({ email, otp }) => {
  return apiInstance.patch('/api/user/change-email', { email, otp }, { withCredentials: true });
}

const verifyEmail = ({ email, otp }) => {
  return apiInstance.patch('/api/user/verify-email', { email, otp }, { withCredentials: true });
}


export const userApi = {
  changePassword,
  changeEmail,
  recoveryPassword,
  verifyEmail,
}
