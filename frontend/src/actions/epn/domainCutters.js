import { createAsyncThunk } from '@reduxjs/toolkit';
import { epnApi } from 'api/epnApi';

export const getDomainCutters = createAsyncThunk('@epnApi/getDomainCutters',
  async ({ epnAccountId }, { rejectWithValue }) => {
    try {
      const { data } = await epnApi.getDomainCutters({ epnAccountId });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })
