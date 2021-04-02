import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { PASSWORD_RECOVERY_PAGE, useChangePasswordPages } from 'hooks/useChangePasswordPages';
import { EMAIL_CODE_TYPE } from 'constants/emailCodeType';
import { SuccessForm } from 'components/SuccessForm';
import { EmailVerification } from 'components/EmailVerification/EmailVerification';

import { SetPasswordForm } from './SetPasswordForm';

export const RecoveryPassword = ({
  setPreviousPage,
  isLoading,
}) => {
  const { t } = useTranslation();

  const [emailSentTo, setEmailSentTo] = useState();

  const {
    passwordPageMode,
    setSuccessChangePasswordPage,
    setSetPasswordPage,
  } = useChangePasswordPages(PASSWORD_RECOVERY_PAGE.changePassword);

  const [verifiedOtp, setVerifiedOtp] = useState();

  const onVerificationSuccess = useCallback(({ otp }) => {
    setVerifiedOtp(otp);
    setSetPasswordPage();
  }, [setSetPasswordPage]);

  return (
    <>
      {passwordPageMode === PASSWORD_RECOVERY_PAGE.changePassword && (
        <EmailVerification
          isLoading={isLoading}
          setPreviousPage={setPreviousPage}
          onEmailChanged={setEmailSentTo}
          onVerificationSuccessCallback={onVerificationSuccess}
          type={EMAIL_CODE_TYPE.passwordRecovery}
        />
      )}
      {passwordPageMode === PASSWORD_RECOVERY_PAGE.setPassword && (
        <SetPasswordForm
          nextStepCallback={setSuccessChangePasswordPage}
          otp={verifiedOtp}
          email={emailSentTo}
          isLoading={isLoading}
        />
      )}
      {passwordPageMode === PASSWORD_RECOVERY_PAGE.success && (
        <SuccessForm
          description={t('pages.authorizationForm.successForm.passwordChanged')}
          setPreviousPage={setPreviousPage}
        />
      )}
    </>
  );
};

RecoveryPassword.propTypes = {
  setPreviousPage: PropTypes.func,
  isLoading: PropTypes.bool,
};
