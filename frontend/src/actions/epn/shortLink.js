import { createAsyncThunk } from '@reduxjs/toolkit';
import { epnApi } from 'api/epnApi';

export const shortLink = createAsyncThunk('@epnAuth/shortLink',
  async ({ id, link }, { rejectWithValue }) => {
    try {
      const { data } = await epnApi.shortLink({ id, link });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })
