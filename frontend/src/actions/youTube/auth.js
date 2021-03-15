import { createAsyncThunk } from '@reduxjs/toolkit';
import { youTubeApi } from 'api/youTubeApi';

export const linkYouTubeAccount = createAsyncThunk('@epnAuth/linkYouTubeAccount',
  async ({ code, profile }, { rejectWithValue }) => {
    try {
      const { data } = await youTubeApi.linkYouTubeAccount({ code, profile });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })

export const getAuthYouTubeAccountLink = createAsyncThunk('@epnAuth/getAuthYouTubeAccountLink',
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await youTubeApi.getAuthLink();

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })
