const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('middlewares/authorize');

const epnUserProfileService = require('services/epn/epnUserProfile.service');

const getUserCreatives = (req, res) => {
  const { id } = req.query;

  return async (err, user) => {
    try {
      const { credentials: { accessToken } } = await epnUserProfileService.getStoredUserCredentials(id, user.id);

      const creatives = await epnUserProfileService.getCreatives(accessToken);

      res.json(creatives);
    } catch (error) {
      console.log('GET_CREATIVES_ERROR');

      res.status(500).json(error);
    }
  }
}

const shortLink = (req, res) => {
  const { epnAccountId, link, creativeCode, domainCutter } = req.body;

  return async (err, user) => {
    try {
      const { credentials: { accessToken } } = await epnUserProfileService.getStoredUserCredentials(epnAccountId, user.id);

      const tillLinks = [link].map(tillLink => `${creativeCode}/?to=${tillLink}`);

      const attributes = await epnUserProfileService.getShortLink(domainCutter, tillLinks, accessToken);

      const [attribute] = attributes;

      res.json(attribute.result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

router.get('/get-user-creatives', authenticateJWT(getUserCreatives));
router.post('/short-link', authenticateJWT(shortLink));

module.exports = router;
