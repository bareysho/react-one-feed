import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/controls/Button/Button';
import { LOGIN_PAGE_MODE } from 'constants/loginPageMode';
import { BUTTON_COLOR_TYPE } from 'constants/buttonColorType';

import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';

import './AuthorizationPage.scss';

export const AuthorizationPage = () => {
  const { t } = useTranslation();

  const [pageMode, setPageMode] = useState(LOGIN_PAGE_MODE.selectAuthMenu);

  const setLoginMode = useCallback(() => setPageMode(LOGIN_PAGE_MODE.login), []);

  const setRegistrationMode = useCallback(() => setPageMode(LOGIN_PAGE_MODE.registration), []);

  const setSelectAuthMenu = useCallback(() => setPageMode(LOGIN_PAGE_MODE.selectAuthMenu), []);

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
                  {pageMode === LOGIN_PAGE_MODE.login && <LoginForm backMethod={setSelectAuthMenu} />}
                  {pageMode === LOGIN_PAGE_MODE.registration && <RegistrationForm backMethod={setSelectAuthMenu} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
