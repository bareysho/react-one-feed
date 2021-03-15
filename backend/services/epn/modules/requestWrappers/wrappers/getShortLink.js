const apiInstance = require('../apiInstances/apiInstance');

const getShortLink = async (domainCutter, link, accessToken) => {
  const links = typeof link === 'string' ? [{ url: link }] : link.map(li => ({ url: li }));

  const params = {
    urlContainer: links,
    domainCutter,
  }

  const options = {
    headers: {
      'content-type': 'application/json',
      'x-access-token': accessToken,
    }
  }

  return apiInstance.post('/link-reduction', params, options);
}

module.exports = getShortLink;
