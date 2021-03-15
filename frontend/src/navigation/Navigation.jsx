import React from 'react';
import { Router, Switch } from 'react-router';

import { ROUTES_PATHS } from 'constants/routesPaths';
import { AuthorizationPage } from 'pages/AuthorizationPage';
import { AuthGoogle } from 'pages/AuthGoogle/AuthGoogle';

import { NavigationBar } from 'pages/Home/Home';
import { PrivateRoute, PublicRoute } from 'components';

import { history } from './history';

export const Navigation = () => {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute component={AuthorizationPage} path={ROUTES_PATHS.index} exact />
        <PrivateRoute
          component={NavigationBar}
          path={`${ROUTES_PATHS.application}${ROUTES_PATHS.home}`}
        />
        <PrivateRoute
          component={AuthGoogle}
          path={`${ROUTES_PATHS.auth}${ROUTES_PATHS.google}${ROUTES_PATHS.callback}`}
        />
      </Switch>
    </Router>
  );
};
