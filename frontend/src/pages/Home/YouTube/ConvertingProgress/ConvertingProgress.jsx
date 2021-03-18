import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { ProgressInformation } from 'components/ProgressInformation/ProgressInformation';
import { cancelConvertVideo } from 'actions/youTube/convertVideo';

export const ConvertingProgress = ({ audioProcessed, videoProcessed, videoId }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleCancelConvert = useCallback(() => {
    dispatch(cancelConvertVideo({ downloadUrl: videoId }));
  }, [dispatch, videoId]);

  return (
    <div className="mt-3">
      <h4>{t('pages.home.youtube.convertingProgress.title')}</h4>
      <p>{t('pages.home.youtube.convertingProgress.hint')}</p>
      <p>{t('pages.home.youtube.convertingProgress.description')}</p>
      <ProgressInformation progress={audioProcessed} label={t('common.fields.audio')} />
      <ProgressInformation progress={videoProcessed} label={t('common.fields.video')} />
      <Button className="mt-3" onClick={handleCancelConvert}>{t('common.buttons.cancel')}</Button>
    </div>
  );
};

ConvertingProgress.propTypes = {
  videoId: PropTypes.string,
  audioProcessed: PropTypes.number,
  videoProcessed: PropTypes.number,
};
