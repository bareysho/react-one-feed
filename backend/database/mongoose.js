const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(MONGO_URI, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
  User: require('../models/user.model'),
  RefreshToken: require('../models/refreshToken.model'),
  isValidId: (id) => mongoose.Types.ObjectId.isValid(id),
};
