const crypto = require("crypto");
const cryptoRandomString = require('crypto-random-string');

const randomTokenString = () => {
  return crypto.randomBytes(40).toString('hex');
}

const generateDigitToken = (length) => {
  return cryptoRandomString({ length, type: 'numeric' });
}

module.exports = {
  randomTokenString,
  generateDigitToken
}
