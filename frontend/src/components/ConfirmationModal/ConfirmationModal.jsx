import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

import i18n from 'resources/i18n';

import './ConfirmationModal.scss';

export const ConfirmationModal = ({
  children,
  confirmButtonTitle,
  onConfirmCallback,
  declineButtonTitle,
  onDeclineCallback,
  modalTitle,
  description,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (onConfirmCallback) onConfirmCallback();

    hideModal();
  }, [hideModal, onConfirmCallback]);

  const handleDecline = useCallback(() => {
    if (onDeclineCallback) onDeclineCallback();

    hideModal();
  }, [hideModal, onDeclineCallback]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={showModal} {...rest}>
        {children}
      </div>
      <Modal className="confirmation-modal" centered show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div><p>{description}</p></div>
        </Modal.Body>
        <Modal.Footer>
          <div className="action-buttons">
            <Button
              className="cancel auto-width"
              variant="secondary"
              onClick={handleDecline}
            >
              {declineButtonTitle}
            </Button>
            <Button className="auto-width" variant="primary" onClick={handleConfirm}>{confirmButtonTitle}</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ConfirmationModal.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  className: PropTypes.string,
  confirmButtonTitle: PropTypes.string,
  declineButtonTitle: PropTypes.string,
  onConfirmCallback: PropTypes.func,
  onDeclineCallback: PropTypes.func,
  modalTitle: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  confirmButtonTitle: i18n.t('common.buttons.approve'),
  declineButtonTitle: i18n.t('common.buttons.cancel'),
  onConfirmCallback: () => {},
  onDeclineCallback: () => {},
};
