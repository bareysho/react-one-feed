const jwt = require('jsonwebtoken');

const generateJwtToken = (user) => {
  return jwt.sign({ sub: user.id, id: user.id }, process.env.SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES });
}

module.exports = {
  generateJwtToken,
}
