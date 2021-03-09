import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { AuthorizationForm, CodeVerificationInfo, Input } from 'components';
import { required, validateEmail } from 'validators/baseControlValidators';
import { requestEmailCode } from 'actions/auth';
import { useTranslation } from 'react-i18next';
import { getAuth } from 'selectors/auth';
import { requestRecoveryCodeErrorMapper } from 'errorMappers/requestRecoveryCodeErrorMapper';
import { REQUESTED_OTP_EMAIL } from 'constants/localStorageItem';
import { EMAIL_CODE_TYPE } from 'constants/emailCodeType';

export const RequestRecoveryCodeForm = ({ backMethod, setVerificationMode, startTimer, timeLeft }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading } = useSelector(getAuth);

  const onSubmit = useCallback(
    (credentials) => dispatch(requestEmailCode({ ...credentials, type: EMAIL_CODE_TYPE.passwordRecovery })),
    [dispatch],
  );

  const onSuccessCallback = useCallback(({ email }) => {
    localStorage.setItem(REQUESTED_OTP_EMAIL, email);
    startTimer();
    setVerificationMode();
  }, [setVerificationMode, startTimer]);

  const isTimerActive = useMemo(() => Boolean(timeLeft), [timeLeft]);

  return (
    <AuthorizationForm
      onSubmit={onSubmit}
      submitActionTitle={t('common.buttons.send')}
      backMethod={backMethod}
      backActionTitle={t('common.buttons.back')}
      formTitle={t('pages.authorizationForm.requestRecoveryCodeForm.title')}
      submitErrorMapper={requestRecoveryCodeErrorMapper}
      isLoading={isLoading}
      submitButtonDisabled={isTimerActive}
      className="verify-recovery-email"
      successSubmitCallback={onSuccessCallback}
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
  setVerificationMode: PropTypes.func,
  startTimer: PropTypes.func,
  timeLeft: PropTypes.number,
};
