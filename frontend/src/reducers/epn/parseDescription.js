import { createSlice } from '@reduxjs/toolkit';
import { setLoading } from 'reducers/common';
import { clearParsedDescription, parseDescription } from 'actions/epn/paerseDescription';

export const initialState = {
  isLoading: false,
  parsedDescription: ''
};

export const parseDescriptionSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(parseDescription.pending, setLoading(true));
    builder.addCase(parseDescription.fulfilled, (state, action) => {
      return ({
        ...state,
        isLoading: false,
        parsedDescription: action.payload
      })
    });
    builder.addCase(parseDescription.rejected, setLoading(false));
    builder.addCase(clearParsedDescription, () => initialState);
  },
  initialState,
  name: '@parseDescription',
});
