import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputMaskComponent from 'react-input-mask';

export const InputMask = ({ name, disabled, onChange, isInvalid, value, mask }) => {
  const inputClassName = classNames('form-control rounded', { 'is-invalid': isInvalid, disabled });

  return (
    <InputMaskComponent
      mask={mask}
      name={name}
      className={inputClassName}
      id={name}
      disabled={disabled}
      isInvalid={isInvalid}
      value={value}
      onChange={onChange}
    >
      {(inputProps) => (<input {...inputProps} type="tel" />)}
    </InputMaskComponent>
  );
};

InputMask.propTypes = {
  mask: PropTypes.string,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  isInvalid: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};
