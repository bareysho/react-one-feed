const apiInstance = require('../apiInstances/apiInstance');

const getDomainCutters = async ({ accessToken }) => {
  const options = {
    headers: {
      'content-type': 'application/json',
      'x-access-token': accessToken,
    }
  }

  return apiInstance.get('/link-reduction/domain-cutter-list', options);
}

module.exports = getDomainCutters;
