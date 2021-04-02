const requestWrappers = require('./requestWrappers');

const getUserProfileBalances = async (currency, accessToken) => {
  try {
    const balanceResponse = await requestWrappers.getUserProfileBalances(currency)({ accessToken });

    const { data: { data: balances } } = balanceResponse;

    return balances.map(balance => ({
      currency: balance.id,
      ...balance.attributes
    }));
  } catch (error) {
    console.log('GET_USER_BALANCES_REQUEST_ERROR');
    console.log(error.response.data);

    throw error.response.data;
  }
}

module.exports = {
  getUserProfileBalances
}
