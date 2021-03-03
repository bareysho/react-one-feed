const { User, isValidId } = require('database/mongoose');

const { basicDetails } = require('utils/user');

const { USER_NOT_FOUND_ERROR } = require('constants/error');

const isValidUserId = (id) => {
  if (!isValidId(id)) throw USER_NOT_FOUND_ERROR;
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

const getById = (id) => {
  return getUser(id).then(user => basicDetails(user));
}

module.exports = {
  getAll,
  getById,
  isValidUserId,
};
