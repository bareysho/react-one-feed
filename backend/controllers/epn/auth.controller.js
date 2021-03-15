const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('middlewares/authorize');

const epnUserProfileService = require('services/epn/epnUserProfile.service');

const authorize = (req, res) => {
  const { reCaptchaToken, reCaptchaPhrase, clientId, clientSecret } = req.body;

  return async (err, user) => {
    try {
      const ssidToken = await epnUserProfileService.getProfileUserSsid(reCaptchaToken, reCaptchaPhrase);
      const credentials = await epnUserProfileService.getUserProfileCredentials(ssidToken, clientId, clientSecret);

      const { accessToken } = credentials;

      const userBalances = await epnUserProfileService.getUserProfileBalances('USD', accessToken);
      const epnUserProfile = await epnUserProfileService.getProfileUserShort(accessToken);

      await epnUserProfileService.saveUserProfileWithCredentials(user, epnUserProfile, credentials);

      res.json({ ...epnUserProfile, userBalances });
    } catch (error) {
      console.log('EPN_AUTHORIZE_REQUEST_ERROR');
      console.log(error);

      res.status(420).json(error)
    }
  }
}

router.post('/login', authenticateJWT(authorize));

module.exports = router;
