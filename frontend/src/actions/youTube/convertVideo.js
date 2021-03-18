import { youTubeApi } from 'api/youTubeApi';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import fileDownload from 'js-file-download';

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

export const downloadConvertedVideo = createAsyncThunk('@youtube/downloadVideo',
  async ({ downloadUrl }, { rejectWithValue, dispatch }) => {
    try {

      const onLoading = (progressEvent) => {
        const { loaded, total } = progressEvent;

        dispatch(setDownloadVideoProgress(Math.floor(loaded/total*100)));
      }

      const response = await youTubeApi.downloadVideo({ downloadUrl }, onLoading);

      dispatch(setDownloadVideoProgress(0));

      fileDownload(response.data, `${downloadUrl}.mp4`);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });


export const getCreds = createAsyncThunk('@youtube/getCreds',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await youTubeApi.getCreds();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
