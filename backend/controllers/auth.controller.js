const express = require('express');

const router = express.Router();

const refreshTokenService = require('services/refreshToken.service');
const userService = require('services/user.service');
const userValidationService = require('services/userValidation.service');
const emailTokenService = require('services/emailToken.service');

const { authenticateJWT } = require('middlewares/authorize');
const { authenticateLocal } = require('middlewares/authorize');

const { VERIFICATION } = require('constants/emailTokenType');
const { TOKEN_REVOKED, TOKEN_EXPIRED, TOKEN_REQUIRED } = require('constants/message');
const { ADMIN_ROLE } = require('constants/role');

const { setTokenCookie, authenticate } = require('./authenticateCommon');

const registration = (req, res) => {
  const { email, username, password } = req.body;

  return userService.getUsersByOneOfFields({ username, email })
    .then(users => userValidationService.isCredentialUniqueness(users, { username, email }))
    .then(users => userService.filterVerifiedUsers(users))
    .then(unverifiedUsers => {
      return emailTokenService.removeUsersEmailTokens(unverifiedUsers, VERIFICATION)
        .then(() => userService.removeUsers(unverifiedUsers));
    })
    .then(() => userService.createUser({ email, username, password }).save())
    .then(user => emailTokenService.handleSendEmailToken(user, VERIFICATION).then(() => user))
    .then(user => { res.json(user); })
    .catch(error => {
      res.status(400).json({ message: error });
    });
}

const refreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;

  return refreshTokenService.refreshToken({ token, ipAddress })
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);
      res.json(user);
    })
    .catch(next);
}

const revokeToken = (req, res, next) => {
  // accept token from request body or cookie
  const token = req.body.token || req.cookies.refreshToken;
  const ipAddress = req.ip;

  if (!token) return () => { res.status(400).json({ message: TOKEN_REQUIRED }) };

  // users can revoke their own tokens and admins can revoke any tokens
  return (err, user) => {
    if (!user.ownsToken(token) && user.role !== ADMIN_ROLE) {
      return res.status(401).json({ message: TOKEN_EXPIRED });
    }

    return refreshTokenService.revokeToken({ token, ipAddress })
      .then(() => res.json({ message: TOKEN_REVOKED }))
      .catch(next);
  }
}

router.post('/registration', registration);

router.post('/authenticate', authenticateLocal(authenticate));
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', authenticateJWT(revokeToken));

module.exports = router;
