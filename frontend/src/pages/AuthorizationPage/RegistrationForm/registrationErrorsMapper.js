import i18n from 'resources/i18n';

export const registrationErrorsMapper = {
  ['EMAIL_EXISTS']: {
    email: i18n.t('requestErrors.EMAIL_EXISTS'),
  },
  ['USERNAME_EXISTS']: {
    username: i18n.t('requestErrors.USERNAME_EXISTS'),
  },
}

