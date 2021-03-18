import { apiInstance } from 'api/api';

const BASE_URL = '/email-code'

const requestEmailCode = ({ email, type }) => {
  return apiInstance.post(`${BASE_URL}/request-email-code`, { email, type })
}

const verifyEmailCode = ({ email, otp, type }) => {
  return apiInstance.post(`${BASE_URL}/verify-email-code`, { email, otp, type })
}

export const emailTokenApi = {
  requestEmailCode,
  verifyEmailCode,
}
