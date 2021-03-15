import { createSlice } from '@reduxjs/toolkit';
import { shortLink } from 'actions/epn';
import { setLoading } from 'reducers/common';

export const initialState = {
  isLoading: false,
};

export const shortLinkSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(shortLink.pending, setLoading(true));
    builder.addCase(shortLink.fulfilled, (state, action) => {
      return ({
        ...state,
        isLoading: false,
        result: action.payload
      })
    });
    builder.addCase(shortLink.rejected, setLoading(false));
  },
  initialState,
  name: '@shortenLink',
});
