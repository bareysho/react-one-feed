import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Input, Spinner, Button } from 'components';
import { registration } from 'actions/auth';
import { getAuth } from 'selectors/auth';
import { BUTTON_TYPE } from 'constants/buttonType';
import { BUTTON_COLOR_TYPE } from 'constants/buttonColorType';
import { minLength, onlyLatin, required, validateEmail } from 'validators/baseControlValidators';
import { registrationPasswordsValidate } from 'validators/authorizationPageValidators';

import { handleSubmitError } from './helper';

import './RegistrationForm.scss';

export const RegistrationForm = ({ backMethod }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading } = useSelector(getAuth);

  const onSubmit = useCallback(async (credentials) => {
    const response = await dispatch(registration(credentials));

    return handleSubmitError(response);
  }, [dispatch]);

  return (
    <Form
      onSubmit={onSubmit}
      validate={registrationPasswordsValidate}
      render={({ handleSubmit }) => (
        <form className="registration-form" onSubmit={handleSubmit}>
          <fieldset className="field-set" disabled={isLoading}>
            {isLoading && (
              <Spinner />
            )}
            <Input
              name="username"
              validators={[required, onlyLatin, minLength(4)]}
              label={t('common.fields.username')}
              maxLength={32}
            />
            <Input
              name="email"
              type="email"
              validators={[required, validateEmail]}
              label={t('common.fields.email')}
              maxLength={64}
            />
            <Input
              name="password"
              type="password"
              validators={[required, minLength(6)]}
              label={t('common.fields.password')}
              maxLength={64}
            />
            <Input
              name="confirmationPassword"
              type="password"
              validators={[required, minLength(6)]}
              label={t('common.fields.confirmationPassword')}
              maxLength={64}
            />
          </fieldset>
          <br />
          <Button
            type={BUTTON_TYPE.submit}
            title={t('common.buttons.registration')}
            disabled={isLoading}
          />
          {backMethod && (
            <Button
              type={BUTTON_TYPE.button}
              title={t('common.buttons.back')}
              colorType={BUTTON_COLOR_TYPE.brandSecondary}
              onClick={backMethod}
              disabled={isLoading}
            />
          )}
        </form>
      )}
    />
  );
};

RegistrationForm.propTypes = {
  backMethod: PropTypes.func,
};

RegistrationForm.defaultProps = {
  backMethod: undefined,
};
