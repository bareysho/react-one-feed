import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Input, Textarea } from 'components';
import { videoInformation } from 'propTypes/videoInformation';

import './VideoInformation.scss';

export const VideoInformation = ({ videoInfo }) => {
  const { t } = useTranslation();

  const { title, thumbnail, description, tags = [] } = videoInfo;

  const tagsString = useMemo(() => tags.join(', '), [tags]);

  return (
    <div className="video-info">
      <small>{t('common.fields.title')}</small>
      <Input
        value={title}
        disabled
        className="mb-3"
      />
      <img className="d-block mb-3" alt="video-thumbnail" src={thumbnail} />
      <small>{t('common.fields.description')}</small>
      <Textarea
        value={description}
        className="mb-3"
        disabled
        rows={15}
      />
      <small>{t('common.fields.tags')}</small>
      <Textarea
        rows={5}
        disabled
        value={tagsString}
      />
    </div>
  );
};

VideoInformation.propTypes = {
  videoInfo: videoInformation,
};
