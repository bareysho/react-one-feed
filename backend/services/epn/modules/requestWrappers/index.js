const getSsid = require('./wrappers/getSsid');
const userProfileAuth = require('./wrappers/userProfileAuth');
const getUserProfileShort = require('./wrappers/getUserProfileShort');
const getUserProfileBalances = require('./wrappers/getUserBalances');
const createCreative = require('./wrappers/createCreative');
const getShortLink = require('./wrappers/getShortLink');
const refreshToken = require('./wrappers/refreshToken');

module.exports = {
  getSsid,
  userProfileAuth,
  getUserProfileShort,
  getUserProfileBalances,
  createCreative,
  getShortLink,
  refreshToken,
}
