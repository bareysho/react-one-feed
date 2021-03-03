const crypto = require('crypto');

const { User } = require('../database/mongoose');
const { ADMIN_ROLE } = require('../constants/role');

const createTestUser = async () => {
  // create test user if the db is empty
  if ((await User.countDocuments({})) === 0) {
    const salt = crypto.randomBytes(16).toString('hex');

    const user = new User({
      salt,
      username: 'bareysho',
      email: 'bareysho@gmail.com',
      passwordHash: crypto.pbkdf2Sync('553277', salt, 10000, 512, 'sha512').toString('hex'),
      role: ADMIN_ROLE,
    });

    await user.save();
  }
}

module.exports = createTestUser;

