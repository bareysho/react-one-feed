import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AuthorizationForm, Control, InputMask, RetryCountdown } from 'components';
import { minLength, required } from 'validators/baseControlValidators';
import { useTranslation } from 'react-i18next';
import { verifyEmailCode } from 'actions/emailToken';
import { useDispatch } from 'react-redux';
import { OTP_CODE_MASK } from 'constants/mask';

import { verificationErrorMapper } from 'errorMappers/verificationErrorMapper';

import './VerificationForm.scss';

export const VerificationForm = ({
  type,
  email,
  startTimer,
  timeLeft,
  nextStepCallback,
  prevStepCallback,
  isLoading,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    ({ otp }) => dispatch(verifyEmailCode({ email, otp, type })),
    [dispatch, email, type],
  );

  const successSubmitCallback = useCallback(async ({ otp }) => {
    nextStepCallback({ otp });
  }, [nextStepCallback]);

  return (
    <AuthorizationForm
      onSubmit={onSubmit}
      className="verification"
      submitActionTitle={t('common.buttons.approve')}
      backActionTitle={t('common.buttons.cancellation')}
      formTitle={t('pages.authorizationForm.verificationForm.title')}
      isLoading={isLoading}
      backMethod={prevStepCallback}
      successSubmitCallback={successSubmitCallback}
      submitErrorMapper={verificationErrorMapper}
    >
      <Control
        name="otp"
        mask={OTP_CODE_MASK}
        className="mb-0"
        validators={[required, minLength(6)]}
        label={t('common.fields.otp')}
        component={InputMask}
      />
      <RetryCountdown
        startTimer={startTimer}
        timeLeft={timeLeft}
        changeEmailCallback={prevStepCallback}
        type={type}
        email={email}
      />
    </AuthorizationForm>
  );
};

VerificationForm.propTypes = {
  prevStepCallback: PropTypes.func,
  startTimer: PropTypes.func,
  nextStepCallback: PropTypes.func,
  timeLeft: PropTypes.number,
  isLoading: PropTypes.bool,
  email: PropTypes.string,
  type: PropTypes.string,
};

VerificationForm.defaultProps = {
  prevStepCallback: undefined,
};
