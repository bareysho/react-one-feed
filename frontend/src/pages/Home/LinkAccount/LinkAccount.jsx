import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getCreds } from 'actions/youTube/convertVideo';

import { LinkYouTubeAccount } from './LinkYouTubeAccount/LinkYouTubeAccount';
import { LinkEpnAccountModal } from './LinkEpnAccountModal/LinkEpnAccountModal';

import './LinkAccount.scss';

export const LinkAccount = () => {
  const dispatch = useDispatch();

  const hadleAddApiless = useCallback(() => {
    dispatch(getCreds());
  }, [dispatch]);

  return (
    <div className="link-account">
      <LinkYouTubeAccount />
      <LinkEpnAccountModal />
      <>
        <Button onClick={hadleAddApiless}>Apiless</Button>
      </>
    </div>
  );
};
