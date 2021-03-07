const accessTokenService = require('services/accessToken.service');
const refreshTokenService = require('services/refreshToken.service');

const { basicDetails } = require('utils/user');

const authenticate = (user, ipAddress) => {
  const jwtToken = accessTokenService.generateJwtToken(user);
  const refreshToken = refreshTokenService.generateRefreshToken(user, ipAddress);

  // Save refresh token
  return refreshToken.save()
    .then(() => ({
      ...basicDetails(user),
      token: jwtToken,
      refreshToken: refreshToken.token
    }))
}

module.exports = {
  authenticate
}
