import React from 'react';
import { Route, Router, Switch } from 'react-router';

import { ROUTES_PATHS } from '../constants/routesPaths';
import { AuthorizationPage } from '../pages/AuthorizationPage';

import { history } from './history';

export const Navigation = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route component={AuthorizationPage} route={ROUTES_PATHS.index} exact />
      </Switch>
    </Router>
  );
};
