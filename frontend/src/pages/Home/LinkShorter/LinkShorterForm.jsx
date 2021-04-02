import React, { useCallback } from 'react';
import { Control, Input } from 'components';
import { shortLink } from 'actions/epn';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getShortenLinkSelector } from 'selectors/shortenLink';
import { Button, Spinner } from 'react-bootstrap';
import { required } from 'validators/baseControlValidators';
import { Form } from 'react-final-form';
import { BUTTON_TYPE } from 'constants/buttonType';
import { EpnFields } from 'components/EpnFields/EpnFields';

export const LinkShorterForm = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const shortenLink = useSelector(getShortenLinkSelector);

  const handleShortLink = useCallback(({ link, creativeCode, domainCutter, epnAccountId }) => {
    dispatch(shortLink({ link, epnAccountId, domainCutter, creativeCode }));
  }, [dispatch]);

  return (
    <div className="short-link">
      <Form
        onSubmit={handleShortLink}
        render={({ handleSubmit, values }) => {
          const { epnAccountId } = values;

          return (
            <form className="short-link-form" onSubmit={handleSubmit}>
              <EpnFields epnAccountId={epnAccountId} />
              <Control
                name="link"
                label={t('common.fields.link')}
                validators={[required]}
                maxLength={240}
                component={Input}
              />
              <div className="mb-3">
                {shortenLink.isLoading && <Spinner animation="border" variant="primary" />}
                {shortenLink.result && !shortenLink.isLoading && (
                  <a href={shortenLink.result} rel="noreferrer" target="_blank">{shortenLink.result}</a>
                )}
              </div>
              <Button type={BUTTON_TYPE.submit}>{t('components.linkShorterForm.submitButton')}</Button>
            </form>
          );
        }}
      />
    </div>
  );
};
