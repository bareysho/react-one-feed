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

import './LoginForm.scss';
import { Input } from 'components';

export const LoginForm = ({ backMethod }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isFetch } = useSelector(getAuth);

  const onSubmit = useCallback((credentials) => { dispatch(login(credentials)); }, [dispatch]);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isFetch}>
            <Input
              name="username"
              label={t('common.fields.username')}
            />
            <Input
              name="password"
              type="password"
              label={t('common.fields.password')}
            />
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
          </fieldset>
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