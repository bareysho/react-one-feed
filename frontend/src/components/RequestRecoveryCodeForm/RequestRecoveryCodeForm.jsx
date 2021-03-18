import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { AuthorizationForm, CodeVerificationInfo, Input } from 'components/index';
import { required, validateEmail } from 'validators/baseControlValidators';
import { requestEmailCode } from 'actions/emailToken';
import { useTranslation } from 'react-i18next';
import { requestRecoveryCodeErrorMapper } from 'errorMappers/requestRecoveryCodeErrorMapper';

export const RequestRecoveryCodeForm = ({
  backMethod, nextStepCallback, timeLeft, type, requestFormTitle, isLoading,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (credentials) => dispatch(requestEmailCode({ ...credentials, type })),
    [dispatch, type],
  );

  const isTimerActive = useMemo(() => Boolean(timeLeft), [timeLeft]);

  return (
    <AuthorizationForm
      onSubmit={onSubmit}
      submitActionTitle={t('common.buttons.send')}
      backMethod={backMethod}
      backActionTitle={t('common.buttons.back')}
      formTitle={requestFormTitle}
      submitErrorMapper={requestRecoveryCodeErrorMapper}
      isLoading={isLoading}
      submitButtonDisabled={isTimerActive}
      className="verify-recovery-email"
      successSubmitCallback={nextStepCallback}
    >
      <Input
        name="email"
        type="email"
        className="mb-1"
        validators={[required, validateEmail]}
        label={t('common.fields.email')}
        maxLength={64}
      />
      <CodeVerificationInfo timeLeft={timeLeft} />
    </AuthorizationForm>
  );
};

RequestRecoveryCodeForm.propTypes = {
  backMethod: PropTypes.func,
  nextStepCallback: PropTypes.func,
  timeLeft: PropTypes.number,
  isLoading: PropTypes.bool,
  requestFormTitle: PropTypes.number,
  type: PropTypes.string,
};
