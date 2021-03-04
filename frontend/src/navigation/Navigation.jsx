import React from 'react';
import { Router, Switch } from 'react-router';

import { ROUTES_PATHS } from 'constants/routesPaths';
import { AuthorizationPage } from 'pages/AuthorizationPage';

import { NavigationBar } from 'pages/Home/Home';
import { PublicRoute } from 'components/Routes/PublicRoute';
import { PrivateRoute } from 'components/Routes/PrivateRoute';

import { history } from './history';

export const Navigation = () => {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute component={AuthorizationPage} path={ROUTES_PATHS.index} exact />
        <PrivateRoute component={NavigationBar} roles={['ADMIN']} path={ROUTES_PATHS.home} />
      </Switch>
    </Router>
  );
};
