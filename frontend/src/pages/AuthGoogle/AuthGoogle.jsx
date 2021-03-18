import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';

import { SpinnerWrapper } from 'components';
import { linkYouTubeAccount } from 'actions/youTube';

import socket from 'api/socket';

export const AuthGoogle = ({ location: { search } }) => {
  const dispatch = useDispatch();

  const [accountLinked, setAccountLinked] = useState(false);

  const linkGoogleAccount = useCallback(async () => {
    const { code } = queryString.parse(search);

    await dispatch(linkYouTubeAccount({ code }));
    await socket.emit('online');

    setAccountLinked(true);
  }, [dispatch, search]);

  useEffect(() => {
    linkGoogleAccount().then(() => {});
  }, [linkGoogleAccount]);

  useEffect(() => {
    if (accountLinked) {
      window.close();
    }
  }, [accountLinked]);

  return (
    <div><SpinnerWrapper /></div>
  );
};

AuthGoogle.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};
