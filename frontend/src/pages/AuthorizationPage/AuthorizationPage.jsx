import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LOGIN_PAGE_MODE } from '../../constants/loginPageMode';

import { LoginForm } from './LoginForm';

import './AuthorizationPage.scss';

export const AuthorizationPage = () => {
  const { t } = useTranslation();

  const [pageMode, setPageMode] = useState(LOGIN_PAGE_MODE.buttons);

  const setLoginMode = useCallback(() => setPageMode(LOGIN_PAGE_MODE.login), []);

  const setSignUpMode = useCallback(() => setPageMode(LOGIN_PAGE_MODE.signUp), []);

  const setButtonsMode = useCallback(() => setPageMode(LOGIN_PAGE_MODE.buttons), []);

  return (
    <div className="home">
      <div className="row h-100">
        <div className="col-8 d-none d-md-flex flex-column justify-content-end pl-5 home__left" />
        <div className="col-12 col-md-4 bg-white home__right d-flex flex-column justify-content-center">
          <div className="row pr-md-3">
            <div className="col-12 px-4">
              <div className="card border-0 rounded-0">
                <div className="card-body">
                  {pageMode === LOGIN_PAGE_MODE.buttons && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-brand btn-block rounded-pill"
                      onClick={setSignUpMode}
                    >
                      {t('common.buttons.registration')}
                    </button>
                    <button
                      type="button"
                      className="btn btn-brand btn-block text-light rounded-pill"
                      onClick={setLoginMode}
                    >
                      {t('common.buttons.login')}
                    </button>
                    <hr />
                    <Link
                      to="/explore"
                      className="btn btn-brand-secondary btn-block text-white rounded-pill"
                    >
                      {t('common.buttons.exploreFirst')}
                    </Link>
                  </div>
                  )}
                  {pageMode === LOGIN_PAGE_MODE.login && <LoginForm backMethod={setButtonsMode} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
