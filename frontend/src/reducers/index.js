import { combineReducers } from 'redux';

import { authSlice } from './auth';
import { shortLinkSlice } from './epn';
import { linkedAccountsSlice } from './linkedAccounts';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  shortenLink: shortLinkSlice.reducer,
  linkedAccounts: linkedAccountsSlice.reducer,
});
