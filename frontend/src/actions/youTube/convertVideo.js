import { youTubeApi } from 'api/youTubeApi';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const setConvertingVideoProgress = createAction('@youtube/setConvertingVideoProgress');
export const setDownloadVideoProgress = createAction('@youtube/setLoadingProgress');
export const clearConvertVideo = createAction('@youtube/clearConvertVideo');

export const convertVideo = createAsyncThunk('@youtube/convertVideo',
  async ({ downloadUrl }, { rejectWithValue }) => {
    try {
      await youTubeApi.convertVideo({ downloadUrl });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

export const cancelConvertVideo = createAsyncThunk('@youtube/cancelConvertVideo',
  async ({ downloadUrl }, { rejectWithValue, dispatch }) => {
    try {
      await dispatch(clearConvertVideo());
      await youTubeApi.cancelConvertVideo({ downloadUrl });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
