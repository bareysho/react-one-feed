import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Spinner } from 'components/Spinner';
import { Button } from 'components/Controls';
import { getErrorsObject } from 'utils/error';
import { BUTTON_TYPE } from 'constants/buttonType';
import { BUTTON_COLOR_TYPE } from 'constants/buttonColorType';

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
              <Spinner />
            )}
            {children}
            {submitError && <small className="text-danger">{submitError}</small>}
          </fieldset>
          <br />
          <Button
            type={BUTTON_TYPE.submit}
            title={submitActionTitle}
            disabled={submitButtonDisabled || isLoading}
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
