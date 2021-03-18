import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { NavigationService } from 'navigation';
import { USER_KEY } from 'constants/common';
import { authApi } from 'api/authApi';
import { getLocalStorageUser } from 'utils/localStorage';
import { LOGIN_PAGE_MODE } from 'constants/loginPageMode';
import { AUTHORIZATION_PAGE_MODE } from 'constants/localStorageItem';
import { userApi } from 'api/userApi';
import { REGISTRATION_CODE_RESEND_TIMER } from 'constants/timer';

export const storeToken = (token) => {
  localStorage.setItem(USER_KEY, JSON.stringify(token));
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const clearUser = createAction('@auth/clearUser');
export const setAuthLoading = createAction('@auth/setAuthLoading');
export const changeAuthUserEmail = createAction('@auth/changeAuthUserEmail');

export const recallUser = createAsyncThunk('@auth/recallUser', async (params, { rejectWithValue }) => {
  try {
    const { token, id } = getLocalStorageUser();

    const { data } = await authApi.recallUser(id);

    return { ...data, token };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const registration = createAsyncThunk('@auth/registration', async ({ username, password, email }, { rejectWithValue }) => {
  try {
    const { data } = await authApi.registration({ username, password, email });
    await sleep(1500);

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const verifyRegistration = createAsyncThunk('@user/verifyRegistration',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const { data } = await userApi.verifyEmail({ email, otp });
      await sleep(500);

      localStorage.setItem(USER_KEY, JSON.stringify(data));
      localStorage.removeItem(REGISTRATION_CODE_RESEND_TIMER);

      NavigationService.navigateToHome();

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

export const login = createAsyncThunk('@auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const { data } = await authApi.login({ username, password });
    await sleep(2000);

    localStorage.setItem(USER_KEY, JSON.stringify(data));

    NavigationService.navigateToHome();

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('@auth/logout', async () => {
  await authApi.revokeToken();

  await localStorage.setItem(AUTHORIZATION_PAGE_MODE, LOGIN_PAGE_MODE.login);
  await localStorage.removeItem(USER_KEY);

  NavigationService.navigateToIndex();
});

