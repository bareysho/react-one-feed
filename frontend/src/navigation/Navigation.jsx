import React, { Suspense } from 'react';
import { Router, Switch } from 'react-router';

import { ROUTES_PATHS } from 'constants/routesPaths';

import { Home } from 'pages/Home/Home';
import { PrivateRoute, PublicRoute } from 'components';
import { Navbar } from 'components/Navbar/Navbar';
import { AuthorizationPage } from 'pages/AuthorizationPage';
import { Settings } from 'pages/Settings/Settings';

import { history } from './history';

export const Navigation = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<div />}>
        <Switch>
          <PublicRoute component={AuthorizationPage} path={ROUTES_PATHS.index} exact />
          <>
            <div className="d-flex page">
              <PrivateRoute
                component={Home}
                path={`${ROUTES_PATHS.application}${ROUTES_PATHS.home}`}
                exact
              />
              <PrivateRoute
                component={Settings}
                path={`${ROUTES_PATHS.application}${ROUTES_PATHS.settings}`}
                exact
              />
              <Navbar />
            </div>
          </>
        </Switch>
      </Suspense>
    </Router>
  );
};
