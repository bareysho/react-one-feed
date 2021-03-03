const express = require('express');

const router = express.Router();

const authorize = require('middlewares/authorize');

const authService = require('services/auth.service');
const refreshTokenService = require('services/refreshToken.service');

const { TOKEN_REVOKED, TOKEN_EXPIRED, TOKEN_REQUIRED, INVALID_CREDENTIALS } = require('constants/message');
const { ADMIN_ROLE } = require('constants/role');
const { REFRESH_TOKEN_COOKIE } = require('constants/cookie');

const setTokenCookie = (res, token) => {
  // create http only cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };

  res.cookie(REFRESH_TOKEN_COOKIE, token, cookieOptions);
}

const authenticate = (req, res, next) => {
  const { username, password } = req.body;
  const ipAddress = req.ip;

  return authService.authenticate({ username, password, ipAddress })
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);
      res.json(user);
    })
  .catch(e => {
    res.status(401).json({ message: e });
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

  if (!token) return res.status(400).json({ message: TOKEN_REQUIRED });

  // users can revoke their own tokens and admins can revoke any tokens
  if (!req.user.ownsToken(token) && req.user.role !== ADMIN_ROLE) {
    return res.status(401).json({ message: TOKEN_EXPIRED });
  }

  return refreshTokenService.revokeToken({ token, ipAddress })
    .then(() => res.json({ message: TOKEN_REVOKED }))
    .catch(next);
}

router.post('/authenticate', authenticate);
router.post('/refresh-token', refreshToken);

router.post('/revoke-token', authorize(), revokeToken);
router.get('/:id/refresh-tokens', authorize(), refreshTokenService.getRefreshTokens);

module.exports = router;
