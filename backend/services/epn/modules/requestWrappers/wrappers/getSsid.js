const authInstance = require('../apiInstances/authInstance');
const { WEB_CLIENT_ID, X_API_VERSION } = require('../constants');

const getSsid = async ({ reCaptchaToken, reCaptchaPhrase }) => {
  const params = {
    client_id: WEB_CLIENT_ID
  }

  const additionalHeaders = reCaptchaToken && reCaptchaPhrase ? {
    'x-captcha': reCaptchaToken,
    'x-captcha-phrase-key': reCaptchaPhrase,
  } : {};

  const options = {
    params,
    headers: {
      'content-type': 'application/json',
      ...additionalHeaders,
    }
  }

  return authInstance.get(`/ssid?v=${X_API_VERSION}`, options);
}

module.exports = getSsid;
