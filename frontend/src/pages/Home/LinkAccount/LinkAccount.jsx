import React from 'react';

import { LinkYouTubeAccount } from './LinkYouTubeAccount/LinkYouTubeAccount';
import { LinkEpnAccountModal } from './LinkEpnAccountModal/LinkEpnAccountModal';

import './LinkAccount.scss';

export const LinkAccount = () => {
  return (
    <div className="link-account">
      <LinkYouTubeAccount />
      <LinkEpnAccountModal />
    </div>
  );
};
