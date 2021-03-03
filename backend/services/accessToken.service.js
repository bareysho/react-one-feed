const jwt = require('jsonwebtoken');
const { SECRET_KEY, ACCESS_TOKEN_EXPIRES } = require('config');

const generateJwtToken = (user) => {
  return jwt.sign({ sub: user.id, id: user.id }, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRES });
}

module.exports = {
  generateJwtToken,
}
