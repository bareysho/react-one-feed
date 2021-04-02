import { createAsyncThunk } from '@reduxjs/toolkit';
import { epnApi } from 'api/epnApi';

export const getUserCreatives = createAsyncThunk('@epnApi/getUserCreatives',
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await epnApi.getUserCreatives({ id });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })
