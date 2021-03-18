import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaSignOutAlt } from 'react-icons/all';
import { logout } from 'actions/auth';
import { useDispatch } from 'react-redux';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { useTranslation } from 'react-i18next';

export const LogoutModal = ({ balloonPos }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <ConfirmationModal
      modalTitle={t('components.logoutModal.title')}
      onConfirmCallback={handleLogout}
      data-balloon-pos={balloonPos}
      aria-label={t('navbar.areas.logout')}
      description={t('components.logoutModal.description')}
      className="navbar-cs__button"
    >
      <p className="text-center my-0"><FaSignOutAlt size={32} /></p>
    </ConfirmationModal>
  );
};

LogoutModal.propTypes = {
  balloonPos: PropTypes.string,
};
