import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const Dropdown = ({
  name, isInvalid, value, onChange, options, disabled, placeholder,
}) => {
  return (
    <Form.Control
      name={name}
      as="select"
      className="dropdown"
      isInvalid={isInvalid}
      disabled={disabled}
      value={value || ''}
      onChange={onChange}
      custom
    >
      <option className="is-placeholder" disabled value="">
        {placeholder}
      </option>
      {options.map((option) => {
        const { value: optionValue, title } = option;

        return <option key={optionValue} value={optionValue}>{title}</option>;
      })}
    </Form.Control>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  isInvalid: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};
