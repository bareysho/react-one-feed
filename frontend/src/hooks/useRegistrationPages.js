import { useCallback, useState } from 'react';

export const REGISTRATION_PAGE = {
  requestRegistration: 'requestRegistration',
  verificationRegistration: 'verificationRegistration',
};

export const useRegistrationPages = (initialPage, onPageModeChange) => {
  const [registrationPageMode, setRegistrationPageModeMode] = useState(initialPage);

  const handleChange = useCallback((pageMode) => {
    if (onPageModeChange) onPageModeChange(pageMode);

    setRegistrationPageModeMode(pageMode);
  }, [])

  const setRequestRegistrationPage = useCallback(() => handleChange(REGISTRATION_PAGE.requestRegistration), []);
  const setVerificationRegistrationPage = useCallback(() => handleChange(REGISTRATION_PAGE.verificationRegistration), []);

  return {
    registrationPageMode,
    setVerificationRegistrationPage,
    setRequestRegistrationPage,
  }
};
