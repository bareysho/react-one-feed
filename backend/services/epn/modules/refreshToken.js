const requestWrappers = require('./requestWrappers');

const refreshTokens = async (refreshToken) => {
  try {
    const response = await requestWrappers.refreshToken({ refreshToken })

    const { data: { data: { attributes } } } = response;
    const { access_token: accessToken, refresh_token: newRefreshToken } = attributes;

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.log('REFRESH_TOKEN_REQUEST_ERROR');
    console.log(error);

    throw error.response.data;
  }
}

module.exports = {
  refreshTokens,
}
