import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import { NavigationService } from 'navigation';
import { getLocalStorageUser } from 'utils/localStorage';

export const PrivateRoute = ({ component: Component, roles = [], ...rest }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const { token, role } = getLocalStorageUser();

    const isRolesValid = !roles.length || roles.includes(role);

    if (!isRolesValid) {
      if (!token) {
        NavigationService.navigateToIndex();
      } else {
        NavigationService.navigateToHome();
      }
    }

    setInitialized(true);
  }, [roles]);

  return (
    <>
      {initialized ? (
        <Route
          {...rest}
          component={Component}
        />
      ) : null}
    </>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.shape({ pathname: PropTypes.string }),
};
