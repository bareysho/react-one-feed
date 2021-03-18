import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { registration } from 'actions/auth';
import { getAuth } from 'selectors/auth';
import { AuthorizationForm, CodeVerificationInfo, Input } from 'components';
import { minLength, onlyLatin, required, validateEmail } from 'validators/baseControlValidators';
import { registrationPasswordsValidate } from 'validators/authorizationPageValidators';

import { registrationErrorMapper } from 'errorMappers/registrationErrorMapper';

export const RegistrationForm = ({ prevStepCallback, nextStepCallback, timeLeft }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading } = useSelector(getAuth);

  const onSubmit = useCallback((credentials) => dispatch(registration(credentials)), [dispatch]);

  const isTimerActive = useMemo(() => Boolean(timeLeft), [timeLeft]);

  return (
    <AuthorizationForm
      onSubmit={onSubmit}
      className="registration"
      submitActionTitle={t('common.buttons.registration')}
      backActionTitle={t('common.buttons.back')}
      formTitle={t('pages.authorizationForm.registrationForm.title')}
      isLoading={isLoading}
      backMethod={prevStepCallback}
      submitButtonDisabled={isTimerActive}
      submitErrorMapper={registrationErrorMapper}
      successSubmitCallback={nextStepCallback}
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
      <CodeVerificationInfo timeLeft={timeLeft} />
    </AuthorizationForm>
  );
};

RegistrationForm.propTypes = {
  prevStepCallback: PropTypes.func,
  nextStepCallback: PropTypes.func,
  timeLeft: PropTypes.number,
};

RegistrationForm.defaultProps = {
  nextStepCallback: undefined,
  prevStepCallback: undefined,
};
