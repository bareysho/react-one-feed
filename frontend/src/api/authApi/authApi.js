class AuthApi {
  login = (username, password) => Promise.resolve({ data: {} });
}

export default new AuthApi();
