import i18n from 'resources/i18n';

export const registrationPasswordsValidate = (values) => {
  const errors = {};

  const { password, confirmationPassword } = values;

  if (password && confirmationPassword && password !== confirmationPassword) {
    errors.password = ' ';
    errors.confirmationPassword = i18n.t('validators.baseControlValidators.passwordsMissMatch');
  }

  return errors;
}
