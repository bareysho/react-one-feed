const requestWrappers = require('./requestWrappers');

const createCreative = async (link, accessToken) => {
  try {
    const creativeResponse = await requestWrappers.createCreative({ link, accessToken });

    const { data: { data: { attributes: { code } } } } = creativeResponse;

    return code;
  } catch (error) {
    console.log('CREATE_CREATIVE_REQUEST_ERROR');
    console.log(error.response.data);

    throw error.response.data;
  }
}

module.exports = {
  createCreative
}
