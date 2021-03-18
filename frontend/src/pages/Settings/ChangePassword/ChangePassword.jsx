import React from 'react';
import { useTranslation } from 'react-i18next';
import { SuccessForm } from 'components/SuccessForm';
import { PASSWORD_RECOVERY_PAGE, useChangePasswordPages } from 'hooks/useChangePasswordPages';

import { ChangePasswordForm } from './ChangePasswordForm/ChangePasswordForm';

import './ChangePassword.scss';

export const ChangePassword = () => {
  const {
    passwordPageMode,
    setEmailVerificationPage,
    setSuccessChangePasswordPage,
  } = useChangePasswordPages();
  const { t } = useTranslation();

  return (
    <div className="card change-password">
      {passwordPageMode === PASSWORD_RECOVERY_PAGE.changePassword && (
        <ChangePasswordForm setSuccessfulState={setSuccessChangePasswordPage} />
      )}
      {passwordPageMode === PASSWORD_RECOVERY_PAGE.success && (
        <SuccessForm
          description={t('pages.authorizationForm.successForm.passwordChanged')}
          setPreviousPage={setEmailVerificationPage}
        />
      )}
    </div>
  );
};
