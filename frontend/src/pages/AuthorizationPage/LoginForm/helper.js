import { FORM_ERROR } from 'final-form';

import i18n from 'resources/i18n';

export const handleSubmitError = (response) => {
  const errorMapper = {
    ['INVALID_CREDENTIALS_ERROR']: {
      username: ' ',
      password: ' ',
      [FORM_ERROR]: i18n.t(`requestErrors.INVALID_CREDENTIALS_ERROR`),
    }
  }

  return errorMapper[response.payload];
}
