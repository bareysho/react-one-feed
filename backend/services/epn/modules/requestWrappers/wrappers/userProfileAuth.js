const authInstance = require('../apiInstances/authInstance');

const { X_API_VERSION, GRANT_TYPE_CLIENT_CREDENTIALS } = require('../constants');

const userProfileAuth = async ({ ssidToken, clientId, clientSecret }) => {
  const options = {
    headers: {
      'content-type': 'application/json',
    }
  }

  const params = {
    grant_type: GRANT_TYPE_CLIENT_CREDENTIALS,
    check_ip: false,
    ssid_token: ssidToken,
    client_id: clientId,
    client_secret: clientSecret
  }

  return authInstance.post(`/token?v=${X_API_VERSION}`, params, options);
}

module.exports = userProfileAuth;
