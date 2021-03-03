import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field } from 'react-final-form';

export const Input = ({ name, label, type, validators, maxLength }) => {
  const composeValidators = useCallback(
    (value) => (validators || []).reduce((error, validator) => error || validator(value), undefined),
    [validators],
  );

  return (
    <Field
      name={name}
      validate={composeValidators}
      render={({ input, meta }) => {
        const { submitFailed, error } = meta;

        const hasValue = input.value;

        const isInvalid = hasValue ? error : submitFailed && error;

        const inputClassName = classNames('form-control rounded', { 'is-invalid': isInvalid });

        const labelClassName = classNames({ 'text-danger': isInvalid });

        return (
          <div className="form-group">
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
            {isInvalid && <small className="text-danger">{error}</small>}
          </div>
        );
      }}
    />
  );
};

Input.propTypes = {
  validators: PropTypes.arrayOf(PropTypes.func),
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
};
