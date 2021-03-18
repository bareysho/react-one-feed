const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('middlewares/authorize');

const epnUserProfileService = require('services/epn/epnUserProfile.service');

const shortLinkControl = (req, res) => {
  const { id, link, domainCutter } = req.body;

  return async (err, user) => {
    try {
      const { credentials: { accessToken } } = await epnUserProfileService.getStoredUserCredentials(id, user.id);
      const deeplink = await epnUserProfileService.createCreative(link, accessToken);
      const attributes = await epnUserProfileService.getShortLink(domainCutter, deeplink, accessToken);

      const { result } = attributes[0];

      res.json(result);
    } catch (error) {
      res.sendStatus(error);
    }
  }
}

router.post('/short-link', authenticateJWT(shortLinkControl));

module.exports = router;
