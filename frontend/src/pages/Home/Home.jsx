import React from 'react';
import { useTranslation } from 'react-i18next';

import socket from 'api/socket';
import { store } from 'store';
import { getLinkedAccounts } from 'actions/linkedAccounts';

import { LinkShorterForm } from './LinkShorter/LinkShorterForm';
import { DescriptionParser } from './DescriptionParser/DescriptionParser';
import { YouTube } from './YouTube/YouTube';
import { LinkedAccounts } from './LinkedAccounts/LinkedAccounts';
import { LinkAccount } from './LinkAccount/LinkAccount';

import { Section } from './Section/Section';

socket.on('joined', () => {
  store.dispatch(getLinkedAccounts());
});

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container home">
      <h1 className="title mb-5">Инструменты</h1>
      <div className="content">
        <Section title={t('pages.home.sections.linkedAccounts')}>
          <LinkedAccounts />
        </Section>
        <Section title={t('pages.home.sections.linkAccounts')}>
          <LinkAccount />
        </Section>
        <Section title={t('pages.home.sections.shortenLink')}>
          <LinkShorterForm />
        </Section>
        <Section title={t('pages.home.sections.getVideoInformation')}>
          <YouTube />
        </Section>
        <Section title={t('pages.home.sections.parseDescription')}>
          <DescriptionParser />
        </Section>
      </div>
    </div>
  );
};
