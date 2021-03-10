const crypto = require("crypto");
const cryptoRandomString = require('crypto-random-string');

const generatePasswordData = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

  return { salt, passwordHash };
}

const randomTokenString = () => {
  return crypto.randomBytes(40).toString('hex');
}

const generateDigitToken = (length) => {
  return cryptoRandomString({ length, type: 'numeric' });
}

module.exports = {
  randomTokenString,
  generateDigitToken,
  generatePasswordData,
}
