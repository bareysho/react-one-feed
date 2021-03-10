import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AuthorizationForm, Input, RetryCountdown } from 'components';
import { registrationPasswordsValidate } from 'validators/authorizationPageValidators';
import { minLength, required } from 'validators/baseControlValidators';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'selectors/auth';
import { verifyPasswordRecoveryCode } from 'actions/auth';
import { OTP_CODE_MASK } from 'constants/mask';
import { verificationErrorMapper } from 'errorMappers/verificationErrorMapper';
import { EMAIL_CODE_TYPE } from 'constants/emailCodeType';

export const SetPasswordForm = ({ backMethod, setSuccessMode, setRecoveryVerificationMode, startTimer, timeLeft }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading, user } = useSelector(getAuth);
  const { id } = user || {};

  const onSubmit = useCallback(
    (credentials) => dispatch(verifyPasswordRecoveryCode({ ...credentials, id })),
    [dispatch, id],
  );

  return (
    <AuthorizationForm
      onSubmit={onSubmit}
      className="set-password"
      submitActionTitle={t('common.buttons.approve')}
      formTitle={t('pages.authorizationForm.setPasswordCode.title')}
      backActionTitle={t('common.buttons.cancellation')}
      isLoading={isLoading}
      backMethod={backMethod}
      submitErrorMapper={verificationErrorMapper}
      successSubmitCallback={setSuccessMode}
      validate={registrationPasswordsValidate}
    >
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
      <br />
      <Input
        name="otp"
        className="mb-1"
        mask={OTP_CODE_MASK}
        validators={[required, minLength(6)]}
        label={t('common.fields.otp')}
      />
      <RetryCountdown
        startTimer={startTimer}
        timeLeft={timeLeft}
        changeEmailCallback={setRecoveryVerificationMode}
        type={EMAIL_CODE_TYPE.passwordRecovery}
      />
    </AuthorizationForm>
  );
};

SetPasswordForm.propTypes = {
  backMethod: PropTypes.func,
  setSuccessMode: PropTypes.func,
  startTimer: PropTypes.func,
  setRecoveryVerificationMode: PropTypes.func,
  timeLeft: PropTypes.number,
};

SetPasswordForm.defaultProps = {
  backMethod: undefined,
  setSuccessMode: undefined,
};
