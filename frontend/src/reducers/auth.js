import { createSlice } from '@reduxjs/toolkit';

import { login, logout, recallUser, registration } from 'actions/auth';
import { USER_KEY } from 'constants/common';

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

const setLoading = (value) => (state) => ({
  ...state,
  isLoading: value,
})

export const authSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, authenticateFulfilledReducer);
    builder.addCase(login.pending, setLoading(true));
    builder.addCase(login.rejected, setLoading(false));
    builder.addCase(registration.fulfilled, authenticateFulfilledReducer);
    builder.addCase(registration.pending, setLoading(true));
    builder.addCase(registration.rejected, setLoading(false));
    builder.addCase(recallUser.pending, setLoading(true));
    builder.addCase(recallUser.fulfilled, authenticateFulfilledReducer);
    builder.addCase(logout.fulfilled, (state, action) => ({
      ...state,
      initialState,
    }));
  },
  initialState,
  name: '@auth',
  reducers: {
    clearUser: (state) => ({ ...state, user: null }),
  },
});
