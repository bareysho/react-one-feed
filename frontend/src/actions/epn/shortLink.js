import { createAsyncThunk } from '@reduxjs/toolkit';
import { epnApi } from 'api/epnApi';

export const shortLink = createAsyncThunk('@epnApi/shortLink',
  async ({ link, epnAccountId, creativeCode, domainCutter }, { rejectWithValue }) => {
    try {
      const { data } = await epnApi.shortLink({ link, epnAccountId, creativeCode, domainCutter });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })
