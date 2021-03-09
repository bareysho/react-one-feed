const apiRouter = require('express').Router();

apiRouter.use('/auth', require('controllers/auth.controller'));
apiRouter.use('/auth', require('controllers/emailTokenCode.controller'));
apiRouter.use('/api/user', require('controllers/user.controller'));

module.exports = apiRouter;
