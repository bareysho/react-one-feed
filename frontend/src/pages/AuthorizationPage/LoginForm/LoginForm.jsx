import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AuthorizationForm, Input } from 'components';
import { login } from 'actions/auth';
import { onlyLatin, required } from 'validators/baseControlValidators';
import { getAuth } from 'selectors/auth';

import { loginErrorMapper } from './loginErrorMapper';

import './LoginForm.scss';

export const LoginForm = ({ backMethod }) => {
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
      isLoading={isLoading}
      backMethod={backMethod}
      submitErrorMapper={loginErrorMapper}
    >
      <Input
        name="username"
        label={t('common.fields.username')}
        validators={[required, onlyLatin]}
        maxLength={32}
      />
      <Input
        name="password"
        type="password"
        className="password"
        label={t('common.fields.password')}
        validators={[required]}
        maxLength={64}
      />
    </AuthorizationForm>
  );
};

LoginForm.propTypes = {
  backMethod: PropTypes.func,
};

LoginForm.defaultProps = {
  backMethod: undefined,
};
