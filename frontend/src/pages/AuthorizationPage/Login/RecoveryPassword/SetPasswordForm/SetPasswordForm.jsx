import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AuthorizationForm, Control, Input } from 'components';
import { registrationPasswordsValidate } from 'validators/authorizationPageValidators';
import { minLength, required } from 'validators/baseControlValidators';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { verificationErrorMapper } from 'errorMappers/verificationErrorMapper';
import { recoveryPassword } from 'actions/userSettings/password';

export const SetPasswordForm = ({ nextStepCallback, otp, email, isLoading }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    ({ password }) => dispatch(recoveryPassword({ email, password, otp })),
    [dispatch, email, otp],
  );

  return (
    <AuthorizationForm
      onSubmit={onSubmit}
      className="set-password"
      submitActionTitle={t('common.buttons.approve')}
      formTitle={t('pages.authorizationForm.setPasswordCode.title')}
      backActionTitle={t('common.buttons.cancellation')}
      isLoading={isLoading}
      submitErrorMapper={verificationErrorMapper}
      successSubmitCallback={nextStepCallback}
      validate={registrationPasswordsValidate}
    >
      <Control
        name="password"
        type="password"
        validators={[required, minLength(6)]}
        label={t('common.fields.password')}
        maxLength={64}
        component={Input}
      />
      <Control
        name="confirmationPassword"
        type="password"
        validators={[required, minLength(6)]}
        label={t('common.fields.confirmationPassword')}
        maxLength={64}
        component={Input}
      />
    </AuthorizationForm>
  );
};

SetPasswordForm.propTypes = {
  otp: PropTypes.string,
  email: PropTypes.string,
  isLoading: PropTypes.bool,
  nextStepCallback: PropTypes.func,
};

SetPasswordForm.defaultProps = {
  nextStepCallback: undefined,
};
