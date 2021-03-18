import { createAsyncThunk } from '@reduxjs/toolkit';

import { epnApi } from 'api/epnApi';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const linkEpnAccount = createAsyncThunk('@epnAuth/linkEpnAccount',
  async ({
           clientId,
           clientSecret,
           reCaptchaToken,
           reCaptchaPhrase
         }, { rejectWithValue }) => {

    try {

      await sleep(2000);
      const { data } = await epnApi.linkEpnAccount({ reCaptchaToken, reCaptchaPhrase, clientId, clientSecret });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })


