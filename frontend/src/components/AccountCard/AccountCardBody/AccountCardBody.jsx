import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'components/Spinner';
import { linkedAccountType } from 'propTypes/linkedAccountType';
import { Button } from 'react-bootstrap';

import './AccountCardBody.scss';

export const AccountCardBody = ({ linkedAccount, id }) => {
  const { isLoading, email, userBalances = [] } = linkedAccount;

  return isLoading
    ? <Spinner />
    : (
      <div className="account-body">
        <div className="account-info">
          {id && <p><small>{`ID: ${id}`}</small></p>}
          {email && <p><small>{`Email: ${email}`}</small></p>}
          <div>
            {userBalances.map(({ currency, availableAmount, holdAmount }) => {
              return (
                <Fragment key={`{${id}${currency}`}>
                  <p><small>{`Доступно ${currency}: ${availableAmount}`}</small></p>
                  <p><small>{`Холд ${currency}: ${holdAmount}`}</small></p>
                </Fragment>
              );
            })}
          </div>
        </div>
        <Button>Отключить</Button>
      </div>
    );
};

AccountCardBody.propTypes = {
  id: PropTypes.string,
  linkedAccount: linkedAccountType,
};
