import { createAsyncThunk } from '@reduxjs/toolkit';

import { NavigationService } from 'navigation';
import { USER_KEY } from 'constants/common';
import { authApi } from 'api/authApi';
import { getLocalStorageUser } from 'utils/localStorage';

export const storeToken = (token) => {
  localStorage.setItem(USER_KEY, JSON.stringify(token));
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const recallUser = createAsyncThunk('@auth/recallUser', async (params, { rejectWithValue }) => {
  try {
    const { token, id } = getLocalStorageUser();

    const { data } = await authApi.recallUser(id);

    return { ...data, token };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const login = createAsyncThunk('@auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    await sleep(1500);

    const { data } = await authApi.login({ username, password });

    localStorage.setItem(USER_KEY, JSON.stringify(data));

    NavigationService.redirectTo('/home');

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const logout = createAsyncThunk('@auth/logout', async () => {
  await authApi.revokeToken();

  localStorage.removeItem(USER_KEY);
})

