import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES_PATHS } from 'constants/routesPaths';
import { useDispatch } from 'react-redux';

import { logout } from 'actions/auth';
import { FaCog, FaHome, FaSignOutAlt } from 'react-icons/all';

import './Navbar.scss';

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <div className="navbar-cs bg-light d-flex flex-column justify-content-between">
        <div className="d-flex flex-row flex-md-column">
          <NavLink
            to={`${ROUTES_PATHS.application}${ROUTES_PATHS.home}`}
            className="navbar-cs__button"
            activeClassName="bg-brand text-white"
            data-balloon-pos="left"
            aria-label="Home"
            data-balloon-blunt
          >
            <p className="text-center my-0"><FaHome size={32} /></p>
          </NavLink>
          <NavLink
            to={`${ROUTES_PATHS.application}${ROUTES_PATHS.settings}`}
            className="navbar-cs__button"
            activeClassName="bg-brand text-white"
            data-balloon-pos="left"
            aria-label="Settings"
            data-balloon-blunt
          >
            <p className="text-center my-0"><FaCog size={32} /></p>
          </NavLink>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            className="navbar-cs__button"
            onClick={handleLogout}
            data-balloon-pos="left"
            aria-label="Logout"
          >
            <p className="text-center my-0"><FaSignOutAlt size={32} /></p>
          </div>
        </div>
      </div>
    </>
  );
};
