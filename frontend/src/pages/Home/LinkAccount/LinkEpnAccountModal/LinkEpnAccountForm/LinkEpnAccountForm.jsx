import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';

import { AuthorizationForm, Control, Input } from 'components';
import { linkEpnAccountErrorMapper } from 'errorMappers/linkEpnAccountErrorMapper';
import { onlyLatin, required } from 'validators/baseControlValidators';
import { useDispatch, useSelector } from 'react-redux';
import { linkEpnAccount } from 'actions/epn';
import { getLinkedAccountsSelector } from 'selectors/linkedAccounts';

import './LinkEpnAccountForm.scss';

export const LinkEpnAccountForm = ({ backMethod }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { epnAuthError } = useSelector(getLinkedAccountsSelector);

  const { errors } = epnAuthError || { errors: [{ captcha: { captcha: {} } }] };
  const [error] = errors;
  const { captcha: { captcha_phrase_key: reCaptchaPhrase, captcha: { site_key: siteKey } } } = error;

  const [isFormLoading, setFormLoading] = useState(false);
  const [reCaptchaToken, setReCaptchaToken] = useState();

  const onCaptchaChange = useCallback((value) => {
    setReCaptchaToken(value);
  }, []);

  const handleSubmit = useCallback(async ({ clientId, clientSecret }) => {
    setFormLoading(true);

    const { payload } = await dispatch(linkEpnAccount({ clientId, clientSecret, reCaptchaToken, reCaptchaPhrase }));

    setFormLoading(false);

    if (payload.errors) {
      return { payload: { message: 'NEED_RECAPTCHA' } };
    }

    backMethod();

    return undefined;
  }, [dispatch, reCaptchaToken, reCaptchaPhrase, backMethod]);

  return (
    <AuthorizationForm
      onSubmit={handleSubmit}
      backMethod={backMethod}
      isLoading={isFormLoading}
      backActionTitle={t('common.buttons.back')}
      submitActionTitle={t('common.buttons.login')}
      className="link-epn-account-form"
      submitErrorMapper={linkEpnAccountErrorMapper}
    >
      <Control
        name="clientId"
        label={t('Client Id')}
        validators={[required, onlyLatin]}
        maxLength={32}
        component={Input}
      />
      <Control
        name="clientSecret"
        className="mb-1"
        label={t('Client Secret')}
        validators={[required]}
        maxLength={64}
        component={Input}
      />
      {siteKey && (
        <div className="re-captcha">
          <ReCAPTCHA
            size="normal"
            sitekey={siteKey}
            onChange={onCaptchaChange}
          />
        </div>
      )}
    </AuthorizationForm>
  );
};

LinkEpnAccountForm.propTypes = {
  backMethod: PropTypes.func,
};
