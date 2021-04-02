const requestWrappers = require('./requestWrappers');

const getShortLink = async (domainCutter, link, accessToken) => {
    try {
      const shortLinkResponse = await requestWrappers.getShortLink(domainCutter, link, accessToken);

      const { data: { data: { attributes } } } = shortLinkResponse;

      return attributes;
    } catch (error) {
      console.log('SHORT_LINK_REQUEST_ERROR');
      console.log(error.response.data);

      throw error.response.data;
    }
}

module.exports = {
  getShortLink,
}
