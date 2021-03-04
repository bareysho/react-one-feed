const express = require('express');

const passport = require('passport');

const router = express.Router();

const authorize = require('middlewares/authorize');

const authService = require('services/auth.service');
const refreshTokenService = require('services/refreshToken.service');
const accessTokenService = require('services/accessToken.service');
const { authenticateJWT } = require('middlewares/authorize');
const { authenticateLocal } = require('middlewares/authorize');
const { basicDetails } = require('utils/user');

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


const authenticate = (req, res) => {
  const ipAddress = req.ip;

  return (err, user) => {
    return authService.authenticate(user, ipAddress)
      .then(({ refreshToken, ...user }) => {
        setTokenCookie(res, refreshToken);
        res.json(user);
      })
      .catch(e => {
        res.status(401).json({ message: e });
      });
  }
}

const refreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;

  return (err, user) => {
    return refreshTokenService.refreshToken({ token, ipAddress })
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);

      res.json(user);
    })
    .catch(next);
  }
}

const revokeToken = (req, res, next) => {
  // accept token from request body or cookie
  const token = req.body.token || req.cookies.refreshToken;
  const ipAddress = req.ip;

  if (!token) return res.status(400).json({ message: TOKEN_REQUIRED });

  // users can revoke their own tokens and admins can revoke any tokens

  return (err, user) => {
    console.log(user);
    if (!user.ownsToken(token) && user.role !== ADMIN_ROLE) {
      return res.status(401).json({ message: TOKEN_EXPIRED });
    }

    return refreshTokenService.revokeToken({ token, ipAddress })
      .then(() => res.json({ message: TOKEN_REVOKED }))
      .catch(next);
  }
}

const refreshTokens = (req, res, next) => {
  return (err, user) => {
    return refreshTokenService.getRefreshTokens(user.id);
  }
}

router.post('/authenticate', authenticateLocal(authenticate));
router.post('/refresh-token', authenticateJWT(refreshToken));

router.post('/revoke-token', authenticateJWT(revokeToken));
router.get('/:id/refresh-tokens', authenticateJWT(refreshTokens));

module.exports = router;
