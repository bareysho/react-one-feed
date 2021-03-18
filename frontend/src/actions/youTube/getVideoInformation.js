import { createAsyncThunk } from '@reduxjs/toolkit';
import { youTubeApi } from 'api/youTubeApi';

export const getVideoInformation = createAsyncThunk('@youtube/getVideoInformation',
  async ({ downloadUrl }, { rejectWithValue }) => {
    try {
      const { data } = await youTubeApi.getVideoInformation({ downloadUrl });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })
