import i18n from 'resources/i18n';

export const required = (value) => (value ? undefined : i18n.t('validators.baseControlValidators.required'));

const validateRegexp = (value, regexp, error) => {
  const isInvalid = regexp.test(value);
  return isInvalid ? undefined : error;
}

export const validateEmail = (email) => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const lowerCaseEmail = String(email).toLowerCase();

  return validateRegexp(lowerCaseEmail, emailRegexp, i18n.t('validators.baseControlValidators.invalidEmail'));
}

export const onlyLatin = (value) => {
  const onlyLatinRegexp = /^[a-zA-Z0-9()*_\-!#$%^&*,."\'\][]*$/;

  return validateRegexp(value, onlyLatinRegexp, i18n.t('validators.baseControlValidators.onlyLatinField'));
}
