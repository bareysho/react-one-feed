import { FORM_ERROR } from 'final-form';

import i18n from 'resources/i18n';
import { getErrorsObject } from 'utils/error';

const loginErrorMapper = {
  ['INVALID_CREDENTIALS_ERROR']: {
    username: ' ',
    password: ' ',
    [FORM_ERROR]: i18n.t(`requestErrors.INVALID_CREDENTIALS_ERROR`),
  }
}

export const handleSubmitError = (response) => getErrorsObject(response.payload, loginErrorMapper);
