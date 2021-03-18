import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ROUTES_PATHS } from 'constants/routesPaths';
import { FaCog, FaHome } from 'react-icons/all';
import { LogoutModal } from 'components/LogoutModal/LogoutModal';
import { useDeviceState } from 'hooks/useDeviceState';

import './Navbar.scss';

export const Navbar = () => {
  const { t } = useTranslation();

  const { isMobile } = useDeviceState();

  const balloonPos = useMemo(() => (isMobile ? 'down' : 'left'), [isMobile]);

  return (
    <>
      <div className="navbar-cs bg-light d-flex flex-column justify-content-between">
        <div className="d-flex flex-row flex-md-column">
          <NavLink
            to={`${ROUTES_PATHS.application}${ROUTES_PATHS.home}`}
            className="navbar-cs__button"
            activeClassName="bg-brand text-white"
            data-balloon-pos={balloonPos}
            aria-label={t('navbar.areas.home')}
            data-balloon-blunt
          >
            <p className="text-center my-0"><FaHome size={32} /></p>
          </NavLink>
          <NavLink
            to={`${ROUTES_PATHS.application}${ROUTES_PATHS.settings}`}
            className="navbar-cs__button"
            activeClassName="bg-brand text-white"
            data-balloon-pos={balloonPos}
            aria-label={t('navbar.areas.settings')}
            data-balloon-blunt
          >
            <p className="text-center my-0"><FaCog size={32} /></p>
          </NavLink>
          <LogoutModal balloonPos={balloonPos} />
        </div>
      </div>
    </>
  );
};
