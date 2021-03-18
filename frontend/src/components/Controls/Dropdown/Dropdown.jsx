import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field } from 'react-final-form';
import { Form, InputGroup, Spinner } from 'react-bootstrap';

import './Dropdown.scss';

export const Dropdown = ({ name, label, validators, className, options, isLoading }) => {
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

        const formGroupClassName = classNames('dropdown form-group', { isLoading, hasValue }, className);

        const labelClassName = classNames({ 'text-danger': isInvalid });

        return (
          <div className={formGroupClassName}>
            <label htmlFor={name} className="mb-1 text-muted">
              <small className={labelClassName}>{label}</small>
            </label>
            <InputGroup className="mb-3">
              <Form.Control
                name={name}
                as="select"
                isInvalid={isInvalid}
                disabled={isLoading}
                custom
                value={input.value}
                onChange={input.onChange}
              >
                <option className="is-placeholder" disabled value="">
                  Выберите аккаунт
                </option>
                {options.map((option) => {
                  const { value, title } = option;

                  return <option key={value} value={value}>{title}</option>;
                })}
              </Form.Control>
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

Dropdown.propTypes = {
  validators: PropTypes.arrayOf(PropTypes.func),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
};
