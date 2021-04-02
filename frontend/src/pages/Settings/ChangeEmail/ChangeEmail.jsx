import React, { useCallback, useState } from 'react';
import { EMAIL_CODE_TYPE } from 'constants/emailCodeType';
import { useDispatch, useSelector } from 'react-redux';
import { SuccessForm } from 'components/SuccessForm';
import { changeEmail } from 'actions/userSettings/email';
import { changeAuthUserEmail } from 'actions/auth';
import { EmailVerification } from 'components/EmailVerification/EmailVerification';
import { getChangeEmailLoading } from 'selectors/userSettings';
import { useTranslation } from 'react-i18next';

const CHANGE_EMAIL_PAGE = {
  emailVerification: 'emailVerification',
  success: 'success',
};

export const ChangeEmail = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isLoading = useSelector(getChangeEmailLoading);

  const [emailSendTo, setEmailSentTo] = useState('');

  const [changeEmailPage, setChangeEmailPage] = useState(CHANGE_EMAIL_PAGE.emailVerification);

  const setChangeEmailPageCallback = useCallback(() => setChangeEmailPage(CHANGE_EMAIL_PAGE.emailVerification), []);
  const setSuccessChangePage = useCallback(() => setChangeEmailPage(CHANGE_EMAIL_PAGE.success), []);

  const onVerificationSuccess = useCallback(async ({ otp }) => {
    await dispatch(changeEmail({ email: emailSendTo, otp }));
    await dispatch(changeAuthUserEmail(emailSendTo));

    setSuccessChangePage();
  }, [dispatch, emailSendTo, setSuccessChangePage]);

  return (
    <div className="card change-password">
      {changeEmailPage === CHANGE_EMAIL_PAGE.emailVerification && (
        <EmailVerification
          isLoading={isLoading}
          onEmailChanged={setEmailSentTo}
          onVerificationSuccessCallback={onVerificationSuccess}
          type={EMAIL_CODE_TYPE.changeEmail}
        />
      )}
      {changeEmailPage === CHANGE_EMAIL_PAGE.success && (
        <SuccessForm
          setPreviousPage={setChangeEmailPageCallback}
          description={t('pages.settings.changeEmail.success')}
        />
      )}
    </div>
  );
};
