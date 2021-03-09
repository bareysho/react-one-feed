import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AuthorizationForm, Input, RetryCountdown } from 'components';
import { minLength, required } from 'validators/baseControlValidators';
import { useTranslation } from 'react-i18next';
import { verifyEmailVerificationCode } from 'actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'selectors/auth';
import { OTP_CODE_MASK } from 'constants/mask';
import { EMAIL_CODE_TYPE } from 'constants/emailCodeType';

import { verificationErrorMapper } from 'errorMappers/verificationErrorMapper';

import './VerificationForm.scss';

export const VerificationForm = ({ setSelectAuthMenu, setRegistrationMode, startTimer, timeLeft }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading, user } = useSelector(getAuth);
  const { id } = user || {};

  const onSubmit = useCallback(
    (credentials) => dispatch(verifyEmailVerificationCode({ ...credentials, id, type: EMAIL_CODE_TYPE.verification })),
    [dispatch, id],
  );

  return (
    <AuthorizationForm
      onSubmit={onSubmit}
      className="verification"
      submitActionTitle={t('common.buttons.approve')}
      backActionTitle={t('common.buttons.cancellation')}
      formTitle={t('pages.authorizationForm.verificationForm.title')}
      isLoading={isLoading}
      backMethod={setSelectAuthMenu}
      submitErrorMapper={verificationErrorMapper}
    >
      <Input
        name="otp"
        mask={OTP_CODE_MASK}
        className="mb-0"
        validators={[required, minLength(6)]}
        label={t('common.fields.otp')}
      />
      <RetryCountdown
        startTimer={startTimer}
        timeLeft={timeLeft}
        changeEmailCallback={setRegistrationMode}
        type={EMAIL_CODE_TYPE.verification}
      />
    </AuthorizationForm>
  );
};

VerificationForm.propTypes = {
  setSelectAuthMenu: PropTypes.func,
  setRegistrationMode: PropTypes.func,
  startTimer: PropTypes.func,
  timeLeft: PropTypes.number,
};

VerificationForm.defaultProps = {
  setRegistrationMode: undefined,
};
