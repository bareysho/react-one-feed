import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import { USER_KEY } from 'constants/common';
import { NavigationService } from 'navigation';

// Guest Route untuk user yang blum login ketika ingin mengunjungi halaman admin makan akan redirect ke halaman login
export const UserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const { token } = (localStorage.getItem(USER_KEY) && JSON.parse(localStorage.getItem(USER_KEY))) || {};

      if (token) {
        NavigationService.redirectTo('/home');
      }

      return <Component {...props} />;
    }}
  />

);

UserRoute.propTypes = {
  component: PropTypes.func,
};
