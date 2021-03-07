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

  return user;
}

const deleteUserById = (id) => {
  return User.deleteOne({ _id: id });
}

const getUser = (id) => {
  isValidUserId(id);

  return User.findById(id)
    .then(user => {
      if (!user) throw USER_NOT_FOUND_ERROR;

      return user;
    })
}

const getAll = () => {
  return User.find()
    .then(users => users.map(user => basicDetails(user)));
}

const getUserByEmail = (email) => {
  return User.findOne({ email }).then(user => basicDetails(user));
}

const getUserByUsername = (username) => {
  return User.findOne({ username }).then(user => basicDetails(user));
}

const updateUserById = (id, updates) => {
  isValidUserId(id);

  return User.findOneAndUpdate({ _id: id }, updates).then(user => basicDetails(user));
}


const getById = (id) => {
  return getUser(id).then(user => basicDetails(user));
}
const getUsersByFields = (params) => {
  return User.find({$or:Object.entries(params).map(([key, value]) => ({ [key]: value }))})
    .then(users => users.map(user => basicDetails(user)));
}


module.exports = {
  deleteUserById,
  getUsersByFields,
  updateUserById,
  getAll,
  getById,
  createUser,
  getUserByEmail,
  getUserByUsername,
  isValidUserId,
};
