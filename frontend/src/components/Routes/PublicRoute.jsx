import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import { NavigationService } from 'navigation';
import { getLocalStorageUser } from 'utils/localStorage';

export const PublicRoute = ({ component: Component = [], ...rest }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const { token } = getLocalStorageUser();

    if (token) {
      NavigationService.navigateToHome();
    }

    setInitialized(true);
  }, [rest]);

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

PublicRoute.propTypes = {
  component: PropTypes.func,
};
