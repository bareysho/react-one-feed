import { createSlice } from '@reduxjs/toolkit';

import { login, logout, recallUser } from 'actions/auth';
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

export const authSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { token, ...user } = action.payload;

      return ({
        ...state,
        token,
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    });
    builder.addCase(login.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(login.rejected, (state, action) => {
      return ({
        ...state,
        isLoading: false,
      })
    });
    builder.addCase(logout.fulfilled, (state, action) => ({
      ...state,
      initialState,
    }));
    builder.addCase(recallUser.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(recallUser.fulfilled, (state,  action) => {
      const { token, ...user } = action.payload;

      return ({
        ...state,
        token,
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    });
  },
  initialState,
  name: '@auth',
  reducers: {
    clearUser: (state) => ({ ...state, user: null }),
  },
});
