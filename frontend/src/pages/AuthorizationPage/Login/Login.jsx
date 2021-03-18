import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { RecoveryPassword } from './RecoveryPassword/RecoveryPassword';
import { LoginForm } from './LoginForm';

const LOGIN_PAGE = {
  login: 'login',
  passwordRecovery: 'passwordRecovery',
};

export const Login = ({ setPreviousPage, isLoading }) => {
  const [loginPage, setLoginPage] = useState(LOGIN_PAGE.login);

  const setLoginPageCallback = useCallback(() => setLoginPage(LOGIN_PAGE.login), []);
  const setPasswordRecoveryPage = useCallback(() => setLoginPage(LOGIN_PAGE.passwordRecovery), []);

  return (
    <>
      {loginPage === LOGIN_PAGE.login && (
        <LoginForm setPreviousPage={setPreviousPage} setPasswordRecoveryPage={setPasswordRecoveryPage} />
      )}
      {loginPage === LOGIN_PAGE.passwordRecovery && (
        <RecoveryPassword
          setPreviousPage={setLoginPageCallback}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

Login.propTypes = {
  setPreviousPage: PropTypes.func,
  isLoading: PropTypes.bool,
};
