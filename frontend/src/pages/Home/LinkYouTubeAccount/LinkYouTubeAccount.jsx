import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { popupCenter } from 'utils/popupCenter';
import { useDispatch } from 'react-redux';
import { getAuthYouTubeAccountLink } from 'actions/youTube';
import { useTranslation } from 'react-i18next';

const POPUP_WIDTH = 400;
const POPUP_HEIGHT = 600;

export const LinkYouTubeAccount = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const linkYouTube = useCallback(async () => {
    const { payload: url } = await dispatch(getAuthYouTubeAccountLink());

    popupCenter({ url, title: 'linkYouTubeAccount', w: POPUP_WIDTH, h: POPUP_HEIGHT });
  }, [dispatch]);

  return (
    <Button onClick={linkYouTube}>{t('components.linkYouTubeAccount.action')}</Button>
  );
};
