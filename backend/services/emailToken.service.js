const { EmailToken } = require('database/mongoose');

const { generateDigitToken } = require('utils/random');

const generateEmailToken = (user) => {
  // create a refresh token that expires in 10 min
  const emailToken = new EmailToken({
    user: user.id,
    token: generateDigitToken(6),
    expires: new Date(Date.now() + 10 * 60 * 1000),
  });

  return emailToken.save();
}

const getEmailTokenByUserId = (userId) => {
  return EmailToken.findOne({ user: userId })
}

module.exports = {
  generateEmailToken,
  getEmailTokenByUserId
}
