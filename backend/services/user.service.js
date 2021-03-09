const { User } = require('database/mongoose');

const { ADMIN_ROLE } = require('constants/role');

const userValidationService = require('services/userValidation.service');

const { basicDetails } = require('utils/user');

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
  userValidationService.isValidUserId(id);

  return User.deleteOne({ _id: id });
}

const getUserById = (id) => {
  userValidationService.isValidUserId(id);

  return User.findById(id)
    .then(user => userValidationService.isUserExists(user))
    .then(user => basicDetails(user));
}

const getUserByEmail = (email) => {
  return User.findOne({ email })
    .then(user => userValidationService.isUserExists(user))
    .then(user => basicDetails(user));
}

const updateUserById = (id, updates) => {
  userValidationService.isValidUserId(id);

  return User.findOneAndUpdate({ _id: id }, updates)
    .then(user => userValidationService.isUserExists(user))
    .then(user => basicDetails(user));
}

const getUsersByOneOfFields = (params) => {
  return User.find({$or:Object.entries(params).map(([key, value]) => ({ [key]: value }))})
    .then(users => users.map(user => basicDetails(user)));
}

const removeUsers = (users) => {
  const deletePromises = users.map(user => deleteUserById(user.id));

  return Promise.all(deletePromises);
};

const filterVerifiedUsers = (users) => {
  return users.filter(user => !user.verified);
}

const filterUnverifiedUsers = (users) => {
  return users.filter(user => user.verified);
}

module.exports = {
  updateUserById,
  getUserByEmail,
  getUserById,
  getUsersByOneOfFields,
  filterVerifiedUsers,
  filterUnverifiedUsers,
  createUser,
  removeUsers,
};
