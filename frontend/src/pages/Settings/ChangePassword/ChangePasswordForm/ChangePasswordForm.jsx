import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AuthorizationForm, Control, Input } from 'components';
import { onlyLatin, required } from 'validators/baseControlValidators';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from 'actions/userSettings/password';
import { changePasswordErrorMapper } from 'errorMappers/changePasswordErrorMapper';
import { registrationPasswordsValidate } from 'validators/authorizationPageValidators';
import { getChangePasswordLoading } from 'selectors/userSettings';

export const ChangePasswordForm = ({ setSuccessfulState }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isLoading = useSelector(getChangePasswordLoading);

  const handleSubmit = useCallback((credentials) => dispatch(changePassword(credentials)), [dispatch]);

  return (
    <AuthorizationForm
      onSubmit={handleSubmit}
      className="login"
      submitActionTitle={t('common.buttons.save')}
      formTitle={t('pages.authorizationForm.changePasswordForm.title')}
      submitErrorMapper={changePasswordErrorMapper}
      validate={registrationPasswordsValidate}
      isLoading={isLoading}
      successSubmitCallback={setSuccessfulState}
    >
      <Control
        name="currentPassword"
        type="password"
        className="mb-3"
        label={t('common.fields.currentPassword')}
        validators={[required, onlyLatin]}
        maxLength={32}
        component={Input}
      />
      <Control
        name="password"
        type="password"
        className="mb-1"
        label={t('common.fields.newPassword')}
        validators={[required]}
        maxLength={64}
        component={Input}
      />
      <Control
        name="confirmationPassword"
        type="password"
        className="mb-1"
        label={t('common.fields.confirmationPassword')}
        validators={[required]}
        maxLength={64}
        component={Input}
      />
    </AuthorizationForm>
  );
};

ChangePasswordForm.propTypes = {
  setSuccessfulState: PropTypes.func,
};
