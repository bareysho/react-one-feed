import { createSlice } from '@reduxjs/toolkit';

import {
  login,
  logout,
  recallUser,
  registration,
  requestEmailCode,
  verifyEmailVerificationCode,
  verifyPasswordRecoveryCode
} from 'actions/auth';
import { USER_KEY } from 'constants/common';
import { setLoading } from 'reducers/common';

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

export const authSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, authenticateFulfilledReducer);
    builder.addCase(login.pending, setLoading(true));
    builder.addCase(login.rejected, setLoading(false));
    builder.addCase(verifyEmailVerificationCode.fulfilled, authenticateFulfilledReducer);
    builder.addCase(verifyEmailVerificationCode.pending, setLoading(true));
    builder.addCase(verifyEmailVerificationCode.rejected, setLoading(false));
    builder.addCase(registration.fulfilled, registrationFulfilledReducer);
    builder.addCase(registration.pending, setLoading(true));
    builder.addCase(registration.rejected, setLoading(false));
    builder.addCase(requestEmailCode.fulfilled, (state, action) => {
      return ({
        ...state,
        user: action.payload,
        isLoading: false,
      });
    });
    builder.addCase(requestEmailCode.pending, setLoading(true));
    builder.addCase(requestEmailCode.rejected, setLoading(false));
    builder.addCase(verifyPasswordRecoveryCode.fulfilled, (state, action) => {
      return ({
        ...state,
        user: null,
        isLoading: false,
      });
    });
    builder.addCase(verifyPasswordRecoveryCode.pending, setLoading(true));
    builder.addCase(verifyPasswordRecoveryCode.rejected, setLoading(false));
    builder.addCase(recallUser.pending, setLoading(true));
    builder.addCase(recallUser.fulfilled, authenticateFulfilledReducer);
    builder.addCase(logout.pending, setLoading(true));
    builder.addCase(logout.rejected, setLoading(false));
    builder.addCase(logout.fulfilled, (state, action) => ({
      ...state,
      initialState,
      isLoading: false,
    }));
  },
  initialState,
  name: '@auth',
  reducers: {
    clearUser: (state) => ({ ...state, user: null }),
  },
});
