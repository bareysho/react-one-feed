const { User } = require('database/mongoose');

const accessTokenService = require('services/accessToken.service');
const refreshTokenService = require('services/refreshToken.service');

const { INVALID_CREDENTIALS_ERROR } = require('constants/error');

const { basicDetails } = require('utils/user');

const authenticate = ({ username, password, ipAddress }) => {
  return User.findOne({ username })
    .then(user => {
      if (!user || !user.validatePassword(password)) {
        throw INVALID_CREDENTIALS_ERROR;
      }

      // authentication successful so generate jwt and refresh tokens
      const jwtToken = accessTokenService.generateJwtToken(user);
      const refreshToken = refreshTokenService.generateRefreshToken(user, ipAddress);

      // save refresh token
      return refreshToken.save()
        .then(() => ({
          ...basicDetails(user),
          token: jwtToken,
          refreshToken: refreshToken.token
        }));
    });
}

module.exports = {
  authenticate
}
