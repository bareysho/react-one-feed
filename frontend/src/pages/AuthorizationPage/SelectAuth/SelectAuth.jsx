import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Button } from 'components';
import { BUTTON_COLOR_TYPE } from 'constants/buttonColorType';

export const SelectAuth = ({ setRegistrationPage, setLoginPage }) => {
  const { t } = useTranslation();

  return (
    <>
      <Button
        title={t('common.buttons.registration')}
        colorType={BUTTON_COLOR_TYPE.outlineBrand}
        onClick={setRegistrationPage}
      />
      <Button
        title={t('common.buttons.login')}
        colorType={BUTTON_COLOR_TYPE.brand}
        onClick={setLoginPage}
      />
      <hr />
      <Button
        title={t('common.buttons.exploreFirst')}
        to="/explore"
        colorType={BUTTON_COLOR_TYPE.brandSecondary}
      />
    </>
  );
};

SelectAuth.propTypes = {
  setRegistrationPage: PropTypes.func,
  setLoginPage: PropTypes.func,
};
