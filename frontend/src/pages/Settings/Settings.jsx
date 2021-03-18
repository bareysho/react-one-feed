import React from 'react';
import { Card } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { getAuth } from 'selectors/auth';
import { UserInfo } from 'components/UserInfo/UserInfo';
import { ChangePassword } from 'pages/Settings/ChangePassword/ChangePassword';
import { ChangeEmail } from 'pages/Settings/ChangeEmail/ChangeEmail';

import './Settings.scss';

export const Settings = () => {
  const { user } = useSelector(getAuth);

  return (
    <div className="settings">
      <h1 className="title mb-5">Настройки</h1>
      <div className="content">
        {user && (
          <Card className="profile">
            <Card.Header>
              <span><b>Информация о профиле</b></span>
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
          <ChangeEmail />
        </div>
      </div>
    </div>
  );
};
