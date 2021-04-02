import React from 'react';
import { Form as FormBootstrap } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Textarea = ({ onChange, name, value, disabled, isInvalid, rows, className }) => {
  const textareaClassNames = classNames('textarea', className);

  return (
    <FormBootstrap.Control
      rows={rows}
      name={name}
      as="textarea"
      className={textareaClassNames}
      isInvalid={isInvalid}
      disabled={disabled}
      value={value}
      onChange={onChange}
    />
  );
};

Textarea.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  isInvalid: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
};
