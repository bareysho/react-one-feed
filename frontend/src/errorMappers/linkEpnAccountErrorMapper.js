import { FORM_ERROR } from 'final-form';

import i18n from 'resources/i18n';

export const linkEpnAccountErrorMapper = {
  ['NEED_RECAPTCHA']: {
    clientId: ' ',
    clientSecret: ' ',
    [FORM_ERROR]: i18n.t(`requestErrors.NEED_RECAPTCHA`),
  }
}
