import React from 'react';
import { useSelector } from 'react-redux';

import socket from 'api/socket';
import { store } from 'store';
import { setConvertingVideoProgress } from 'actions/youTube/convertVideo';
import { getVideoInformationSelector } from 'selectors/youTube';

import { VideoInformation } from './VideoInformation/VideoInformation';
import { GetVideoInformationForm } from './GetVideoInformationForm/GetVideoInformationForm';
import { VideoActions } from './VideoActions/VideoActions';

socket.on('msg', ({ audioProcessed, videoProcessed, convertedVideoId, convertingError }) => {
  store.dispatch(setConvertingVideoProgress({ audioProcessed, videoProcessed, convertedVideoId, convertingError }));
});

export const YouTube = () => {
  const { videoInfo: videoDetails, isLoading: isVideoInformationLoading } = useSelector(getVideoInformationSelector);

  const { videoDetails: videoInfo } = videoDetails || {};

  return (
    <>
      <GetVideoInformationForm />
      {videoInfo && !isVideoInformationLoading && (
        <>
          <VideoInformation videoInfo={videoInfo} />
          <VideoActions videoInfo={videoInfo} />
        </>
      )}
    </>
  );
};
