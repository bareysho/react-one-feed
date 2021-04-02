import { useCallback, useState } from 'react';

export const PASSWORD_RECOVERY_PAGE = {
  changePassword: 'changePassword',
  setPassword: 'setPassword',
  success: 'success'
};

export const useChangePasswordPages = (initialPage, onPageModeChange) => {
  const [passwordPageMode, setPasswordPageModeMode] = useState(initialPage || PASSWORD_RECOVERY_PAGE.changePassword);

  const handleChange = useCallback((pageMode) => {
    if (onPageModeChange) onPageModeChange(pageMode);

    setPasswordPageModeMode(pageMode);
  }, [])

  const setEmailVerificationPage = useCallback(() => handleChange(PASSWORD_RECOVERY_PAGE.changePassword), []);
  const setSetPasswordPage = useCallback(() => handleChange(PASSWORD_RECOVERY_PAGE.setPassword), [])
  const setSuccessChangePasswordPage = useCallback(() => handleChange(PASSWORD_RECOVERY_PAGE.success), [])

  return {
    passwordPageMode,
    setEmailVerificationPage,
    setSetPasswordPage,
    setSuccessChangePasswordPage
  }
};
