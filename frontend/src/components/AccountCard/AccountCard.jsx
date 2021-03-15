import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Accordion, Card, Spinner } from 'react-bootstrap';
import { EPN_LOGO } from 'constants/uiConstant';
import { linkedAccountType } from 'propTypes/linkedAccountType';

import { AccountCardBody } from './AccountCardBody/AccountCardBody';

import './AccountCard.scss';

export const AccountCard = ({ linkedAccount, id }) => {
  const { username, displayName, isLoading, photo } = linkedAccount;

  const accordionToggleClassname = useMemo(() => classNames({ isLoading }), [isLoading]);

  return (
    <Accordion className="account-card" defaultActiveKey="0">
      <Card>
        <Accordion.Toggle className={accordionToggleClassname} as={Card.Header} eventKey="1">
          {isLoading
            ? <Spinner animation="border" variant="primary" />
            : (
              <>
                <img className="account-logo" alt="account-logo" src={photo || EPN_LOGO} />
                <small>{username || displayName}</small>
              </>
            )}

        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <AccountCardBody linkedAccount={linkedAccount} id={id} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

AccountCard.propTypes = {
  id: PropTypes.string,
  linkedAccount: linkedAccountType,
};
