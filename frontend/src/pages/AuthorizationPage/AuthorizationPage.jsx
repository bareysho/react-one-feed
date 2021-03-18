import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { LOGIN_PAGE_MODE } from 'constants/loginPageMode';
import { AUTHORIZATION_PAGE_MODE } from 'constants/localStorageItem';
import { getAuth } from 'selectors/auth';

import { Login } from './Login/Login';
import { SelectAuth } from './SelectAuth/SelectAuth';
import { Registration } from './Registration/Registration';

import './AuthorizationPage.scss';

export const AuthorizationPage = () => {
  const { t } = useTranslation();

  const { isLoading } = useSelector(getAuth);

  const [pageMode, setPageMode] = useState(
    localStorage.getItem(AUTHORIZATION_PAGE_MODE) || LOGIN_PAGE_MODE.selectAuthMenu,
  );

  const handleSetPageMode = useCallback((nextPageMode) => {
    setPageMode(nextPageMode);
    localStorage.setItem(AUTHORIZATION_PAGE_MODE, nextPageMode);
  }, []);

  const setLoginPage = useCallback(() => handleSetPageMode(LOGIN_PAGE_MODE.login), [handleSetPageMode]);

  const setRegistrationPage = useCallback(() => handleSetPageMode(LOGIN_PAGE_MODE.registration), [handleSetPageMode]);

  const setSelectAuthPage = useCallback(() => handleSetPageMode(LOGIN_PAGE_MODE.selectAuthMenu), [handleSetPageMode]);

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
                    <SelectAuth setLoginPage={setLoginPage} setRegistrationPage={setRegistrationPage} />
                  )}
                  {pageMode === LOGIN_PAGE_MODE.login && (
                    <Login setPreviousPage={setSelectAuthPage} isLoading={isLoading} />
                  )}
                  {pageMode === LOGIN_PAGE_MODE.registration && (
                    <Registration setPreviousPage={setSelectAuthPage} isLoading={isLoading} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
