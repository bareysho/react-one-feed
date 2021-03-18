const requestWrappers = require('./requestWrappers');

const getProfileUserSsid = async (reCaptchaToken, reCaptchaPhrase) => {
  try {
    const userProfileSsidResponse = await requestWrappers.getSsid({ reCaptchaToken, reCaptchaPhrase });

    const { data: { data: { attributes: { ssid_token: ssidToken } } } } = userProfileSsidResponse;

    return ssidToken;
  } catch (error) {
    console.log('GET_USER_PROFILE_SHORT_REQUEST_ERROR');
    console.log(error.response.data);

    throw error.response.data;
  }
}

module.exports = {
  getProfileUserSsid,
}
