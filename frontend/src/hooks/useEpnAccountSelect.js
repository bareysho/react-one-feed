import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getLinkedAccountsSelector } from 'selectors/linkedAccounts';

export const useEpnAccountSelect = () => {
  const { linkedAccounts } = useSelector(getLinkedAccountsSelector);

  const epnAccounts = useMemo(() => Object.entries(linkedAccounts)
    .filter(([, { type }]) => type === 'EPN'), [linkedAccounts])
    .map(([, account]) => account);

  const isLoading = useMemo(() => epnAccounts.some((account) => account.isLoading), [epnAccounts]);

  const data = useMemo(
    () => [...epnAccounts.map(({ username: title, accountId: value }) => ({ title, value }))],
    [epnAccounts],
  );

  return {
    isLoading,
    data,
  }
}
