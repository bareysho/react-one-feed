const apiInstance = require('../apiInstances/apiInstance');

const { X_API_VERSION } = require('../constants');

const getUserBalances = (currency) => async ({ accessToken }) => {
  const params = {
    currency,
  }

  const options = {
    params,
    headers: {
      'content-type': 'application/json',
      'x-access-token': accessToken,
      'x-api-version': X_API_VERSION
    }
  }

  return apiInstance.get('/purses/balance', options);
}

module.exports = getUserBalances;
