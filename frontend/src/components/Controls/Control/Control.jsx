import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field } from 'react-final-form';
import { InputGroup, Spinner } from 'react-bootstrap';

import './Control.scss';

export const Control = ({
  mask, name, label, validators, className, options, isLoading,
  onChange, disabled, placeholder, component: Component, type, rows, initialValue,
}) => {
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

        const isInvalid = !disabled && (hasValue ? superError : submitFailed && superError);

        const handleChange = (event) => {
          if (onChange) onChange(event);

          return input.onChange(event);
        };

        const controlClassName = classNames('form-group', { isLoading, hasValue }, className);

        const labelClassName = classNames({ 'text-danger': isInvalid });

        return (
          <div className={controlClassName}>
            {label && (
              <label htmlFor={name} className="mb-1 text-muted">
                <small className={labelClassName}>{label}</small>
              </label>
            )}
            <InputGroup>
              <Component
                name={name}
                placeholder={placeholder}
                label={label}
                hasValue={hasValue}
                options={options}
                error={superError}
                isInvalid={isInvalid}
                isLoading={isLoading}
                disabled={disabled}
                className={className}
                onChange={handleChange}
                value={input.value || initialValue}
                type={type}
                mask={mask}
                rows={rows}
              />
              {isLoading && (
                <InputGroup.Append>
                  <Spinner size="sm" animation="border" variant="primary" />
                </InputGroup.Append>
              )}
            </InputGroup>
            {isInvalid && <small className="text-danger">{superError}</small>}
          </div>
        );
      }}
    />
  );
};

Control.propTypes = {
  validators: PropTypes.arrayOf(PropTypes.func),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  initialValue: PropTypes.string,
  type: PropTypes.string,
  mask: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  component: PropTypes.elementType,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  rows: PropTypes.number,
};
