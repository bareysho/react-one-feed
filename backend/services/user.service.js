const { ADMIN_ROLE } = require('constants/role');
const { User, isValidId } = require('database/mongoose');

const { basicDetails } = require('utils/user');

const { USER_NOT_FOUND_ERROR } = require('constants/error');

const isValidUserId = (id) => {
  if (!isValidId(id)) throw USER_NOT_FOUND_ERROR;
}

const createUser = ({ password, username, email}) => {
  const user = new User({
    username,
    email,
    role: ADMIN_ROLE,
  })

  user.setPassword(password)

  return user.save();
}

const getUser = (id) => {
  isValidUserId(id);

  return User.findById(id)
    .then(user => {
      if (!user) throw USER_NOT_FOUND_ERROR;

      return user;
    })
}

const getUserByEmail = (email) => {
  return User.findOne({ email });
}

const getUserByUsername = (username) => {
  return User.findOne({ username });
}


const getAll = () => {
  return User.find()
    .then(users => users.map(user => basicDetails(user)));
}

const getById = (id) => {
  return getUser(id).then(user => basicDetails(user));
}

module.exports = {
  getAll,
  getById,
  createUser,
  getUserByEmail,
  getUserByUsername,
  isValidUserId,
};
