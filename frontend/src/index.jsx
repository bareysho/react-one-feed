import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from 'App';
import { store } from 'store';
import { USER_KEY } from 'constants/common';
import { recallUser } from 'actions/auth';

import 'resources/i18n';

import 'styles/global.scss';

if (localStorage.getItem(USER_KEY)) {
  store.dispatch(recallUser());
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
