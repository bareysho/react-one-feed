import React, { useCallback } from 'react';
import { Navbar,
  Container,
  Nav,
  NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from 'actions/auth';
import { NavigationService } from 'navigation';

export const NavigationBar = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = useCallback(async () => {
    await dispatch(logout());

    NavigationService.redirectTo('/');
  }, [dispatch]);

  const GuestNav = (
    <>
      <LinkContainer to="/login">
        <Nav.Link>Login</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/register">
        <Nav.Link>Register</Nav.Link>
      </LinkContainer>
    </>
  );

  const UserNav = (
    <NavDropdown title="Admin" id="basic-nav-dropdown">
      <LinkContainer to="/admin">
        <NavDropdown.Item>admin</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Divider />
      <LinkContainer to="/admin">
        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
      </LinkContainer>
    </NavDropdown>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>React Authentication</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {isAuthenticated ? UserNav : GuestNav }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
