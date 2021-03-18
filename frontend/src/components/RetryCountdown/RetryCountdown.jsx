import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/Controls';
import { BUTTON_COLOR_TYPE } from 'constants/buttonColorType';
import { useTranslation } from 'react-i18next';
import { BUTTON_TYPE } from 'constants/buttonType';
import { requestEmailCode } from 'actions/emailToken';
import { useDispatch } from 'react-redux';

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
              title={<small>{t('common.buttons.retrySending')}</small>}
              type="button"
              className="d-block p-0"
              colorType={BUTTON_COLOR_TYPE.link}
              onClick={resendCallback}
              buttonBlock={false}
            />
          )}
      </div>
      {email && (
        <div className="mb-3"><small>{t('components.retryCountdown.sentTo', { recoveryEmail: email })}</small></div>)}
      {changeEmailCallback && (
        <Button
          type={BUTTON_TYPE.button}
          title={t('common.buttons.changeEmail')}
          colorType={BUTTON_COLOR_TYPE.outlineBrand}
          disabled={Boolean(timeLeft)}
          onClick={changeEmailCallback}
        />
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
