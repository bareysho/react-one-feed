const express = require('express');
const router = express.Router();

const { google } = require('googleapis');

const { authenticateJWT } = require('middlewares/authorize');

const youTubeUserService = require('services/youTube/youTubeUser.service');
const youTubeProfileService = require('services/youTube/youTubeProfile.service');

const OAuth2 = google.auth.OAuth2;

const SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/plus.login'
];

const getOAuth2Client = (hostname) => {
  const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `https://${hostname}`;

  const clientId = process.env.YOU_TUBE_CLIENT_ID;
  const clientSecret = process.env.YOU_TUBE_CLIENT_SECRET;
  const redirectUrl = `${host}/auth/google/callback`;

  return new OAuth2(clientId, clientSecret, redirectUrl);
}

const googleAuth = (req, res) => {
    return () => {
      const authUrl = getOAuth2Client(req.hostname).generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      });

      res.send(authUrl);
    }
}

const googleAuthCallback = (req, res) => {
  const { code } = req.body;

  return (err, user) => {
    const oauth2Client = getOAuth2Client(req.hostname);

    return oauth2Client.getToken(code, (error, credentials) => {
      oauth2Client.setCredentials(credentials);

      const { access_token } = credentials;

      return youTubeProfileService.getChannelProfile(access_token)
        .then(youTubeProfile => youTubeUserService.saveCredentials(user, youTubeProfile, credentials))
        .then(() => res.status(200).send());
    })
  }
};

router.get('/google', authenticateJWT(googleAuth));
router.post( '/google/callback', authenticateJWT(googleAuthCallback));

module.exports = router;

