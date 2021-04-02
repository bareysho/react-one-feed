const requestWrappers = require('./requestWrappers');

const getDomainCutters = async (accessToken) => {
  try {
    const creativeResponse = await requestWrappers.getDomainCutters({ accessToken });

    const { data: { data: { attributes } } } = creativeResponse;

    return attributes;
  } catch (error) {
    console.log('GET_CREATIVE_REQUEST_ERROR');
    console.log(error.response.data);

    throw error.response.data;
  }
}

module.exports = {
  getDomainCutters
}
