import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { SpinnerWrapper } from 'components/SpinnerWrapper';
import { getErrorsObject } from 'utils/error';
import { BUTTON_TYPE } from 'constants/buttonType';
import { Button } from 'react-bootstrap';

import './AuthorizationForm.scss';

export const AuthorizationForm = ({
  onSubmit,
  isLoading,
  backMethod,
  children,
  submitActionTitle,
  backActionTitle,
  className,
  formTitle,
  submitErrorMapper,
  successSubmitCallback,
  validate,
  submitButtonDisabled,
  disabled,
}) => {
  const formClassName = classNames('authorization-form', className);

  const handleSubmitForm = useCallback(async (credentials) => {
    const { payload = {} } = await onSubmit(credentials) || {};

    const handleSuccessSubmitCallback = () => successSubmitCallback && successSubmitCallback(credentials);

    if (submitErrorMapper) {
      return getErrorsObject(payload, submitErrorMapper, handleSuccessSubmitCallback);
    }

    return undefined;
  }, [onSubmit, submitErrorMapper, successSubmitCallback]);

  const isFormDisabled = useMemo(() => disabled || isLoading, [disabled, isLoading]);

  return (
    <Form
      onSubmit={handleSubmitForm}
      validate={validate}
      render={({ submitError, handleSubmit }) => (
        <form className={formClassName} onSubmit={handleSubmit}>
          {formTitle && <h4 className="form-title mb-3">{formTitle}</h4>}
          <fieldset className="field-set" disabled={isFormDisabled}>
            {isLoading && (
              <SpinnerWrapper size={60} />
            )}
            {children}
            {submitError && <small className="text-danger">{submitError}</small>}
          </fieldset>
          <br />
          <Button
            type={BUTTON_TYPE.submit}
            block
            disabled={submitButtonDisabled || isLoading}
            variant="primary"
            className="fullwidth"
          >
            {submitActionTitle}
          </Button>
          {backMethod && (
            <Button
              type={BUTTON_TYPE.button}
              block
              onClick={backMethod}
              disabled={isLoading}
              variant="secondary"
              className="fullwidth"
            >
              {backActionTitle}
            </Button>
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
  disabled: PropTypes.bool,
  submitButtonDisabled: PropTypes.bool,
  children: PropTypes.node,
  submitActionTitle: PropTypes.string,
  formTitle: PropTypes.string,
  backActionTitle: PropTypes.string,
  className: PropTypes.string,
  submitErrorMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }),
};

AuthorizationForm.defaultProps = {
  backMethod: undefined,
};
