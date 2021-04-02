import { createSlice } from '@reduxjs/toolkit';

import { setLoading } from 'reducers/common';
import { USER_KEY } from 'constants/common';
import {
  changeAuthUserEmail,
  clearUser,
  login,
  logout,
  recallUser,
  registration,
  setAuthLoading,
  verifyRegistration
} from 'actions/auth';

export const getUserFromLS = () => {
  const userData = localStorage.getItem(USER_KEY) || '';

  return userData ? JSON.parse(userData) : null;
};

export const initialState = {
  token: null,
  isLoading: false,
  isAuthenticated: false,
  verified: false,
  user: null,
};

const registrationFulfilledReducer = (state, action) => {
  return ({
    ...state,
    user: action.payload,
    isLoading: false,
    isAuthenticated: true,
  });
};

const authenticateFulfilledReducer = (state, action) => {
  const { token, ...user } = action.payload;

  return ({
    ...state,
    token,
    user,
    isLoading: false,
    isAuthenticated: true,
  });
};

const setInitialState = (state) => ({
  ...state,
  ...initialState,
});

export const authSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(setAuthLoading, (state, action) => setLoading(action.payload)(state));
    builder.addCase(changeAuthUserEmail, (state, action) => ({
      ...state,
      user: {
        ...state.user,
        email: action.payload
      }
    }));
    builder.addCase(clearUser, setInitialState);
    builder.addCase(recallUser.pending, setLoading(true));
    builder.addCase(recallUser.fulfilled, authenticateFulfilledReducer);
    builder.addCase(logout.pending, setLoading(true));
    builder.addCase(logout.rejected, setLoading(false));
    builder.addCase(logout.fulfilled, setInitialState);
    builder.addCase(login.fulfilled, authenticateFulfilledReducer);
    builder.addCase(login.pending, setLoading(true));
    builder.addCase(login.rejected, setLoading(false));
    builder.addCase(verifyRegistration.fulfilled, authenticateFulfilledReducer);
    builder.addCase(verifyRegistration.pending, setLoading(true));
    builder.addCase(verifyRegistration.rejected, setLoading(false));
    builder.addCase(registration.fulfilled, registrationFulfilledReducer);
    builder.addCase(registration.pending, setLoading(true));
    builder.addCase(registration.rejected, setLoading(false));
  },
  initialState,
  name: '@auth',
  reducers: {
    clearUser: (state) => ({ ...state, user: null }),
  },
});
