const apiInstance = require('../apiInstances/apiInstance');

const getCreatives = async ({ accessToken }) => {
  const params = {
    offerIds: '1',
    name: 'Test Deeplink',
    type: 'deeplink',
    fields: 'hash,description,type,link,code',
    isDeleted: false,
    limit: 5,
  }

  const options = {
    params,
    headers: {
      'content-type': 'application/json',
      'x-access-token': accessToken,
    }
  }

  return apiInstance.get('/creatives', options);
}

module.exports = getCreatives;
