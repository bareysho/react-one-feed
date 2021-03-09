import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Controls/Button/Button';
import { useCountdown } from 'hooks/useCountdown';
import { LOGIN_PAGE_MODE } from 'constants/loginPageMode';
import { BUTTON_COLOR_TYPE } from 'constants/buttonColorType';
import { OTP_TIMER_LIMIT } from 'constants/uiConstant';
import { RECOVERY_CODE_RESEND_TIMER } from 'constants/timer';
import { AUTHORIZATION_PAGE_MODE } from 'constants/localStorageItem';

import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { VerificationForm } from './VerificationForm';
import { RequestRecoveryCodeForm } from './RequestRecoveryCodeForm';
import { SetPasswordForm } from './SetPasswordForm';
import { SuccessForm } from './SuccessForm';

import './AuthorizationPage.scss';

export const AuthorizationPage = () => {
  const { t } = useTranslation();

  const { start, time } = useCountdown(OTP_TIMER_LIMIT, RECOVERY_CODE_RESEND_TIMER);

  const [pageMode, setPageMode] = useState(
    localStorage.getItem(AUTHORIZATION_PAGE_MODE) || LOGIN_PAGE_MODE.selectAuthMenu,
  );

  const handleSetPageMode = useCallback((nextPageMode) => {
    setPageMode(nextPageMode);
    localStorage.setItem(AUTHORIZATION_PAGE_MODE, nextPageMode);
  }, []);

  const setLoginMode = useCallback(() => handleSetPageMode(LOGIN_PAGE_MODE.login), [handleSetPageMode]);

  const setRegistrationMode = useCallback(() => handleSetPageMode(LOGIN_PAGE_MODE.registration), [handleSetPageMode]);

  const setSelectAuthMenu = useCallback(() => handleSetPageMode(LOGIN_PAGE_MODE.selectAuthMenu), [handleSetPageMode]);

  const setVerificationMode = useCallback(() => handleSetPageMode(LOGIN_PAGE_MODE.verification), [handleSetPageMode]);

  const setRecoveryVerificationMode = useCallback(() => handleSetPageMode(LOGIN_PAGE_MODE.recoveryByEmail),
    [handleSetPageMode]);

  const setSetPasswordMode = useCallback(() => handleSetPageMode(LOGIN_PAGE_MODE.setPassword), [handleSetPageMode]);

  const setSuccessMode = useCallback(() => handleSetPageMode(LOGIN_PAGE_MODE.success), [handleSetPageMode]);

  return (
    <div className="authorization">
      <div className="main row">
        <div className="col-md-7 col-lg-8 col-xl-9 column left">
          <h1 className="text-white ml-4">{t('common.title')}</h1>
        </div>
        <div className="col-12 col-md-5 col-lg-4 col-xl-3 column right">
          <div className="row pr-md-3">
            <div className="col-12 px-4">
              <div className="card">
                <div className="card-body">
                  {pageMode === LOGIN_PAGE_MODE.selectAuthMenu && (
                  <div>
                    <Button
                      title={t('common.buttons.registration')}
                      colorType={BUTTON_COLOR_TYPE.outlineBrand}
                      onClick={setRegistrationMode}
                    />
                    <Button
                      title={t('common.buttons.login')}
                      colorType={BUTTON_COLOR_TYPE.brand}
                      onClick={setLoginMode}
                    />
                    <hr />
                    <Button
                      title={t('common.buttons.exploreFirst')}
                      to="/explore"
                      colorType={BUTTON_COLOR_TYPE.brandSecondary}
                    />
                  </div>
                  )}
                  {pageMode === LOGIN_PAGE_MODE.verification && (
                  <VerificationForm
                    startTimer={start}
                    timeLeft={time}
                    setRegistrationMode={setRegistrationMode}
                    setSelectAuthMenu={setSelectAuthMenu}
                  />
                  )}
                  {pageMode === LOGIN_PAGE_MODE.setPassword
                    && (
                    <SetPasswordForm
                      backMethod={setLoginMode}
                      setSuccessMode={setSuccessMode}
                      setRecoveryVerificationMode={setRecoveryVerificationMode}
                      startTimer={start}
                      timeLeft={time}
                    />
                    )}
                  {pageMode === LOGIN_PAGE_MODE.login
                    && <LoginForm backMethod={setSelectAuthMenu} forgetCallback={setRecoveryVerificationMode} />}
                  {pageMode === LOGIN_PAGE_MODE.registration
                    && (
                    <RegistrationForm
                      startTimer={start}
                      timeLeft={time}
                      backMethod={setSelectAuthMenu}
                      setVerificationMode={setVerificationMode}
                    />
                    )}
                  {pageMode === LOGIN_PAGE_MODE.recoveryByEmail
                    && (
                    <RequestRecoveryCodeForm
                      backMethod={setLoginMode}
                      timeLeft={time}
                      startTimer={start}
                      setVerificationMode={setSetPasswordMode}
                    />
                    )}
                  {pageMode === LOGIN_PAGE_MODE.success
                    && <SuccessForm backMethod={setLoginMode} setLoginMode={setLoginMode} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
