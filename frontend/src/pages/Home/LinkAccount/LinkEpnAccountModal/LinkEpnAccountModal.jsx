import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';

import { LinkEpnAccountForm } from './LinkEpnAccountForm/LinkEpnAccountForm';

import './LinkEpnAccountModal.scss';

export const LinkEpnAccountModal = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Button onClick={showModal}>{t('components.linkEpnAccountModal.action')}</Button>
      <Modal className="link-epn-account-modal" centered show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{t('components.linkEpnAccountModal.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LinkEpnAccountForm backMethod={hideModal} />
        </Modal.Body>
      </Modal>
    </>
  );
};
