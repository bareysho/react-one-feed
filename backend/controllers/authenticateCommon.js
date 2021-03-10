const { REFRESH_TOKEN_COOKIE } = require('constants/cookie');

const authService = require('services/auth.service');

const setTokenCookie = (res, token) => {
  // create http only cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };

  res.cookie(REFRESH_TOKEN_COOKIE, token, cookieOptions);
}

const authenticate = (req, res) => (err, user) => {
  const ipAddress = req.ip;

  return authService.authenticate(user, ipAddress)
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);
      res.json(user);
    })
    .catch(error => {
      res.status(401).json({ message: error });
    });
}

module.exports = {
  authenticate,
  setTokenCookie,
}
