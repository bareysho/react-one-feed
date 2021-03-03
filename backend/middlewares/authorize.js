const jwt = require('express-jwt');

const { User, RefreshToken } = require('database/mongoose');
const { isStringType } = require('utils/type');
const { TOKEN_EXPIRED } = require('constants/message');

const { SECRET_KEY } = require('../config');

const authorize = (roles = []) => {
  if (isStringType(roles)) {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret: SECRET_KEY, algorithms: ['HS256'] }),
    (req, res, next) => {
      return User.findById(req.user.id)
        .then(user => {
          const isRoleIncorrect = roles.length && !roles.includes(user.role);

          if (!user || isRoleIncorrect) {
            // user no longer exists or role not authorized
            return res.status(401).json({ message: TOKEN_EXPIRED });
          }

          // authentication and authorization successful
          req.user.role = user.role;

          return RefreshToken.find({ user: user.id })
            .then(refreshTokens => {
              req.user.ownsToken = token => !!refreshTokens.find(refreshToken => refreshToken.token === token);

              next();
            })
        })
    }
  ];
}

module.exports = authorize;
