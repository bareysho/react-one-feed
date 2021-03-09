import { createAsyncThunk } from '@reduxjs/toolkit';

import { NavigationService } from 'navigation';
import { USER_KEY } from 'constants/common';
import { authApi } from 'api/authApi';
import { getLocalStorageUser } from 'utils/localStorage';
import { LOGIN_PAGE_MODE } from 'constants/loginPageMode';
import { AUTHORIZATION_PAGE_MODE } from 'constants/localStorageItem';
import { RECOVERY_CODE_RESEND_TIMER } from 'constants/timer';

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

export const requestEmailCode = createAsyncThunk('@auth/requestEmailCode',
  async ({ email, type }, { rejectWithValue }) => {
  try {
    await sleep(1500);
    const { data } = await authApi.requestEmailCode({ email, type });


    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const verifyPasswordRecoveryCode = createAsyncThunk('@auth/verifyPasswordRecoveryCode',
  async ({ otp, password, id }, { rejectWithValue }) => {
  try {
    await sleep(1500);
    const { data } = await authApi.verifyRecoveryPasswordCode({ otp, password, id });

    localStorage.removeItem(RECOVERY_CODE_RESEND_TIMER);

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const login = createAsyncThunk('@auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    await sleep(2000);
    const { data } = await authApi.login({ username, password });

    localStorage.setItem(USER_KEY, JSON.stringify(data));

    NavigationService.redirectTo('/home');


    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const verifyEmailVerificationCode = createAsyncThunk('@auth/verifyEmailVerificationCode',
  async ({ id, otp }, { rejectWithValue }) => {
  try {
    await sleep(1500);
    const { data } = await authApi.verifyEmailVerificationCode({ id, otp });

    localStorage.setItem(USER_KEY, JSON.stringify(data));
    localStorage.removeItem(RECOVERY_CODE_RESEND_TIMER);

    NavigationService.redirectTo('/home');

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const registration = createAsyncThunk('@auth/registration', async ({ username, password, email }, { rejectWithValue }) => {
  try {
    await sleep(1500);
    const { data } = await authApi.registration({ username, password, email });

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('@auth/logout', async () => {
  await authApi.revokeToken();

  localStorage.setItem(AUTHORIZATION_PAGE_MODE, LOGIN_PAGE_MODE.login);
  localStorage.removeItem(USER_KEY);
})

