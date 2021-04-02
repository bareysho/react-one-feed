const axios = require('axios');

const authInstance = axios.create({
  baseURL: "https://oauth2.epn.bz"
});

module.exports = authInstance;
