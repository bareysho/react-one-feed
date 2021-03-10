const basicDetails = (user) => {
  if (!user) {
    return undefined;
  }

  const { id, verified, username, email, role } = user;

  return { id, verified, username, email, role };
}

module.exports = {
  basicDetails,
}
