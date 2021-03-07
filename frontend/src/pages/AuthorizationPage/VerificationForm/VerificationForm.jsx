import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AuthorizationForm, Input } from 'components';
import { minLength, required } from 'validators/baseControlValidators';
import { useTranslation } from 'react-i18next';
import { validateOtp } from 'actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'selectors/auth';
import { OTP_CODE_MASK } from 'constants/mask';

import { verificationErrorsMapper } from './verificationErrorsMapper';

import './VerificationForm.scss';

export const VerificationForm = ({ backMethod }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading, user } = useSelector(getAuth);
  const { id } = user;

  const onSubmit = useCallback((credentials) => dispatch(validateOtp({ ...credentials, id })), [dispatch, id]);

  return (
    <AuthorizationForm
      onSubmit={onSubmit}
      className="verification"
      submitActionTitle={t('common.buttons.approve')}
      backActionTitle={t('common.buttons.back')}
      isLoading={isLoading}
      backMethod={backMethod}
      submitErrorMapper={verificationErrorsMapper}
    >
      <Input
        name="otp"
        mask={OTP_CODE_MASK}
        validators={[required, minLength(6)]}
        label={t('common.fields.otp')}
      />
    </AuthorizationForm>
  );
};

VerificationForm.propTypes = {
  backMethod: PropTypes.func,
};

VerificationForm.defaultProps = {
  backMethod: undefined,
};
