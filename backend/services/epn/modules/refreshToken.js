const requestWrappers = require('./requestWrappers');

const refreshToken = async (refreshToken) => {
  try {
    const { data: { date: { attributes } } } = await requestWrappers.refreshToken({ refreshToken })

    const { access_token: accessToken, refresh_token: refreshToken } = attributes;

    return { accessToken, refreshToken };
  } catch (error) {
    console.log('REFRESH_TOKEN_REQUEST_ERROR');
    console.log(error.response.data);

    throw error.response.data;
  }
}

module.exports = {
  refreshToken,
}
