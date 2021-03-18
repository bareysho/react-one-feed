import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { LINK_REGEXP } from 'constants/regexp';
import { epnApi } from 'api/epnApi';

export const parseDescription = createAsyncThunk('@epnApi/parseDescriptionLinks',
  async ({ epnAccountId, originalDescription, creativeCode, domainCutter }, { rejectWithValue }) => {
    try {
      const links = originalDescription.match(LINK_REGEXP);

      if (links) {
        const { data: linkReplacements } =
          await epnApi.parseDescriptionLinks({ epnAccountId, links, creativeCode, domainCutter });

        return originalDescription.replace(LINK_REGEXP, (link) => linkReplacements[link]);
      }

      return originalDescription;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })

export const clearParsedDescription = createAction('@epnApi/clearParsedDescription');
