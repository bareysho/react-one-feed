const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('middlewares/authorize');

const epnUserProfileService = require('services/epn/epnUserProfile.service');

const getDomainCutters = (req, res) => {
  const { epnAccountId } = req.query;

  return async (err, user) => {
    try {
      const { credentials: { accessToken } } = await epnUserProfileService.getStoredUserCredentials(epnAccountId, user.id);

      const attributes = await epnUserProfileService.getDomainCutters(accessToken);

      res.json(attributes);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

router.get('/get-domain-cutters', authenticateJWT(getDomainCutters));

module.exports = router;
