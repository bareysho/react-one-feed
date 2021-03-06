import i18n from 'resources/i18n';

import { getErrorsObject } from 'utils/error';

const verificationErrorsMapper = {
  ['INVALID_OTP']: {
    otp: i18n.t('requestErrors.INVALID_OTP'),
  }
}

export const handleSubmitError = (response, successCallback) =>
  getErrorsObject(response.payload, verificationErrorsMapper, successCallback);
