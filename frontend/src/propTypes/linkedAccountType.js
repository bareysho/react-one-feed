import PropTypes from 'prop-types';

export const linkedAccountType = PropTypes.shape({
  isLoading: PropTypes.bool,
  email: PropTypes.string,
  userBalances: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
    balance: PropTypes.shape({
      availableAmount: PropTypes.string,
      holdAmount: PropTypes.string,
    }),
  })),
});
