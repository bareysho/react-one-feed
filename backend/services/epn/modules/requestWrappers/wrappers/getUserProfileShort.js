const apiInstance = require('../apiInstances/apiInstance');

const { X_API_VERSION } = require('../constants');

const getUserProfileShort = async ({ accessToken }) => {
  const params = {
    'v': X_API_VERSION,
  }

  const options = {
    params,
    headers: {
      'content-type': 'application/json',
      'x-access-token': accessToken,
      'x-api-version': X_API_VERSION
    }
  }

  return apiInstance.get('/user/profile/short', options);
}

module.exports = getUserProfileShort;
