import { createAsyncThunk } from '@reduxjs/toolkit';
import { emailTokenApi } from 'api/emailTokenApi';
import { setAuthLoading } from 'actions/auth';
import { setChangeEmailLoading } from 'actions/userSettings/userSettings';
import { EMAIL_CODE_TYPE } from 'constants/emailCodeType';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const setLoadingMapper = {
  [EMAIL_CODE_TYPE.verification]: setAuthLoading,
  [EMAIL_CODE_TYPE.passwordRecovery]: setAuthLoading,
  [EMAIL_CODE_TYPE.changeEmail]: setChangeEmailLoading,
}

export const requestEmailCode = createAsyncThunk('@auth/requestEmailCode',
  async ({ email, type }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoadingMapper[type](true));

      const { data } = await emailTokenApi.requestEmailCode({ email, type }) || {};
      await sleep(1500);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoadingMapper[type](false));
    }
  });

export const verifyEmailCode = createAsyncThunk('@auth/verifyEmailCode',
  async ({ email, otp, type }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoadingMapper[type](true));

      const { data } = await emailTokenApi.verifyEmailCode({ email, otp, type });
      await sleep(1500);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    } finally {
      dispatch(setLoadingMapper[type](false));
    }
  });
