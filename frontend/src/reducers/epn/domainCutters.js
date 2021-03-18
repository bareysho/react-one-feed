import { createSlice } from '@reduxjs/toolkit';
import { setLoading } from 'reducers/common';
import { getDomainCutters } from 'actions/epn/domainCutters';

export const initialState = {
  isLoading: false,
};

export const domainCuttersSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(getDomainCutters.pending, setLoading(true));
    builder.addCase(getDomainCutters.fulfilled, (state, action) => {
      return ({
        ...state,
        isLoading: false,
        data: action.payload
      })
    });
    builder.addCase(getDomainCutters.rejected, setLoading(false));
  },
  initialState,
  name: '@domainCutters',
});
