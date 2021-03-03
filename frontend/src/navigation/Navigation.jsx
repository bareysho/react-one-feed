import React from 'react';
import { Route, Router, Switch } from 'react-router';

import { ROUTES_PATHS } from 'constants/routesPaths';
import { AuthorizationPage } from 'pages/AuthorizationPage';

import { UserRoute } from 'components/Routes/UserRoute';
import { NavigationBar } from 'pages/Home/Home';

import { history } from './history';

export const Navigation = () => {
  return (
    <Router history={history}>
      <Switch>
        <UserRoute component={AuthorizationPage} path={ROUTES_PATHS.index} exact />
        <Route path={ROUTES_PATHS.home} component={NavigationBar} />
      </Switch>
    </Router>
  );
};
