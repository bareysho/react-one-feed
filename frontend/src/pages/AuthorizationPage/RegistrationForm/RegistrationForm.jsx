import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { login } from 'actions/auth';
import { getAuth } from 'selectors/auth';
import { Button } from 'components/controls/Button/Button';
import { BUTTON_TYPE } from 'constants/buttonType';
import { BUTTON_COLOR_TYPE } from 'constants/buttonColorType';
import { Input } from 'components';
import { minLength, onlyLatin, required, validateEmail } from 'validators/baseControlValidators';
import { registrationPasswordsValidate } from 'validators/authorizationPageValidators';

export const RegistrationForm = ({ backMethod }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isFetch } = useSelector(getAuth);

  const onSubmit = useCallback((credentials) => { dispatch(login(credentials)); }, [dispatch]);

  return (
    <Form
      onSubmit={onSubmit}
      validate={registrationPasswordsValidate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isFetch}>
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
            <br />
            <Button
              type={BUTTON_TYPE.submit}
              title={t('common.buttons.registration')}
            />
            {backMethod && (
              <Button
                type={BUTTON_TYPE.button}
                title={t('common.buttons.back')}
                colorType={BUTTON_COLOR_TYPE.brandSecondary}
                onClick={backMethod}
              />
            )}
          </fieldset>
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
