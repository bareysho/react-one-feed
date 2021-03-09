import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const CodeVerificationInfo = ({ timeLeft }) => {
  const { t } = useTranslation();

  const isTimerActive = useMemo(() => Boolean(timeLeft), [timeLeft]);

  return (
    <>
      {isTimerActive && (
        <div className="mb-2">
          <small>{t('components.retryCountdownWithoutButton.retryIn', { timeLeft })}</small>
        </div>
      )}
      <small className="mb-2">{t('components.codeVerificationInfo.emailBeSent')}</small>
    </>
  );
};

CodeVerificationInfo.propTypes = {
  timeLeft: PropTypes.number,
};
