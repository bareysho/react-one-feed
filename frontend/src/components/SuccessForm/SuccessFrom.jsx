import React from 'react';
import PropTypes from 'prop-types';
import { AuthorizationForm } from 'components/index';
import { useTranslation } from 'react-i18next';
import { IoIosCheckmarkCircleOutline } from 'react-icons/all';

import 'components/SuccessForm/SuccessForm.scss';

export const SuccessForm = ({ setPreviousPage, description }) => {
  const { t } = useTranslation();

  return (
    <AuthorizationForm
      onSubmit={setPreviousPage}
      className="success"
      submitActionTitle={t('common.buttons.approve')}
      successSubmitCallback={setPreviousPage}
    >
      <div className="mb-3">{description}</div>
      <IoIosCheckmarkCircleOutline size={100} color="#00b4e3" />
    </AuthorizationForm>
  );
};

SuccessForm.propTypes = {
  setPreviousPage: PropTypes.func,
  description: PropTypes.string,
};
