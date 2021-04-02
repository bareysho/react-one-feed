import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AuthorizationForm, Control, Input } from 'components';
import { login } from 'actions/auth';
import { onlyLatin, required } from 'validators/baseControlValidators';
import { getAuth } from 'selectors/auth';

import { loginErrorMapper } from 'errorMappers/loginErrorMapper';
import { Button } from 'react-bootstrap';

export const LoginForm = ({ setPreviousPage, setPasswordRecoveryPage }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading } = useSelector(getAuth);

  const onSubmit = useCallback((credentials) => dispatch(login(credentials)), [dispatch]);

  return (
    <AuthorizationForm
      onSubmit={onSubmit}
      className="login"
      submitActionTitle={t('common.buttons.login')}
      backActionTitle={t('common.buttons.back')}
      formTitle={t('pages.authorizationForm.loginForm.title')}
      isLoading={isLoading}
      backMethod={setPreviousPage}
      submitErrorMapper={loginErrorMapper}
    >
      <Control
        name="username"
        label={t('common.fields.username')}
        validators={[required, onlyLatin]}
        maxLength={32}
        component={Input}
      />
      <Control
        name="password"
        type="password"
        className="mb-1"
        label={t('common.fields.password')}
        validators={[required]}
        maxLength={64}
        component={Input}
      />
      <Button
        onClick={setPasswordRecoveryPage}
        className="auto-width p-0 d-block"
        variant="link"
      >
        <small>{t('common.buttons.forgetPassword')}</small>
      </Button>
    </AuthorizationForm>
  );
};

LoginForm.propTypes = {
  setPreviousPage: PropTypes.func,
  setPasswordRecoveryPage: PropTypes.func,
};

LoginForm.defaultProps = {
  setPreviousPage: undefined,
  setPasswordRecoveryPage: undefined,
};
