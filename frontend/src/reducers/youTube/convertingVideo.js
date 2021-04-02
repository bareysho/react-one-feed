import { createSlice } from '@reduxjs/toolkit';
import { clearConvertVideo, setConvertingVideoProgress, setDownloadVideoProgress } from 'actions/youTube/convertVideo';

const initialState = {
  convertingProgress: { audioProcessed: 0, videoProcessed: 0 },
  downloadingProgress: 0,
  convertedVideoId: null,
  convertingError: false,
};

export const convertingVideoSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(setConvertingVideoProgress, (state, action) => {
      const { convertedVideoId, convertingError, ...convertingProgress } = action.payload;

      return ({
        ...state,
        convertingProgress,
        convertedVideoId,
        convertingError,
      });
    });
    builder.addCase(clearConvertVideo, state => ({ ...state, ...initialState }))
    builder.addCase(setDownloadVideoProgress, (state, action) => {
      return ({
        ...state,
        downloadingProgress: action.payload,
      })
    })
  },
  initialState,
  name: '@youtube',
});
