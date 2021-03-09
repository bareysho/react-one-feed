import React from 'react';
import PropTypes from 'prop-types';
import { AuthorizationForm } from 'components';
import { useTranslation } from 'react-i18next';
import { IoIosCheckmarkCircleOutline } from 'react-icons/all';

import './SuccessForm.scss';

export const SuccessForm = ({ setLoginMode }) => {
  const { t } = useTranslation();

  return (
    <AuthorizationForm
      onSubmit={setLoginMode}
      className="success"
      submitActionTitle={t('common.buttons.approve')}
      successSubmitCallback={setLoginMode}
    >
      <div className="mb-3">{t('pages.authorizationForm.successForm.passwordChanged')}</div>
      <IoIosCheckmarkCircleOutline size={100} color="#00b4e3" />
    </AuthorizationForm>
  );
};

SuccessForm.propTypes = {
  setLoginMode: PropTypes.func,
};
