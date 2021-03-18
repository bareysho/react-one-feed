import { createSlice } from '@reduxjs/toolkit';
import { changeEmail } from 'actions/userSettings/email';
import { changePassword } from 'actions/userSettings/password';
import { setChangePasswordLoading, setChangeEmailLoading } from 'actions/userSettings/userSettings';

const initialState = {
  isChangePasswordLoading: false,
  isChangeEmailLoading: false,
};

const setChangePasswordLoadingValue = (value) => (state) => ({ ...state, isChangePasswordLoading: value });
const setChangeEmailLoadingValue = (value) => (state) => ({ ...state, isChangeEmailLoading: value });

export const userSettingsSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(changeEmail.pending, setChangeEmailLoadingValue(true));
    builder.addCase(changeEmail.rejected, setChangeEmailLoadingValue(false));
    builder.addCase(changeEmail.fulfilled, setChangeEmailLoadingValue(false));
    builder.addCase(changePassword.pending, setChangePasswordLoadingValue(true));
    builder.addCase(changePassword.rejected, setChangePasswordLoadingValue(false));
    builder.addCase(changePassword.fulfilled, setChangePasswordLoadingValue(false));
    builder.addCase(setChangePasswordLoading, (state, action) =>
      setChangePasswordLoadingValue(action.payload)(state));
    builder.addCase(setChangeEmailLoading, (state, action) =>
      setChangeEmailLoadingValue(action.payload)(state));
  },
  initialState,
  name: '@userSettings',
});
