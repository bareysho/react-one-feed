import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-final-form';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { BUTTON_TYPE } from 'constants/buttonType';
import { Control, Input } from 'components';
import { required } from 'validators/baseControlValidators';
import { getVideoInformationSelector } from 'selectors/youTube';
import { getVideoInformation } from 'actions/youTube/getVideoInformation';
import { cancelConvertVideo } from 'actions/youTube/convertVideo';

export const GetVideoInformationForm = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading: isVideoInformationLoading, videoInfo } = useSelector(getVideoInformationSelector);

  const handleSubmitForm = useCallback(({ downloadLink }) => {
    if (videoInfo) {
      dispatch(cancelConvertVideo({ downloadUrl: videoInfo.id }));
    }
    dispatch(getVideoInformation({ downloadUrl: downloadLink }));
  }, [dispatch, videoInfo]);

  return (
    <Form
      onSubmit={handleSubmitForm}
      render={({ handleSubmit }) => {
        return (
          <form className="information-form" onSubmit={handleSubmit}>
            <Control
              name="downloadLink"
              label={t('common.fields.youTubeLink')}
              maxLength={256}
              component={Input}
              validators={[required]}
            />
            {!isVideoInformationLoading
              && <Button type={BUTTON_TYPE.submit}>{t('common.buttons.getInformation')}</Button>}
            {isVideoInformationLoading && (
              <div className="d-flex align-items-center mt-3">
                <Spinner animation="border" variant="primary" />
                <span className="ml-3">{t('pages.home.youtube.videoInformationForm.informationLoading')}</span>
              </div>
            )}
          </form>
        );
      }}
    />
  );
};
