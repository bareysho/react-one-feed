const requestWrappers = require('./requestWrappers');

const getCreatives = async (accessToken) => {
  try {
    const creativeResponse = await requestWrappers.getCreatives({ accessToken });

    const { data: { data } } = creativeResponse;

    return data.map(creative => creative.attributes);
  } catch (error) {
    console.log('GET_CREATIVE_REQUEST_ERROR');
    console.log(error.response.data);

    throw error.response.data;
  }
}

module.exports = {
  getCreatives
}
