import { createAsyncThunk } from '@reduxjs/toolkit';

import { USER_KEY } from 'constants/common';
import { authApi } from 'api/authApi';

export const login = createAsyncThunk('@auth/login', async ({ username, password }) => {
  const { data } = await authApi.login(username, password);

  localStorage.setItem(USER_KEY, JSON.stringify(data));

  return data;
});
