const express = require('express');

const router = express.Router();

const { authenticateJWT } = require('middlewares/authorize');

const userService = require('services/user.service');
const emailTokenService = require('services/emailToken.service');

const { CHANGE_EMAIL, PASSWORD_RECOVERY, VERIFICATION } = require('constants/emailTokenType');

const { authenticate } = require('controllers/authenticateCommon');
const { generatePasswordData } = require('utils/random');

const changeEmail = (req, res) => {
  const { otp, email } = req.body;

  return (err, user) => {
    return emailTokenService.validateEmailToken(user.id, otp, CHANGE_EMAIL)
      .then(() => userService.updateUserById(user.id, { email }))
      .then(() => { res.send(email); })
      .catch(error => { res.status(403).json(error); });
  }
}

const recoveryPassword = (req, res) => {
  const { otp, email, password } = req.body;

  return userService.getUserByEmail(email)
    .then(user => {
      const updatedCredentials = generatePasswordData(password);

      return emailTokenService.validateEmailToken(user.id, otp, PASSWORD_RECOVERY)
        .then(() => userService.updateUserById(user.id, updatedCredentials))
        .then(user => { res.json(user)})
    })
   .catch(error => { res.status(403).json({ message: error }) });
}

const changePassword = (req, res) => {
  const { currentPassword, password } = req.body;

  return async (err, user) => {
    if (!user.validatePassword(currentPassword)) {
      return res.status(403).json({ message: 'INVALID_CURRENT_PASSWORD' })
    }

    const passwordData = generatePasswordData(password);

    return userService.updateUserById(user.id, passwordData)
      .then(() => { res.status(200).send(); })
      .catch(error => { res.status(403).json(error); });
  }
}

const verifyEmail = (req, res) => {
  const { otp, email } = req.body;

  return userService.getUserByEmail(email)
    .then(user => {
      return emailTokenService.validateEmailToken(user.id, otp, VERIFICATION)
        .then(() => userService.updateUserById(user.id, { verified: true }))
        .then(user => authenticate(req, res)(null, user))
    })
    .catch(error => { res.status(403).json({ message: error }) });
}

router.patch('/verify-email', verifyEmail);
router.patch('/change-email', authenticateJWT(changeEmail));
router.patch('/change-password', authenticateJWT(changePassword));
router.patch('/recovery-password', recoveryPassword);

module.exports = router;

