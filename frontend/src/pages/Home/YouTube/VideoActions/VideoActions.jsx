import React, { useCallback, useMemo, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { ConvertingProgress } from 'pages/Home/YouTube/ConvertingProgress/ConvertingProgress';
import { ProgressInformation } from 'components/ProgressInformation/ProgressInformation';

import { getConvertingProgressSelector, getConvertingVideoSelector } from 'selectors/youTube';
import { convertVideo, downloadConvertedVideo } from 'actions/youTube/convertVideo';
import { videoInformation } from 'propTypes/videoInformation';
import { useTranslation } from 'react-i18next';

export const VideoActions = ({ videoInfo }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [convertingLoading, setConvertingLoading] = useState(false);

  const { downloadingProgress, convertedVideoId, convertingError } = useSelector(getConvertingVideoSelector);
  const { audioProcessed, videoProcessed } = useSelector(getConvertingProgressSelector);

  const { webpage_url: videoUrl, url: playVideoUrl, id: videoId } = videoInfo;

  const isSomeProcess = useMemo(() => audioProcessed && videoProcessed, [audioProcessed, videoProcessed]);

  const handleDownload1080 = useCallback(() => {
    dispatch(downloadConvertedVideo({ downloadUrl: videoId }));
  }, [dispatch, videoId]);

  const handleDownload720 = useCallback(() => {
    window.open(playVideoUrl, '_blank');
  }, [playVideoUrl]);

  const handleConvertVideo = useCallback((downloadUrl) => async () => {
    setConvertingLoading(true);

    await dispatch(convertVideo({ downloadUrl }));

    setConvertingLoading(false);
  }, [dispatch]);

  return (
    <div className="mt-3">
      <div>
        <Button className="mr-4" onClick={handleDownload720}>
          {t('common.buttons.downloadWithQuality', { quality: 720 })}
        </Button>
        {Boolean(!convertedVideoId && !isSomeProcess && !convertingError)
          && (
            <Button onClick={handleConvertVideo(videoUrl)}>
              {convertingLoading
                ? <Spinner animation="border" size="sm" />
                : t('common.buttons.convertWithQuality', { quality: 1080 })}
            </Button>
          )}
        {Boolean(convertedVideoId && !downloadingProgress && !isSomeProcess)
          && <Button onClick={handleDownload1080}>{t('common.buttons.downloadWithQuality', { quality: 1080 })}</Button>}
        {Boolean(convertingError) && <p className="mt-3">{t('pages.home.youtube.convertingProgress.error')}</p>}
      </div>
      {Boolean(isSomeProcess) && (
        <ConvertingProgress audioProcessed={audioProcessed} videoProcessed={videoProcessed} videoId={videoId} />
      )}
      <div className="mt-3">
        {Boolean(downloadingProgress)
          && <ProgressInformation progress={downloadingProgress} label={t('common.fields.downloadingVideo')} />}
      </div>
    </div>
  );
};

VideoActions.propTypes = {
  videoInfo: videoInformation,
};
