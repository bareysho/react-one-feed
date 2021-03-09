const { EmailToken } = require('database/mongoose');

const emailNotificationService = require('services/emailNotification.service');

const { emailTokenTypesMapper } = require('mappers/emailTokenTypeMapper');

const { INVALID_OTP, EXPIRED_OTP } = require('constants/message');

const { generateDigitToken } = require('utils/random');

const removeEmailTokens = (user, type) => {
  return EmailToken.deleteMany({ user: user.id, type: emailTokenTypesMapper[type] });
}

const removeEmailTokenById = (tokenId) => {
  return EmailToken.deleteOne({ _id: tokenId });
}

const generateEmailToken = (user, type) => {
  // create a refresh token that expires in 10 min
  const emailToken = new EmailToken({
    user: user.id,
    type: emailTokenTypesMapper[type],
    token: generateDigitToken(6),
    expires: new Date(Date.now() + 10 * 60 * 1000),
  });

  return emailToken.save();
}

const validateEmailCode = (emailToken) => {
  if (!emailToken) {
    throw INVALID_OTP;
  }

  if (emailToken.isExpired) {
    throw EXPIRED_OTP;
  }

  return emailToken;
}

const removeUsersEmailTokens = (users, type) => {
  return Promise.all(users.map(user => removeEmailTokens(user, type)));
}

const getEmailTokenByFields = (params) => {
  return EmailToken.findOne(params)
}

const handleSendEmailToken = (user, type) => {
  return removeEmailTokens(user, type)
    .then(() => generateEmailToken(user, type))
    .then(emailToken => emailNotificationService.sendEmailToken(user, emailToken));
}

const validateEmailToken = (userId, otp, type) => {
  return getEmailTokenByFields({ user: userId, token: otp, type: emailTokenTypesMapper[type] })
    .then(emailToken => validateEmailCode(emailToken))
    .then(emailToken => removeEmailTokenById(emailToken.id))
}

module.exports = {
  removeUsersEmailTokens,
  handleSendEmailToken,
  validateEmailToken,
}
