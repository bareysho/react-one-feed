const { isValidId } = require('database/mongoose');

const { USER_NOT_FOUND } = require('constants/message');

const isValidUserId = (id) => {
  if (!isValidId(id)) throw USER_NOT_FOUND;
}

const isUserExists = user => {
  if (!user) throw USER_NOT_FOUND;

  return user;
}

const checkFieldUniqueness = (users, field, value) => {
  return users.map(user => user[field]).includes(value) ? [`${field.toUpperCase()}_EXISTS`] : [];
}

const isCredentialUniqueness = (users, { email, username }) => {
  const verifiedUsers = users.filter(user => user.verified);

  const emailExistsErrors = checkFieldUniqueness(verifiedUsers, 'email', email);
  const usernameExistsErrors = checkFieldUniqueness(verifiedUsers, 'username', username);

  const errors = [ ...usernameExistsErrors, ...emailExistsErrors];

  if (errors.length) {
    throw errors;
  }

  return users;
}

module.exports = {
  isValidUserId,
  isUserExists,
  isCredentialUniqueness,
}
