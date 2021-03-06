import React, { useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Spinner } from 'components/Spinner';
import { Button } from 'components/controls';
import { BUTTON_TYPE } from 'constants/buttonType';
import { BUTTON_COLOR_TYPE } from 'constants/buttonColorType';
import { getErrorsObject } from 'utils/error';

import './AuthorizationForm.scss';

export const AuthorizationForm = ({
  onSubmit,
  isLoading,
  backMethod,
  children,
  submitActionTitle,
  backActionTitle,
  className,
  submitErrorMapper,
  successSubmitCallback,
  validate,
}) => {
  const formClassName = classNames('authorization-form', className);

  const handleSubmitForm = useCallback(async (credentials) => {
    const response = await onSubmit(credentials);

    return getErrorsObject(response.payload, submitErrorMapper, successSubmitCallback);
  }, [onSubmit, submitErrorMapper, successSubmitCallback]);

  return (
    <Form
      onSubmit={handleSubmitForm}
      validate={validate}
      render={({ submitError, handleSubmit }) => (
        <form className={formClassName} onSubmit={handleSubmit}>
          <fieldset className="field-set" disabled={isLoading}>
            {isLoading && (
              <Spinner />
            )}
            {children}
            {submitError && <small className="text-danger">{submitError}</small>}
          </fieldset>
          <br />
          <Button
            type={BUTTON_TYPE.submit}
            title={submitActionTitle}
            disabled={isLoading}
          />
          {backMethod && (
            <Button
              type={BUTTON_TYPE.button}
              title={backActionTitle}
              colorType={BUTTON_COLOR_TYPE.brandSecondary}
              onClick={backMethod}
              disabled={isLoading}
            />
          )}
        </form>
      )}
    />
  );
};

AuthorizationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  backMethod: PropTypes.func,
  validate: PropTypes.func,
  successSubmitCallback: PropTypes.func,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  submitActionTitle: PropTypes.string,
  backActionTitle: PropTypes.string,
  className: PropTypes.string,
  submitErrorMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }),
};

AuthorizationForm.defaultProps = {
  backMethod: undefined,
};
