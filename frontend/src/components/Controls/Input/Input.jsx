import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form } from 'react-bootstrap';

export const Input = ({ name, disabled, maxLength, onChange, isInvalid, value, type, className }) => {
  const inputClassNames = classNames('input', className);

  return (
    <Form.Control
      name={name}
      as="input"
      className={inputClassNames}
      type={type}
      isInvalid={isInvalid}
      disabled={disabled}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      id={name}
    />
  );
};

Input.propTypes = {
  maxLength: PropTypes.number,
  value: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  isInvalid: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};
