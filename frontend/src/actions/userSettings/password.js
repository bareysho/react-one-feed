import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from 'api/userApi';
import { setAuthLoading } from 'actions/auth';
import { setChangePasswordLoading } from 'actions/userSettings/userSettings';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const changePassword = createAsyncThunk('@userSettings/changePassword',
  async ({ currentPassword, password }, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setChangePasswordLoading(true));

    const { data } = await userApi.changePassword({ currentPassword, password });
    await sleep(500);

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  } finally {
    dispatch(setChangePasswordLoading(false));
  }
});

export const recoveryPassword = createAsyncThunk('@userSettings/recoveryPassword',
  async ({ email, otp, password }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setAuthLoading(true));

      const { data } = await userApi.recoveryPassword({ email, otp, password });
      await sleep(500);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setAuthLoading(false));
    }
  });
