import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const SelectAuth = ({ setRegistrationPage, setLoginPage }) => {
  const { t } = useTranslation();

  return (
    <>
      <Button
        block
        variant="outline-primary"
        onClick={setRegistrationPage}
        className="fullwidth"
      >
        {t('common.buttons.registration')}
      </Button>
      <Button
        block
        variant="primary"
        onClick={setLoginPage}
        className="fullwidth"
      >
        {t('common.buttons.login')}
      </Button>
    </>
  );
};

SelectAuth.propTypes = {
  setRegistrationPage: PropTypes.func,
  setLoginPage: PropTypes.func,
};
