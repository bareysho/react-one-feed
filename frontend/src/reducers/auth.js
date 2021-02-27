import { createSlice } from '@reduxjs/toolkit';

import { login } from '../actions/auth';
import { USER_KEY } from '../constants/common';

export const getUserFromLS = () => {
  const userData = localStorage.getItem(USER_KEY) || '';

  return userData ? JSON.parse(userData) : null;
};

export const initialState = {
  user: getUserFromLS(),
};

export const authSlice = createSlice({
  extraReducers: (builder) => {
    console.log(login);
    builder.addCase(login?.fulfilled, (state, action) => ({
      ...state,
      user: action.payload,
    }));
  },
  initialState,
  name: '@auth',
  reducers: {
    clearUser: (state) => ({ ...state, user: null }),
  },
});
