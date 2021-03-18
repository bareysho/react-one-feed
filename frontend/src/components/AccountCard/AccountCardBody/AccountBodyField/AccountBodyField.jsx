import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const AccountBodyField = ({ fieldName, values }) => {
  const { t } = useTranslation();

  return <p><small>{t(`components.accountCard.accountBody.fields.${fieldName}`, values)}</small></p>;
};

AccountBodyField.propTypes = {
  fieldName: PropTypes.string,
  values: PropTypes.shape({ [PropTypes.string]: PropTypes.string }),
};
