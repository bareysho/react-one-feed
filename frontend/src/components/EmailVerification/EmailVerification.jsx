import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { RequestRecoveryCodeForm } from 'components/RequestRecoveryCodeForm';
import { VerificationForm } from 'components/VerificationForm';
import { useCountdown } from 'hooks/useCountdown';
import { OTP_TIMER_LIMIT } from 'constants/uiConstant';
import { RECOVERY_CODE_RESEND_TIMER } from 'constants/timer';
import { EMAIL_CODE_TYPE } from 'constants/emailCodeType';
import { useTranslation } from 'react-i18next';

export const EMAIL_VERIFICATION_PAGE = {
  requestVerification: 'requestVerification',
  verificationIdentity: 'verificationIdentity',
};

export const EmailVerification = ({
  isLoading,
  setPreviousPage,
  onRequestSuccessCallback,
  onVerificationSuccessCallback,
  onEmailChanged,
  type,
}) => {
  const { t } = useTranslation();

  const {
    start: recoveryTimerStart, time: recoveryTimerTime,
  } = useCountdown(OTP_TIMER_LIMIT, RECOVERY_CODE_RESEND_TIMER);

  const [emailSendTo, setEmailSentTo] = useState('');
  const [emailVerificationPage, setEmailVerificationPage] = useState(EMAIL_VERIFICATION_PAGE.requestVerification);

  const setRequestVerificationPage = useCallback(
    () => setEmailVerificationPage(EMAIL_VERIFICATION_PAGE.requestVerification),
    [],
  );

  const setVerificationIdentityPage = useCallback(
    () => setEmailVerificationPage(EMAIL_VERIFICATION_PAGE.verificationIdentity),
    [],
  );

  const onRequestSuccess = useCallback(async (credentials) => {
    const { email } = credentials;

    if (onRequestSuccessCallback) onRequestSuccessCallback(credentials);
    if (onEmailChanged) onEmailChanged(email);

    setEmailSentTo(email);
    recoveryTimerStart();
    setVerificationIdentityPage();
  }, [onEmailChanged, onRequestSuccessCallback, recoveryTimerStart, setVerificationIdentityPage]);

  const onVerificationSuccess = useCallback((credentials) => {
    if (onVerificationSuccessCallback) onVerificationSuccessCallback(credentials);

    setEmailSentTo(null);
  }, [onVerificationSuccessCallback]);

  const titleMapper = {
    [EMAIL_CODE_TYPE.changeEmail]: t('pages.settings.changeEmail.title'),
    [EMAIL_CODE_TYPE.passwordRecovery]: t('pages.authorizationForm.requestRecoveryCodeForm.title'),
    [EMAIL_CODE_TYPE.verification]: t('pages.authorizationForm.requestRecoveryCodeForm.title'),
  };

  const title = titleMapper[type];

  return (
    <>
      {emailVerificationPage === EMAIL_VERIFICATION_PAGE.requestVerification && (
        <RequestRecoveryCodeForm
          timeLeft={recoveryTimerTime}
          backMethod={setPreviousPage}
          startTimer={recoveryTimerStart}
          nextStepCallback={onRequestSuccess}
          type={type}
          isLoading={isLoading}
          requestFormTitle={title}
        />
      )}
      {emailVerificationPage === EMAIL_VERIFICATION_PAGE.verificationIdentity && (
        <VerificationForm
          startTimer={recoveryTimerStart}
          timeLeft={recoveryTimerTime}
          prevStepCallback={setRequestVerificationPage}
          nextStepCallback={onVerificationSuccess}
          email={emailSendTo}
          isLoading={isLoading}
          type={type}
        />
      )}
    </>
  );
};

EmailVerification.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  onRequestSuccessCallback: PropTypes.func,
  setPreviousPage: PropTypes.func,
  onVerificationSuccessCallback: PropTypes.func,
  onEmailChanged: PropTypes.func,
};
