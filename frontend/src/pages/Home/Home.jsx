import React, { useCallback } from 'react';
import { Navbar,
  Container,
  Nav,
  NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from 'actions/auth';
import { NavigationService } from 'navigation';
import { Spinner } from 'components';

import './home.scss';

export const NavigationBar = () => {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);

  const { username } = user || {};

  const handleLogout = useCallback(async () => {
    await dispatch(logout());

    NavigationService.navigateToIndex();
  }, [dispatch]);

  const UserNav = (
    <NavDropdown title={isLoading ? <Spinner /> : username} id="basic-nav-dropdown">
      <NavDropdown.Item onClick={handleLogout}>Выход</NavDropdown.Item>
    </NavDropdown>
  );

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
    </div>
  );
};
