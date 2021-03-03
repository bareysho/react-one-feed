import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import { NavigationService } from 'navigation';
import { USER_KEY } from 'constants/common';

export const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const { token } = (localStorage.getItem(USER_KEY) && JSON.parse(localStorage.getItem(USER_KEY))) || {};

      if (!token) {
        NavigationService.redirectTo('/');
      }

      return <Component {...props} />;
    }}
  />

);

AdminRoute.propTypes = {
  component: PropTypes.node,
};
