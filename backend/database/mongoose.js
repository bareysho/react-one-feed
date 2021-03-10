const mongoose = require('mongoose');

const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(process.env.MONGO_URI, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
  User: require('../models/user.model'),
  RefreshToken: require('../models/refreshToken.model'),
  EmailToken: require('../models/emailToken.model'),
  isValidId: (id) => mongoose.Types.ObjectId.isValid(id),
};
