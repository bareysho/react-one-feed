import i18n from 'resources/i18n';

export const verificationErrorMapper = {
  ['INVALID_OTP']: {
    otp: i18n.t('requestErrors.INVALID_OTP'),
  },
  ['EXPIRED_OTP']: {
    otp: i18n.t('requestErrors.EXPIRED_OTP'),
  }
}
