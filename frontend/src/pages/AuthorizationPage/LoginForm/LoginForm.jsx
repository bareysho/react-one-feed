import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { login } from 'actions/auth';

import { Input } from 'components';
import { Button } from 'components/controls/Button/Button';
import { BUTTON_TYPE } from 'constants/buttonType';
import { BUTTON_COLOR_TYPE } from 'constants/buttonColorType';
import { onlyLatin, required } from 'validators/baseControlValidators';
import { getAuth } from 'selectors/auth';

import { handleSubmitError } from './helper';

import './LoginForm.scss';

export const LoginForm = ({ backMethod }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading } = useSelector(getAuth);

  const onSubmit = useCallback(async (credentials) => {
    const response = await dispatch(login(credentials));

    return handleSubmitError(response);
  }, [dispatch]);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ submitError, handleSubmit }) => (
        <form className="login-form" onSubmit={handleSubmit}>
          <fieldset className="field-set" disabled={isLoading}>
            {isLoading && (
              <div className="spinner-wrapper">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
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
            {submitError && <small className="text-danger">{submitError}</small>}
          </fieldset>
          <br />
          <Button
            type={BUTTON_TYPE.submit}
            title={t('common.buttons.login')}
          />
          {backMethod && (
          <Button
            type={BUTTON_TYPE.button}
            title={t('common.buttons.back')}
            colorType={BUTTON_COLOR_TYPE.brandSecondary}
            onClick={backMethod}
          />
          )}
        </form>
      )}
    />
  );
};

LoginForm.propTypes = {
  backMethod: PropTypes.func,
};

LoginForm.defaultProps = {
  backMethod: undefined,
};
