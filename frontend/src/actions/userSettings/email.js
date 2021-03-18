import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from 'api/userApi';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const changeEmail = createAsyncThunk('@userSettings/changeEmail',
  async ({ email, otp, type }, { rejectWithValue }) => {
    try {
      const { data } = await userApi.changeEmail({ email, otp, type });

      await sleep(500);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
