import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from 'reducers';
import { isProductionMode } from 'constants/common';

export const store = configureStore({ devTools: !isProductionMode, reducer: rootReducer });
