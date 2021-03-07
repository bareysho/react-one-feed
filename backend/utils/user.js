const basicDetails = (user) => {
  const { id, verified, username, email, role } = user;
  return { id, verified, username, email, role };
}

module.exports = {
  basicDetails,
}
