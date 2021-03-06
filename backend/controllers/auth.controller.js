const express = require('express');

const router = express.Router();

const authService = require('services/auth.service');
const refreshTokenService = require('services/refreshToken.service');
const userService = require('services/user.service');
const emailTokenService = require('services/emailToken.service');

const { transporter } = require('config/nodemailer');

const { authenticateJWT } = require('middlewares/authorize');
const { authenticateLocal } = require('middlewares/authorize');

const { TOKEN_REVOKED, TOKEN_EXPIRED, TOKEN_REQUIRED, INVALID_OTP, EXPIRED_OTP } = require('constants/message');
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

const authenticateEndpiont = (req, res) => (err, user) => {
  const ipAddress = req.ip;

  return authService.authenticate(user, ipAddress)
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);
      res.json(user);
    })
    .catch(error => {
      res.status(401).json({ message: error });
    });
}

const sendEmailToken = (user) => {
  return emailTokenService.generateEmailToken(user)
    .then(emailToken => {
      transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: user.email,
        subject: 'Message from Node js',
        html:
          `Code verification is: ${emailToken.token}`,
      })

      return user;
    })
}

const checkFieldUniqueness = (users, field, value) => {
  return users.map(user => user[field]).includes(value) ? [`${field.toUpperCase()}_EXISTS`] : [];
}

const removeUnverifiedUsers = (users) => {
  const deletePromises = users
    .filter(user => !user.verified)
    .map(user => userService.deleteUserById(user.id));

  return Promise.all(deletePromises);
};


const validateRegistrationCredentials = ({ email, username }) => (users) => {
  const verifiedUsers = users.filter(user => user.verified);

  const emailExistsErrors = checkFieldUniqueness(verifiedUsers, 'email', email);
  const usernameExistsErrors = checkFieldUniqueness(verifiedUsers, 'username', username);

  const errors = [ ...usernameExistsErrors, ...emailExistsErrors];

  if (errors.length) {
    throw errors;
  }

  return users;
}

const validateOtp = (otp) => (emailToken) => {
  if (!emailToken || emailToken.token !== otp) {
    throw INVALID_OTP;
  }

  if (emailToken.isExpired) {
    throw EXPIRED_OTP;
  }
}

const registrationEndpiont = (req, res) => {
  const { email, username, password } = req.body;

  return userService.getUsersByFields({ username, email})
    .then(validateRegistrationCredentials({ username, email }))
    .then(removeUnverifiedUsers)
    .then(() => userService.createUser({ email, username, password }).save())
    .then(sendEmailToken)
    .then(user => { res.json(user); })
    .catch(error => {
      res.status(400).json({ message: error });
    })
}

const validateOtpEndpiont = (req, res) => {
  const { otp, id } = req.body;

  return emailTokenService.getEmailTokenByUserId(id)
    .then(validateOtp(otp))
    .then(() => userService.updateUserById(id, { verified: true }))
    .then(user => authenticateEndpiont(req, res)(null, user))
    .catch(error => { res.status(403).json({ message: error }) });
}


const refreshTokenEndpiont = (req, res, next) => {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;

  return refreshTokenService.refreshToken({ token, ipAddress })
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);
      res.json(user);
    })
    .catch(next);
}

const revokeTokenEndpiont = (req, res, next) => {
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

const refreshTokensEndpiont = (req, res, next) => {
  return (err, user) => {
    return refreshTokenService.getRefreshTokens(user.id);
  }
}

router.post('/registration', registrationEndpiont);
router.post('/validate-otp', validateOtpEndpiont);
router.post('/refresh-token', refreshTokenEndpiont);

router.post('/authenticate', authenticateLocal(authenticateEndpiont));
router.post('/revoke-token', authenticateJWT(revokeTokenEndpiont));
router.get('/:id/refresh-tokens', authenticateJWT(refreshTokensEndpiont));

module.exports = router;
