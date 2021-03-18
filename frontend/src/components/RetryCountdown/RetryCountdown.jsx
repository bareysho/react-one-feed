import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BUTTON_TYPE } from 'constants/buttonType';
import { requestEmailCode } from 'actions/emailToken';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

export const RetryCountdown = ({ startTimer, timeLeft, changeEmailCallback, email, type }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onResendCallback = useCallback(async () => {
    await dispatch(requestEmailCode({ email, type }));
  }, [dispatch, email, type]);

  const resendCallback = useCallback(async () => {
    startTimer();

    await onResendCallback();
  }, [onResendCallback, startTimer]);

  return (
    <>
      <div className="pb-3">
        {timeLeft ? <small>{t('components.retryCountdown.retryIn', { timeLeft })}</small>
          : (
            <Button
              type="button"
              className="auto-width p-0"
              onClick={resendCallback}
              variant="link"
            >
              <small>{t('common.buttons.retrySending')}</small>
            </Button>
          )}
      </div>
      {email && (
        <div className="mb-3"><small>{t('components.retryCountdown.sentTo', { recoveryEmail: email })}</small></div>)}
      {changeEmailCallback && (
        <Button
          type={BUTTON_TYPE.button}
          block
          disabled={Boolean(timeLeft)}
          onClick={changeEmailCallback}
          variant="outline-primary"
          className="fullwidth"
        >
          {t('common.buttons.changeEmail')}
        </Button>
      )}
    </>
  );
};

RetryCountdown.propTypes = {
  startTimer: PropTypes.func,
  type: PropTypes.string,
  email: PropTypes.string,
  timeLeft: PropTypes.number,
  changeEmailCallback: PropTypes.func,
};
