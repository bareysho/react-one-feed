import { createSlice } from '@reduxjs/toolkit';
import { setLoading } from 'reducers/common';
import { getUserCreatives } from 'actions/epn/creatives';

export const initialState = {
  isLoading: false,
};

export const creativesSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(getUserCreatives.pending, setLoading(true));
    builder.addCase(getUserCreatives.fulfilled, (state, action) => {
      return ({
        ...state,
        isLoading: false,
        data: action.payload
      })
    });
    builder.addCase(getUserCreatives.rejected, setLoading(false));
  },
  initialState,
  name: '@creatives',
});
