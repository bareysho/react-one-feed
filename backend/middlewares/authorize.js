const passport = require('passport');

const { RefreshToken } = require('database/mongoose');

const { isStringType } = require('utils/type');
const { TOKEN_EXPIRED, INVALID_USER_ROLE } = require('constants/message');

const getOwnsToken = (user) => {
  return RefreshToken.find({ user: user.id })
    .then(refreshTokens => {
      user.ownsToken = token => !!refreshTokens.find(refreshToken => refreshToken.token === token);

      return user;
    })
}

const authenticateJWT = (callback, roles = []) => {
  return (req, res, next) => {
    if (isStringType(roles)) {
      roles = [roles];
    }

    const superCallback = (err, user, message) => {
      const isRoleIncorrect = roles.length && !roles.includes(user.role);

      if (!user) {
        return res.status(401).json({ message: TOKEN_EXPIRED });
      } else if (isRoleIncorrect) {
        return res.status(401).json({ message: INVALID_USER_ROLE });
      } else {
        return getOwnsToken(user)
          .then(user => callback(req, res, next)(err, user, message))
      }
    }

    return passport.authenticate('jwt', {}, superCallback)(req, res, next)
  }
}

const authenticateLocal = (callback) => {
  return (req, res, next) => {
    const superCallback = (err, user, message) => {
      if (!user) {
        return res.status(401).json(message);
      } else {
        return getOwnsToken(user)
          .then(user => callback(req, res, next)(err, user, message))
      }
    }

    return passport.authenticate('local', {}, superCallback)(req, res, next)
  }
}

module.exports = {
  authenticateJWT,
  authenticateLocal,
}
