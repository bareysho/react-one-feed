import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';

import socket from 'api/socket';
import { linkYouTubeAccount } from 'actions/youTube';

export const AuthGoogle = ({ location: { search } }) => {
  const dispatch = useDispatch();

  const [accountLinked, setAccountLinked] = useState(false);

  const linkGoogleAccount = useCallback(async () => {
    const { code, profile } = queryString.parse(search);

    await dispatch(linkYouTubeAccount({ code, profile }));
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
    <div>Successful, closing...</div>
  );
};

AuthGoogle.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};
