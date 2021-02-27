import React from 'react';
import { Route, Router, Switch } from 'react-router';

import { history } from './history';

export const Navigation = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route/>
      </Switch>
    </Router>
  )
}