import { createAsyncThunk } from '@reduxjs/toolkit';

import { linkedAccountApi } from 'api/linkedAccountsApi';

export const getLinkedAccounts = createAsyncThunk('@epnAuth/getLinkedAccounts',
  async (_, thunkAPI) => {
    try {
      const { data } = await linkedAccountApi.getLinkedAccounts();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  })

export const fetchLinkedAccount = createAsyncThunk('@epnAuth/fetchLinkedAccount',
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const { data } = await linkedAccountApi.fetchLinkedAccount({ id, type });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })

export const deleteLinkedAccount = createAsyncThunk('@epnAuth/deleteLinkedAccount',
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const { data } = await linkedAccountApi.deleteLinkedAccount({ id, type });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })
