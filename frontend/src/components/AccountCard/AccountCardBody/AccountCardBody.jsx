import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { SpinnerWrapper } from 'components/SpinnerWrapper';
import { linkedAccountType } from 'propTypes/linkedAccountType';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { deleteLinkedAccount } from 'actions/linkedAccounts';

import { AccountBodyField } from './AccountBodyField';

import './AccountCardBody.scss';

export const AccountCardBody = ({ linkedAccount, id }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading, email, userBalances = [], type } = linkedAccount;

  const handleDeleteAccount = useCallback(() => {
    dispatch(deleteLinkedAccount({ id, type }));
  }, [dispatch, id, type]);

  return isLoading
    ? <SpinnerWrapper size={60} />
    : (
      <div className="account-body">
        <div className="account-info">
          {id && <AccountBodyField fieldName="id" values={{ id }} />}
          {email && <AccountBodyField fieldName="email" values={{ email }} />}
          <div>
            {userBalances.map(({ currency, availableAmount, holdAmount }) => {
              return (
                <Fragment key={`{${id}${currency}`}>
                  <AccountBodyField fieldName="balance" values={{ currency, value: availableAmount }} />
                  <AccountBodyField fieldName="balance" values={{ currency, value: holdAmount }} />
                </Fragment>
              );
            })}
          </div>
        </div>
        <ConfirmationModal
          modalTitle={t('components.disableAccountModal.title')}
          onConfirmCallback={handleDeleteAccount}
          description={t('components.disableAccountModal.description')}
        >
          <Button className="auto-width">{t('common.buttons.disable')}</Button>
        </ConfirmationModal>
      </div>
    );
};

AccountCardBody.propTypes = {
  id: PropTypes.string,
  linkedAccount: linkedAccountType,
};
