import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { getAuth } from 'selectors/auth';
import { UserInfo } from 'components/UserInfo/UserInfo';
import { ChangePassword } from 'pages/Settings/ChangePassword/ChangePassword';
import { ChangeEmail } from 'pages/Settings/ChangeEmail/ChangeEmail';

import './Settings.scss';

export const Settings = () => {
  const { t } = useTranslation();

  const { user } = useSelector(getAuth);

  return (
    <div className="page-container settings">
      <h1 className="title mb-5">{t('pages.settings.title')}</h1>
      <div className="content">
        {user && (
          <Card className="profile">
            <Card.Header>
              <span><b>{t('pages.settings.profileInfo.title')}</b></span>
            </Card.Header>
            <Card.Body>
              <UserInfo title="Имя пользователя" value={user.username} />
              <UserInfo title="E-mail" value={user.email} />
            </Card.Body>
          </Card>
        )}
        <div className="actions">
          <ChangePassword />
          <br />
          <br />
          <ChangeEmail />
        </div>
      </div>
    </div>
  );
};
