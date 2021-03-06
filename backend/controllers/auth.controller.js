const express = require('express');

const router = express.Router();

const authService = require('services/auth.service');
const refreshTokenService = require('services/refreshToken.service');
const userService = require('services/user.service');
const emailTokenService = require('services/emailToken.service');
const { User } = require('database/mongoose');
const { transporter } = require('config/nodemailer');

const { authenticateJWT } = require('middlewares/authorize');
const { authenticateLocal } = require('middlewares/authorize');

const { TOKEN_REVOKED, TOKEN_EXPIRED, TOKEN_REQUIRED, EMAIL_EXISTS, USERNAME_EXISTS } = require('constants/message');
const { ADMIN_ROLE } = require('constants/role');
const { REFRESH_TOKEN_COOKIE } = require('constants/cookie');

const setTokenCookie = (res, token) => {
  // create http only cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };

  res.cookie(REFRESH_TOKEN_COOKIE, token, cookieOptions);
}

const validateRegistration = ({ username, email }) => {
  const errors = [];
  const users = [];

  return userService.getUserByEmail(email)
    .then(user => {
      if (user && user.verified) errors.push(EMAIL_EXISTS);
      if (user && !user.verified) users.push(user);
    })
    .then(() => userService.getUserByUsername(username))
    .then(user => {
      if (user && user.verified) errors.push(USERNAME_EXISTS);
      if (user && !user.verified) users.push(user);
    })
    .then(() => ({ errors, users }))
    .catch(() => ({ errors, users }));
}

const registration = (req, res, next) => {
  const ipAddress = req.ip;
  const { email, username, password } = req.body;

  return validateRegistration({ username, email})
    .then(({ errors, users }) => {
      if (errors.length) {
        res.status(400).json({ message: errors });
      } else {
        console.log(users);

        if (users.length) {
          const user = users[0];

          const newUser = new User({
            username,
            email,
            role: ADMIN_ROLE,
          })

          newUser.setPassword(password)

          return User.deleteOne({ _id: user.id })
            .then(() => {
              return newUser.save();
            })
            .then(user => {
              console.log(user);
              return emailTokenService.generateEmailToken(user)
                .then(emailToken => {
                  const result = transporter.sendMail({
                    from: '"Node js" <nodejs@example.com>',
                    to: email,
                    subject: 'Message from Node js',
                    html:
                      `Code verification is: ${emailToken.token}`,
                  })

                  return user;
                })
            })
            .then(user => {
              res.json(user);
            })
        } else {
          return userService.createUser({ email, username, password })
            .then(user => {
              console.log(user);
              return emailTokenService.generateEmailToken(user)
              .then(emailToken => {
                const result = transporter.sendMail({
                  from: '"Node js" <nodejs@example.com>',
                  to: email,
                  subject: 'Message from Node js',
                  html:
                    `Code verification is: ${emailToken.token}`,
                })

                return user;
              })
            })
            .then(user => {
              res.json(user);
            })
        }
      }
    })
}

const validateOtp = (req, res) => {
  const ipAddress = req.ip;
  const { otp, username } = req.body;

  return userService.getUserByUsername(username)
    .then(user => {
      return emailTokenService.getEmailTokenByUserId(user._id)
        .then(emailToken => {
            if (emailToken.token === otp) {
                return User.findOneAndUpdate({ username }, { verified: true })
                  .then(user => {
                    return authService.authenticate(user, ipAddress)
                      .then(({ refreshToken, ...user }) => {
                        setTokenCookie(res, refreshToken);
                        res.json(user);
                      })
                      .catch(error => {
                        res.status(401).json({ message: error });
                      });
                  })
            } else {
              res.status(403).json({ message: "INVALID_OTP" })
            }
        })
    })
}


const authenticate = (req, res) => {
  const ipAddress = req.ip;

  return (err, user) => {
    return authService.authenticate(user, ipAddress)
      .then(({ refreshToken, ...user }) => {
        setTokenCookie(res, refreshToken);
        res.json(user);
      })
      .catch(e => {
        res.status(401).json({ message: e });
      });
  }
}

const refreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;

  return (err, user) => {
    return refreshTokenService.refreshToken({ token, ipAddress })
      .then(({ refreshToken, ...user }) => {
        setTokenCookie(res, refreshToken);

        res.json(user);
      })
      .catch(next);
  }
}

const revokeToken = (req, res, next) => {
  // accept token from request body or cookie
  const token = req.body.token || req.cookies.refreshToken;
  const ipAddress = req.ip;

  if (!token) return res.status(400).json({ message: TOKEN_REQUIRED });

  // users can revoke their own tokens and admins can revoke any tokens

  return (err, user) => {
    console.log(user);
    if (!user.ownsToken(token) && user.role !== ADMIN_ROLE) {
      return res.status(401).json({ message: TOKEN_EXPIRED });
    }

    return refreshTokenService.revokeToken({ token, ipAddress })
      .then(() => res.json({ message: TOKEN_REVOKED }))
      .catch(next);
  }
}

const refreshTokens = (req, res, next) => {
  return (err, user) => {
    return refreshTokenService.getRefreshTokens(user.id);
  }
}

router.post('/registration', registration);
router.post('/validate-otp', validateOtp);
router.post('/authenticate', authenticateLocal(authenticate));
router.post('/refresh-token', authenticateJWT(refreshToken));

router.post('/revoke-token', authenticateJWT(revokeToken));
router.get('/:id/refresh-tokens', authenticateJWT(refreshTokens));

module.exports = router;
