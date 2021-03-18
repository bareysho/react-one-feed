import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { EMAIL_CODE_TYPE } from 'constants/emailCodeType';
import { useDispatch } from 'react-redux';
import { useCountdown } from 'hooks/useCountdown';
import { OTP_TIMER_LIMIT } from 'constants/uiConstant';
import { REGISTRATION_CODE_RESEND_TIMER } from 'constants/timer';
import { REGISTRATION_PAGE, useRegistrationPages } from 'hooks/useRegistrationPages';
import { verifyRegistration } from 'actions/auth';
import { VerificationForm } from 'components/VerificationForm';

import { RegistrationForm } from './RegistrationForm';

export const Registration = ({ setPreviousPage, isLoading }) => {
  const dispatch = useDispatch();

  const {
    registrationPageMode,
    setRequestRegistrationPage,
    setVerificationRegistrationPage,
  } = useRegistrationPages(REGISTRATION_PAGE.requestRegistration);

  const {
    start: registrationTimerStart, time: registrationTimerTime,
  } = useCountdown(OTP_TIMER_LIMIT, REGISTRATION_CODE_RESEND_TIMER);

  const [emailSentTo, setEmailSentTo] = useState();

  const onRegistrationRequestSuccess = useCallback(({ email }) => {
    setEmailSentTo(email);
    registrationTimerStart();
    setVerificationRegistrationPage();
  }, [registrationTimerStart, setVerificationRegistrationPage]);

  const onRegistrationVerificationSuccess = useCallback(async ({ otp }) => {
    await dispatch(verifyRegistration({ otp, email: emailSentTo }));
  }, [dispatch, emailSentTo]);

  return (
    <>
      {registrationPageMode === REGISTRATION_PAGE.requestRegistration && (
        <RegistrationForm
          startTimer={registrationTimerStart}
          timeLeft={registrationTimerTime}
          prevStepCallback={setPreviousPage}
          nextStepCallback={onRegistrationRequestSuccess}
        />
      )}
      {registrationPageMode === REGISTRATION_PAGE.verificationRegistration && (
        <VerificationForm
          startTimer={registrationTimerStart}
          timeLeft={registrationTimerTime}
          prevStepCallback={setRequestRegistrationPage}
          nextStepCallback={onRegistrationVerificationSuccess}
          isLoading={isLoading}
          email={emailSentTo}
          type={EMAIL_CODE_TYPE.verification}
        />
      )}
    </>
  );
};

Registration.propTypes = {
  setPreviousPage: PropTypes.func,
  isLoading: PropTypes.bool,
};
