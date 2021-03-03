import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field } from 'react-final-form';

export const Input = ({ name, label, type, validators, maxLength, className }) => {
  const composeValidators = useCallback(
    (value) => (validators || []).reduce((error, validator) => error || validator(value), undefined),
    [validators],
  );

  return (
    <Field
      name={name}
      validate={composeValidators}
      render={({ input, meta }) => {
        const { submitFailed, error, submitError } = meta;

        const superError = error || submitError;

        const hasValue = input.value;

        const isInvalid = hasValue ? superError : submitFailed && superError;

        const formGroupClassName = classNames('form-group', className);
        const inputClassName = classNames('form-control rounded', { 'is-invalid': isInvalid });
        const labelClassName = classNames({ 'text-danger': isInvalid });

        return (
          <div className={formGroupClassName}>
            <label htmlFor={name} className="mb-1 text-muted">
              <small className={labelClassName}>{label}</small>
            </label>
            <input
              {...input}
              type={type || 'text'}
              name={name}
              id={name}
              maxLength={maxLength}
              className={inputClassName}
            />
            {isInvalid && <small className="text-danger">{superError}</small>}
          </div>
        );
      }}
    />
  );
};

Input.propTypes = {
  validators: PropTypes.arrayOf(PropTypes.func),
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
};
