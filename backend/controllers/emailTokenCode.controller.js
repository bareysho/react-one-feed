const express = require('express');

const router = express.Router();

const userService = require('services/user.service');
const emailTokenService = require('services/emailToken.service');
const userValidationService = require('services/userValidation.service');

const { generatePasswordData } = require('utils/random');

const { PASSWORD_RECOVERY, VERIFICATION } = require('constants/emailTokenType');

const { authenticate } = require('./authenticateCommon');

const verifyEmailVerificationCode = (req, res) => {
  const { otp, id } = req.body;

  return emailTokenService.validateEmailToken(id, otp, VERIFICATION)
    .then(() => userService.updateUserById(id, { verified: true }))
    .then(user => authenticate(req, res)(null, user))
    .catch(error => { res.status(403).json({ message: error }) });
}

const verifyRecoveryPasswordCode = (req, res) => {
  const { otp, id, password } = req.body;

  return emailTokenService.validateEmailToken(id, otp, PASSWORD_RECOVERY)
    .then(() => userService.updateUserById(id, generatePasswordData(password)))
    .then(user => { res.json(user)})
    .catch(error => { res.status(403).json({ message: error }) });
}

const requestEmailCode = (req, res) => {
  const { email, type } = req.body;

  return userService.getUserByEmail(email)
    .then(user => userValidationService.isUserExists(user))
    .then(user => {
      return emailTokenService.handleSendEmailToken(user, type)
        .then(() => { res.json({ email, id: user.id })})
    })
    .catch(error => { res.status(403).json({ message: error }) });
}

router.post('/request-email-code', requestEmailCode);
router.post('/verify-email-verification-code', verifyEmailVerificationCode);
router.post('/verify-recovery-password-code', verifyRecoveryPasswordCode);

module.exports = router;

