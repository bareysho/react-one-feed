const authInstance = require('../apiInstances/authInstance');
const { ANDROID_CLIENT_ID, GRANT_TYPE_REFRESH_TOKEN, X_API_VERSION } = require('../constants');

const refreshToken = async ({ refreshToken }) => {
  const options = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': X_API_VERSION
    }
  }

  const params = {
    grant_type: GRANT_TYPE_REFRESH_TOKEN,
    refresh_token: refreshToken,
    client_id: ANDROID_CLIENT_ID,
  }

  return authInstance.post(`/token/refresh`, params, options);
}

module.exports = refreshToken;
