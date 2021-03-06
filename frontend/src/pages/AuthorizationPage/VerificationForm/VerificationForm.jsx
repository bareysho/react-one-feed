import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Spinner } from 'components';
import { OTP_CODE_MASK } from 'constants/mask';
import { minLength, required } from 'validators/baseControlValidators';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-final-form';
import { registrationPasswordsValidate } from 'validators/authorizationPageValidators';
import { validateOtp } from 'actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'selectors/auth';
import { BUTTON_TYPE } from 'constants/buttonType';
import { BUTTON_COLOR_TYPE } from 'constants/buttonColorType';

import { handleSubmitError } from './helper';

import './VerificationForm.scss';

export const VerificationForm = ({ backMethod }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading, user } = useSelector(getAuth);
  const { username } = user;

  const onSubmit = useCallback(async (credentials) => {
    const response = await dispatch(validateOtp({ ...credentials, username }));

    return handleSubmitError(response);
  }, [dispatch, username]);

  return (
    <Form
      onSubmit={onSubmit}
      validate={registrationPasswordsValidate}
      render={({ handleSubmit }) => (
        <form className="verification-form" onSubmit={handleSubmit}>
          <fieldset className="field-set" disabled={isLoading}>
            {isLoading && (
              <Spinner />
            )}
            <Input
              name="otp"
              mask={OTP_CODE_MASK}
              validators={[required, minLength(6)]}
              label={t('common.fields.otp')}
            />
          </fieldset>
          <Button
            type={BUTTON_TYPE.submit}
            title={t('common.buttons.approve')}
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

VerificationForm.propTypes = {
  backMethod: PropTypes.func,
};

VerificationForm.defaultProps = {
  backMethod: undefined,
};
