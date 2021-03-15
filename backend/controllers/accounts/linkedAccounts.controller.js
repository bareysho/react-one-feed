const express = require('express');
const router = express.Router();

const epnUserProfileService = require('services/epn/epnUserProfile.service');
const youTubeUserProfileService = require('services/youTube/youTubeUser.service');

const { YOUTUBE_ACCOUNT, EPN_ACCOUNT } = require('constants/linkedAccountType');

const { authenticateJWT } = require('middlewares/authorize');

const fetchLinkedAccount = (req, res) => {
  return async (err, user) => {
    if (req.query.type === YOUTUBE_ACCOUNT) {
      const youTubeUser = await youTubeUserProfileService.getUserProfileById(req.query.id, user.id);

      res.send(youTubeUser);
    } else if (req.query.type === EPN_ACCOUNT) {
      const epnUser = await epnUserProfileService.getUserProfileById(req.query.id, user.id);

      const { credentials: { accessToken } } = epnUser;

      const userInfo = await epnUserProfileService.getProfileUserShort(accessToken);
      const userBalances = await epnUserProfileService.getUserProfileBalances('USD', accessToken);

      res.send({ ...userInfo, userBalances });
    } else {
      res.send();
    }
  }
}

const getLinkedAccounts = (req, res) => {
  return async (err, user) => {
    const epnUserIds = await epnUserProfileService.getUserProfileIdsByUser(user.id);
    const youTubeUserIds = await youTubeUserProfileService.getUserProfileIdsByUser(user.id);

    res.send([...epnUserIds, ...youTubeUserIds]);
  }
}

router.get('/fetch-linked-account', authenticateJWT(fetchLinkedAccount));
router.get('/get-linked-accounts', authenticateJWT(getLinkedAccounts));

module.exports = router;
