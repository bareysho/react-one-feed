import i18n from 'resources/i18n';
import { getPluralIndex } from 'utils/plural';

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

export const minLength = length => value => {
  const pluralIndex = getPluralIndex(length);

  const minLengthText = i18n.t('validators.baseControlValidators.minLength', { length });
  const symbolsPluralText = i18n.t('common.plural.symbolInterval', { count: pluralIndex, postProcess: 'interval' });

  return `${value}`.length >= length ? undefined : `${minLengthText} ${symbolsPluralText}`;
}
