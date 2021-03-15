const requestWrappers = require('./requestWrappers');

const getProfileUserShort = async (accessToken) => {
  try {
    const userProfileShortResponse = await requestWrappers.getUserProfileShort({ accessToken });

    const { data: { data: { attributes } } } = userProfileShortResponse;

    const { id: accountId, userName: username, email } = attributes;

    return { accountId, username, email }
  } catch (error) {
    console.log('GET_USER_PROFILE_SHORT_REQUEST_ERROR');
    console.log(error.response.data);

    throw error.response.data;
  }
}

module.exports = {
  getProfileUserShort
}
