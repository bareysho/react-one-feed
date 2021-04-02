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
      const { credentials: { accessToken, refreshToken } } = epnUser;

      try {
        const userInfo = await epnUserProfileService.getProfileUserShort(accessToken);

        const userBalances = await epnUserProfileService.getUserProfileBalances('USD', accessToken);

        res.send({ ...userInfo, userBalances });
      } catch (error) {
        if (error.errors[0].error === 401002) {
          const credentials = await epnUserProfileService.refreshTokens(refreshToken);

          let { accessToken } = credentials;

          const epnUserProfile = await epnUserProfileService.getProfileUserShort(accessToken);
          const userBalances = await epnUserProfileService.getUserProfileBalances('USD', accessToken);

          await epnUserProfileService.saveUserProfileWithCredentials(user, epnUserProfile, credentials);

          res.json({ ...epnUserProfile, userBalances });
        }
      }
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

const deleteMethodMapper = {
  [YOUTUBE_ACCOUNT]: youTubeUserProfileService.deleteUser,
  [EPN_ACCOUNT]: epnUserProfileService.deleteUserProfile,
}

const deleteLinkedAccount = (req, res) => {
  const { id, type } = req.query;

  return async (err, user) => {
    try {
      const deleteMethod = deleteMethodMapper[type];

      await deleteMethod(id, user.id);

      res.send();
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

router.get('/fetch-linked-account', authenticateJWT(fetchLinkedAccount));
router.get('/get-linked-accounts', authenticateJWT(getLinkedAccounts));
router.delete('/delete-linked-account', authenticateJWT(deleteLinkedAccount));

module.exports = router;
