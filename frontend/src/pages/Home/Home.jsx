import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLinkedAccount, getLinkedAccounts } from 'actions/linkedAccounts';
import { getLinkedAccountsSelector } from 'selectors/linkedAccounts';
import { AccountCard } from 'components/AccountCard/AccountCard';
import { LinkEpnAccountModal } from 'pages/Home/LinkEpnAccountModal/LinkEpnAccountModal';
import { LinkShorterForm } from 'pages/Home/LinkShorterForm/LinkShorterForm';
import { LinkYouTubeAccount } from 'pages/Home/LinkYouTubeAccount/LinkYouTubeAccount';

import './home.scss';

export const Home = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { linkedAccounts, linkedAccountsIds = [] } = useSelector(getLinkedAccountsSelector);

  useEffect(() => {
    if (!linkedAccountsIds.length) dispatch(getLinkedAccounts());
  }, [dispatch, linkedAccountsIds.length]);

  useEffect(() => {
    linkedAccountsIds.forEach((linkedAccountId) => dispatch(fetchLinkedAccount(linkedAccountId)));
  }, [dispatch, linkedAccountsIds]);

  return (
    <div className="home-page">
      <div className="content">
        <div>{t('pages.home.sections.linkedAccounts')}</div>
        <div className="section accounts-container">
          {Object.entries(linkedAccounts).map(([id, linkedAccount]) => (
            <AccountCard key={id} linkedAccount={linkedAccount} id={id} />
          ))}
        </div>
        <div>{t('pages.home.sections.linkAccounts')}</div>
        <div className="section link-accounts">
          <LinkYouTubeAccount />
          <LinkEpnAccountModal />
        </div>
        <div>{t('pages.home.sections.actions')}</div>
        <div className="section actions">
          <LinkShorterForm />
        </div>
      </div>
    </div>
  );
};
