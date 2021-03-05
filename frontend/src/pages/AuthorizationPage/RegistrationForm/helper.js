import i18n from 'resources/i18n';
import { getErrorsObject } from 'utils/error';

const registrationErrorsMapper = {
  ['EMAIL_EXISTS']: {
    email: i18n.t('requestErrors.EMAIL_EXISTS'),
  },
  ['USERNAME_EXISTS']: {
    username: i18n.t('requestErrors.USERNAME_EXISTS'),
  }
}

export const handleSubmitError = (response) => getErrorsObject(response.payload, registrationErrorsMapper);

