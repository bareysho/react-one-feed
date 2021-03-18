import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Control } from 'components/Controls/Control/Control';
import { Dropdown } from 'components/Controls';
import { required } from 'validators/baseControlValidators';
import { useEpnAccountSelect } from 'hooks/useEpnAccountSelect';
import { getDomainCuttersSelector, getUserCreativesSelector } from 'selectors/epn/epn';
import { getUserCreatives } from 'actions/epn/creatives';
import { getDomainCutters } from 'actions/epn/domainCutters';

export const EpnFields = ({ epnAccountId }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { data: epnAccounts = [], isLoading: isEpnAccountLoading } = useEpnAccountSelect();
  const { data: creatives = [], isLoading: isCreativesLoading } = useSelector(getUserCreativesSelector);
  const { data: domainCutters = [], isLoading: isDomainCuttersLoading } = useSelector(getDomainCuttersSelector);

  const creativesOptions = creatives.map(({ description, code }) => ({ title: description, value: code }));
  const domainCuttersOptions = domainCutters.map((domainCutter) => ({ title: domainCutter, value: domainCutter }));

  const handleSelectAccount = useCallback((event) => {
    dispatch(getDomainCutters({ epnAccountId: event.target.value }));
    dispatch(getUserCreatives({ id: event.target.value }));
  }, [dispatch]);

  return (
    <>
      <Control
        options={epnAccounts}
        name="epnAccountId"
        isLoading={isEpnAccountLoading}
        disabled={isEpnAccountLoading}
        onChange={handleSelectAccount}
        placeholder={t('common.placeholders.chooseAccount')}
        label={t('common.fields.epnAccount')}
        validators={[required]}
        component={Dropdown}
      />
      <Control
        options={creativesOptions}
        name="creativeCode"
        isLoading={isCreativesLoading}
        disabled={!epnAccountId || isCreativesLoading}
        placeholder={t('common.placeholders.chooseCreative')}
        label={t('common.fields.creative')}
        validators={[required]}
        component={Dropdown}
      />
      <Control
        options={domainCuttersOptions}
        name="domainCutter"
        isLoading={isDomainCuttersLoading}
        disabled={!epnAccountId || isDomainCuttersLoading}
        placeholder={t('common.placeholders.chooseShortDomain')}
        label={t('common.fields.shortDomain')}
        validators={[required]}
        component={Dropdown}
      />
    </>
  );
};

EpnFields.propTypes = {
  epnAccountId: PropTypes.string,
};
