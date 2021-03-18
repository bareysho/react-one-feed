const { YouTubeUser } = require('database/mongoose');

const createUser = (user) => {
  const { user: authenticatedUserId, accountId } = user;

  return YouTubeUser.findOneAndUpdate(
    { user: authenticatedUserId, accountId },
    user,
    { upsert: true, new: true })
}

const saveCredentials = (user, youTubeProfile, credentials) => {
  const { id: authenticatedUserId } = user;

  const youTubeUser = { ...youTubeProfile, user: authenticatedUserId, credentials };

  return createUser(youTubeUser);
}

const getUserProfileIdsByUser = (userId) => {
  return YouTubeUser.find({ user: userId })
      .then(users => users.map(user => ({ type: 'YOUTUBE', id: user.accountId })));
}

const getUserProfileById = (accountId, userId) => {
  return YouTubeUser.findOne({ user: userId, accountId });
}

module.exports = {
  createUser,
  saveCredentials,
  getUserProfileIdsByUser,
  getUserProfileById,
}
