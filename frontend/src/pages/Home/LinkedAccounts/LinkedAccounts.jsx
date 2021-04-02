import React, { useEffect } from 'react';
import { AccountCard } from 'components/AccountCard/AccountCard';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkedAccountsSelector } from 'selectors/linkedAccounts';
import { fetchLinkedAccount, getLinkedAccounts } from 'actions/linkedAccounts';

import './LinkedAccounts.scss';

export const LinkedAccounts = () => {
  const dispatch = useDispatch();

  const { linkedAccounts, linkedAccountsIds = [] } = useSelector(getLinkedAccountsSelector);

  useEffect(() => {
    if (!linkedAccountsIds.length) dispatch(getLinkedAccounts());
  }, [dispatch, linkedAccountsIds.length]);

  useEffect(() => {
    linkedAccountsIds.forEach((linkedAccountId) => dispatch(fetchLinkedAccount(linkedAccountId)));
  }, [dispatch, linkedAccountsIds]);

  return (
    <div className="linked-accounts-container">
      {!Object.values(linkedAccounts).length && 'Нет добавленных аккаунтов'}
      {Object.entries(linkedAccounts).map(([id, linkedAccount]) => (
        <AccountCard key={id} linkedAccount={linkedAccount} id={id} />
      ))}
    </div>
  );
};
