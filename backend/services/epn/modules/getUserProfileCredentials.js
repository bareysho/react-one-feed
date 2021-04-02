const requestWrappers = require('./requestWrappers');

const getUserProfileCredentials = async (ssidToken, clientId, clientSecret) => {
  try {
    const credentialsResponse = await requestWrappers.userProfileAuth({ ssidToken, clientId, clientSecret });

    const { data: { data: { attributes } } } = credentialsResponse;

    const { access_token: accessToken, refresh_token: refreshToken } = attributes;

    return { accessToken, refreshToken };
  } catch (error) {
    console.log('AUTHENTICATE_REQUEST_ERROR');
    console.log(error.response.data);

    throw error.response.data;
  }
}

module.exports = {
  getUserProfileCredentials,
}
