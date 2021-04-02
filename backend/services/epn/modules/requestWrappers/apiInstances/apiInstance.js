const axios = require('axios');

const apiInstance = axios.create({
  baseURL: "https://app.epn.bz"
});

module.exports = apiInstance;
