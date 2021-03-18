const { EpnUser } = require('database/mongoose');

const { getUserProfileBalances } = require('./modules/getUserProfileBalances');
const { getProfileUserShort } = require('./modules/getUserProfileShort');
const { getProfileUserSsid } = require('./modules/getUserProfileSsid');
const { getUserProfileCredentials } = require('./modules/getUserProfileCredentials');
const { createCreative } = require('./modules/createCreative');
const { getShortLink } = require('./modules/getShortLink');
const { refreshTokens } = require('./modules/refreshToken');
const { getCreatives } = require('./modules/getCreatives');
const { getDomainCutters } = require('./modules/getDomainCutters');

const createUser = (epnUserProfile) => {
  const { user: authenticatedUserId, accountId } = epnUserProfile;

  return EpnUser.findOneAndUpdate(
    { user: authenticatedUserId, accountId },
    epnUserProfile,
    { upsert: true, new: true });

}

const saveUserProfileWithCredentials = (user, epnUserProfile, credentials) => {
  const { id: authenticatedUserId } = user;

  const epnUserProfileToSave = { ...epnUserProfile, user: authenticatedUserId, credentials };

  return createUser(epnUserProfileToSave)
}

const getUserProfileIdsByUser = (userId) => {
  return EpnUser.find({ user: userId })
    .then(users => users.map(user => ({ type: 'EPN', id: user.accountId })));
}

const getStoredUserCredentials = (accountId, userId) => {
  return EpnUser.findOne({ user: userId, accountId });
}

const getUserProfileById = (accountId, userId) => {
  return EpnUser.findOne({ user: userId, accountId });
}

const deleteUserProfile = (accountId, userId) => {
  return EpnUser.deleteOne({ user: userId, accountId });
}

module.exports = {
  createUser,
  saveUserProfileWithCredentials,
  getUserProfileBalances,
  getProfileUserShort,
  getUserProfileCredentials,
  getProfileUserSsid,
  createCreative,
  getStoredUserCredentials,
  getShortLink,
  getUserProfileIdsByUser,
  getUserProfileById,
  refreshTokens,
  getCreatives,
  getDomainCutters,
  deleteUserProfile,
}
