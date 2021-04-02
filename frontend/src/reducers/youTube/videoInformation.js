import { createSlice } from '@reduxjs/toolkit';
import { getVideoInformation } from 'actions/youTube/getVideoInformation';

const initialState = {
  videoInfo: null,
  isLoading: false,
};

const setIsLoading = (value) => (state) => ({ ...state, isLoading: value });

export const videoInformationSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(getVideoInformation.pending, setIsLoading(true));
    builder.addCase(getVideoInformation.rejected, setIsLoading(false));
    builder.addCase(getVideoInformation.fulfilled, (state, action) => {
      return ({
        ...state,
        videoInfo: action.payload,
        isLoading: false,
      })
    })
  },
  initialState,
  name: '@youtube',
});
