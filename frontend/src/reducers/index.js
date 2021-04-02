import { combineReducers } from 'redux';

import { authSlice } from './auth';
import { shortLinkSlice, creativesSlice, parseDescriptionSlice, domainCuttersSlice } from './epn';
import { linkedAccountsSlice } from './linkedAccounts';
import { userSettingsSlice } from './userSettings';
import { convertingVideoSlice, videoInformationSlice } from './youTube';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  linkedAccounts: linkedAccountsSlice.reducer,
  userSettings: userSettingsSlice.reducer,
  youTube: combineReducers({
    convertingVideo: convertingVideoSlice.reducer,
    videoInformation: videoInformationSlice.reducer,
  }),
  epn: combineReducers({
    creatives: creativesSlice.reducer,
    shortenLink: shortLinkSlice.reducer,
    parseDescription: parseDescriptionSlice.reducer,
    domainCutters: domainCuttersSlice.reducer,
  }),
});
