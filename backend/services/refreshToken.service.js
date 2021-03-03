const { RefreshToken } = require('database/mongoose');

const accessTokenService = require('services/accessToken.service');
const userService = require('services/user.service');

const { INVALID_REFRESH_TOKEN_ERROR } = require('constants/error');

const { randomTokenString } = require('utils/random');
const { basicDetails } = require('utils/user');

const getRefreshToken = (token) => {
  return RefreshToken.findOne({ token }).populate('user')
    .then(refreshToken => {
      if (!refreshToken || !refreshToken.isActive) {
        throw INVALID_REFRESH_TOKEN_ERROR;
      }

      return refreshToken;
    })
}

const getRefreshTokens = (userId) => {
  // check that user exists
  userService.isValidUserId(userId)

  return RefreshToken.find({ user: userId })
}

const generateRefreshToken = (user, ipAddress) => {
  // create a refresh token that expires in 7 days
  return new RefreshToken({
    user: user.id,
    token: randomTokenString(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress
  });
}

const refreshToken = ({ token, ipAddress }) => {
  return getRefreshToken(token)
    .then(refreshToken => {
      const { user } = refreshToken;

      const newRefreshToken = generateRefreshToken(user, ipAddress);

      refreshToken.revoked = Date.now();
      refreshToken.revokedByIp = ipAddress;
      refreshToken.replacedByToken = newRefreshToken.token;

      refreshToken.save();

      const jwtToken = accessTokenService.generateJwtToken(user);

      return newRefreshToken.save()
        .then(savedRefreshToken => ({
          ...basicDetails(user),
          token: jwtToken,
          refreshToken: savedRefreshToken.token
      }))
    });
}

const revokeToken = ({ token, ipAddress }) => {
  return getRefreshToken(token)
    .then(refreshToken => {
      // revoke token and save
      refreshToken.revoked = Date.now();
      refreshToken.revokedByIp = ipAddress;

      return refreshToken.save();
    });
}

module.exports = {
  revokeToken,
  refreshToken,
  getRefreshTokens,
  generateRefreshToken,
}
