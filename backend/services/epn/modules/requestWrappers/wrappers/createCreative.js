const apiInstance = require('../apiInstances/apiInstance');

const createCreative = async ({ link, accessToken }) => {
  const params = {
    link: link,
    offerId: 1,
    description: 'Test Deeplink',
    type: 'link'
  }

  console.log(params);

  const options = {
    headers: {
      'content-type': 'application/json',
      'x-access-token': accessToken,
      'accept-language': '*',
    }
  }

  return apiInstance.post('https://app.epn.bz/creative/create', params, options);
}

module.exports = createCreative;
