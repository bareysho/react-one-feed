import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AuthorizationForm, Input } from 'components';
import { registration } from 'actions/auth';
import { getAuth } from 'selectors/auth';
import { minLength, onlyLatin, required, validateEmail } from 'validators/baseControlValidators';
import { registrationPasswordsValidate } from 'validators/authorizationPageValidators';

import { registrationErrorsMapper } from './registrationErrorsMapper';

export const RegistrationForm = ({ backMethod, setVerificationMode }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading } = useSelector(getAuth);

  const onSubmit = useCallback((credentials) => dispatch(registration(credentials)), [dispatch]);

  return (
    <AuthorizationForm
      onSubmit={onSubmit}
      className="registration"
      submitActionTitle={t('common.buttons.registration')}
      backActionTitle={t('common.buttons.back')}
      isLoading={isLoading}
      backMethod={backMethod}
      submitErrorMapper={registrationErrorsMapper}
      successSubmitCallback={setVerificationMode}
      validate={registrationPasswordsValidate}
    >
      <Input
        name="username"
        validators={[required, onlyLatin, minLength(4)]}
        label={t('common.fields.username')}
        maxLength={32}
      />
      <Input
        name="email"
        type="email"
        validators={[required, validateEmail]}
        label={t('common.fields.email')}
        maxLength={64}
      />
      <Input
        name="password"
        type="password"
        validators={[required, minLength(6)]}
        label={t('common.fields.password')}
        maxLength={64}
      />
      <Input
        name="confirmationPassword"
        type="password"
        validators={[required, minLength(6)]}
        label={t('common.fields.confirmationPassword')}
        maxLength={64}
      />
    </AuthorizationForm>
  );
};

RegistrationForm.propTypes = {
  backMethod: PropTypes.func,
  setVerificationMode: PropTypes.func,
};

RegistrationForm.defaultProps = {
  backMethod: undefined,
  setVerificationMode: undefined,
};
