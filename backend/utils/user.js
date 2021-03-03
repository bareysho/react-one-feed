const basicDetails = (user) => {
  const { id, firstName, lastName, username, role } = user;
  return { id, firstName, lastName, username, role };
}

module.exports = {
  basicDetails,
}
