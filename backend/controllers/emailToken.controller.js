const express = require('express');

const router = express.Router();

const { PASSWORD_RECOVERY, VERIFICATION } =require('constants/emailTokenType')

const { authenticateJWT } = require('middlewares/authorize');

const userService = require('services/user.service');
const emailTokenService = require('services/emailToken.service');
const userValidationService = require('services/userValidation.service');

const authorizedVerifyCode = (req, res) => {
  return authenticateJWT((req, res) => {
    const { type, otp } = req.body;

    return (err, user) => {
      return emailTokenService.validateEmailToken(user.id, otp, type)
        .then(emailToken => { res.send(emailToken.token)})
        .catch((error) => { res.status(403).json({ message: error }); });
    }
  })(req, res);
}

const unauthorizedVerifyCode = (req, res) => {
  const { email, otp, type } = req.body;

  return userService.getUserByEmail(email)
    .then(user => {
      userValidationService.isUserExists(user);

      return emailTokenService.validateEmailToken(user.id, otp, type)
        .then(emailToken => { res.send(emailToken.token)})
    })
    .catch((error) => { res.status(403).json({ message: error }); });
}

const unauthorizedRequestCode = (req, res) => {
  const { email, type } = req.body;

  return userService.getUserByEmail(email)
    .then(user => {
      userValidationService.isUserExists(user);

      return emailTokenService.handleSendEmailToken(user.id, user.email, type)
       .then(() => { res.json({ email, id: user.id })})
    })
    .catch(error => { res.status(403).json({ message: error }) });
}

const authorizedRequestCode = (req, res) => {
  return authenticateJWT((req, res) => {
    const { email, type } = req.body;

    return (err, user) => {
      return emailTokenService.handleSendEmailToken(user.id, email, type)
        .then(() => { res.json({ email, id: user.id })})
        .catch(error => { res.status(403).json({ message: error }) });
    }
  })(req, res);
}

const requestEmailCode = (req, res) => {
  const { type } = req.body;

  if (type === PASSWORD_RECOVERY || type === VERIFICATION) {
    return unauthorizedRequestCode(req, res);
  } else {
    return authorizedRequestCode(req, res);
  }
}

const verifyEmailCode = (req, res) => {
  const { type } = req.body;
  
  if (type === PASSWORD_RECOVERY || type === VERIFICATION) {
    return unauthorizedVerifyCode(req, res);
  } else {
    return authorizedVerifyCode(req, res);
  }
}

router.post('/request-email-code', requestEmailCode);
router.post('/verify-email-code', verifyEmailCode);

module.exports = router;

