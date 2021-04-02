const express = require('express');
const router = express.Router();

const tall = require('tall').default;

const epnUserProfileService = require('services/epn/epnUserProfile.service');

const { ALIEXPRESS_LINK_REGEXP } = require('constants/regexp');

const { authenticateJWT } = require('middlewares/authorize');

const parseDescriptionLinks = (req, res) => {
  const { epnAccountId, links, creativeCode, domainCutter } = req.body;

  const linksArray = typeof links === 'string' ? [links] : links;

  return async (err, user) => {
    const { credentials: { accessToken } } = await epnUserProfileService.getStoredUserCredentials(epnAccountId, user.id);

    try {
      const tallLinks = await Promise.all(linksArray.map(link => tall(`${link}`)));

      const shortLinksMapper = tallLinks.reduce((accum, item, index) => {
        if (item.match(ALIEXPRESS_LINK_REGEXP)) {
           const link = `${creativeCode}/?to=${item}`;

           return { ...accum, aliexpressLinks: { ...accum.aliexpressLinks, [linksArray[index]]: link } }

         } else {
           return { ...accum, otherLinks: { ...accum.otherLinks, [linksArray[index]]: linksArray[index] } };
         }
      }, { aliexpressLinks: {}, otherLinks: {} });

      const otherShortLinksMapper = shortLinksMapper.otherLinks;
      const aliexpressShortLinksMapper = shortLinksMapper.aliexpressLinks;

      const aliexpressTallLinks = Object.values(aliexpressShortLinksMapper);

      const shortenAliexpress = await epnUserProfileService.getShortLink(domainCutter, aliexpressTallLinks, accessToken);

      const shortenShortLinksMapper = Object.keys(aliexpressShortLinksMapper)
        .reduce((accum, key, index) => ({ ...accum, [key]: shortenAliexpress[index].result }), {});

      res.json({ ...shortenShortLinksMapper, ...otherShortLinksMapper });
    } catch (error) {
      res.sendStatus(error);
    }
  }
}

router.post('/parse-description-links', authenticateJWT(parseDescriptionLinks));

module.exports = router;
