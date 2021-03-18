import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'actions/auth';
import { NavigationService } from 'navigation';
import socket from 'api/socket';
import { store } from 'store';
import { fetchLinkedAccount, getLinkedAccounts } from 'actions/linkedAccounts';
import { getLinkedAccountsSelector } from 'selectors/linkedAccounts';
import { Spinner } from 'components';
import { AccountCard } from 'components/AccountCard/AccountCard';
import { LinkEpnAccountModal } from 'pages/Home/LinkEpnAccountModal/LinkEpnAccountModal';
import { LinkShorterForm } from 'pages/Home/LinkShorterForm/LinkShorterForm';
import { LinkYouTubeAccount } from 'pages/Home/LinkYouTubeAccount/LinkYouTubeAccount';

import './home.scss';

// eslint-disable-next-line react/prop-types
socket.on('joined', () => {
  store.dispatch(getLinkedAccounts());
});

export const NavigationBar = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);

  const { linkedAccounts, linkedAccountsIds = [] } = useSelector(getLinkedAccountsSelector);

  const { username } = user || {};

  const handleLogout = useCallback(async () => {
    await dispatch(logout());

    NavigationService.navigateToIndex();
  }, [dispatch]);

  const UserNav = (
    <NavDropdown title={isLoading ? <div className="auth-spinner"><Spinner /></div> : username} id="basic-nav-dropdown">
      <NavDropdown.Item onClick={handleLogout}>Выход</NavDropdown.Item>
    </NavDropdown>
  );

  useEffect(() => {
    dispatch(getLinkedAccounts());
  }, [dispatch]);

  useEffect(() => {
    linkedAccountsIds.forEach((linkedAccountId) => dispatch(fetchLinkedAccount(linkedAccountId)));
  }, [dispatch, linkedAccountsIds]);

  return (
    <div className="home-page">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>React Authentication</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" />
            <Nav>
              {UserNav}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content">
        <div>{t('pages.home.linkedAccounts')}</div>
        <div className="section accounts-container">
          {Object.entries(linkedAccounts).map(([id, linkedAccount]) => (
            <AccountCard key={id} linkedAccount={linkedAccount} id={id} />
          ))}
        </div>
        <div>{t('pages.home.linkAccounts')}</div>
        <div className="section link-accounts">
          <LinkYouTubeAccount />
          <LinkEpnAccountModal />
        </div>
        <div>{t('pages.home.actions')}</div>
        <div className="section actions">
          <LinkShorterForm />
        </div>
      </div>
    </div>
  );
};
