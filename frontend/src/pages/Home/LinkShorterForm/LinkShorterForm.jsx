import React, { useCallback, useMemo } from 'react';
import { AuthorizationForm, Dropdown, Input } from 'components';
import { shortLink } from 'actions/epn';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getShortenLinkSelector } from 'selectors/shortenLink';
import { getLinkedAccountsSelector } from 'selectors/linkedAccounts';
import { Spinner } from 'react-bootstrap';
import { required } from 'validators/baseControlValidators';

import './LinkShorterForm.scss';

export const LinkShorterForm = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const shortenLink = useSelector(getShortenLinkSelector);
  const { linkedAccounts } = useSelector(getLinkedAccountsSelector);

  const epnAccounts = useMemo(() => Object.entries(linkedAccounts)
    .filter(([, { type }]) => type === 'EPN'), [linkedAccounts])
    .map(([, account]) => account);

  const isLoading = useMemo(() => epnAccounts.some((account) => account.isLoading), [epnAccounts]);

  const options = useMemo(
    () => [...epnAccounts
      .map(({ username: title, accountId: value }) => ({ title, value }))],
    [epnAccounts],
  );

  const handleShortLink = useCallback(({ link, id }) => {
    dispatch(shortLink({ link, id }));
  }, [dispatch]);

  return (
    <div className="card link-shorter">
      <AuthorizationForm
        onSubmit={handleShortLink}
        submitActionTitle={t('components.linkShorterForm.submitButton')}
        formTitle={t('components.linkShorterForm.title')}
        className="link-shorter-form"
      >
        <Input
          name="link"
          label={t('common.fields.link')}
          validators={[required]}
          maxLength={240}
        />
        <Dropdown
          name="id"
          className="mb-1"
          label={t('common.fields.epnAccount')}
          options={options}
          isLoading={isLoading}
          validators={[required]}
        />
        {shortenLink.isLoading && <Spinner animation="border" variant="primary" />}
        {shortenLink.result && !shortenLink.isLoading && (
        <a href={shortenLink.result} rel="noreferrer" target="_blank">{shortenLink.result}</a>
        )}
      </AuthorizationForm>
    </div>
  );
};
