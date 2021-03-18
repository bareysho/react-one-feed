const apiRouter = require('express').Router();

apiRouter.use('/auth', require('controllers/auth.controller'));

apiRouter.use('/email-code', require('controllers/emailToken.controller'));

apiRouter.use('/api/user', require('controllers/user.controller'));
apiRouter.use('/api/user', require('controllers/userSettings.controller'));

apiRouter.use('/api/auth', require('controllers/youTube/auth.controller'));

apiRouter.use('/api/epn/', require('controllers/epn/auth.controller'));
apiRouter.use('/api/epn/', require('controllers/epn/shortLink.conroller'));

apiRouter.use('/api/accounts/', require('controllers/accounts/linkedAccounts.controller'));

module.exports = apiRouter;
