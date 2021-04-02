import React, { useCallback, useMemo } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-final-form';
import { FaArrowDown, FaArrowRight } from 'react-icons/all';
import { useTranslation } from 'react-i18next';

import { getParseDescriptionSelector } from 'selectors/epn/epn';
import { Control, Textarea } from 'components';
import { required } from 'validators/baseControlValidators';
import { BUTTON_TYPE } from 'constants/buttonType';
import { clearParsedDescription, parseDescription } from 'actions/epn/paerseDescription';
import { EpnFields } from 'components/EpnFields/EpnFields';
import { useDeviceState } from 'hooks/useDeviceState';

import './DescriptionParser.scss';

const DESCRIPTION_TEXTAREA_ROWS = 10;
const ARROW_SIZE = 40;
const ARROW_COLOR = '00b4e3';

export const DescriptionParser = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isMobile } = useDeviceState();

  const { parsedDescription, isLoading: isParseDescriptionLoading } = useSelector(getParseDescriptionSelector);

  const handleSubmitForm = useCallback(async ({ epnAccountId, creativeCode, originalDescription, domainCutter }) => {
    await dispatch(clearParsedDescription());
    await dispatch(parseDescription({ epnAccountId, originalDescription, creativeCode, domainCutter }));
  }, [dispatch]);

  const Arrow = useMemo(() => (isMobile ? FaArrowDown : FaArrowRight), [isMobile]);

  return (
    <>
      <Form
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, values }) => {
          const { epnAccountId } = values;

          return (
            <form className="description-parser" onSubmit={handleSubmit}>
              <EpnFields epnAccountId={epnAccountId} />
              <div className="descriptions d-flex justify-content-start">
                <Control
                  name="originalDescription"
                  label={t('common.fields.originalDescription')}
                  rows={DESCRIPTION_TEXTAREA_ROWS}
                  validators={[required]}
                  component={Textarea}
                />
                <div className="arrow align-self-center m-3">
                  {isParseDescriptionLoading
                    ? <Spinner animation="border" variant="primary" size={80} />
                    : <Arrow size={ARROW_SIZE} color={ARROW_COLOR} />}
                </div>
                <Control
                  name="parsedDescription"
                  label={t('common.fields.parsedDescription')}
                  rows={DESCRIPTION_TEXTAREA_ROWS}
                  initialValue={parsedDescription}
                  component={Textarea}
                  disabled
                />
              </div>
              <Button className="submit-button" type={BUTTON_TYPE.submit}>Спарсить</Button>
            </form>
          );
        }}
      />
    </>
  );
};
