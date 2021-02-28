import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

export const Input = ({ name, label, type }) => {
  return (
    <Field
      name={name}
      render={({ input, meta }) => (
        <div className="form-group">
          <label htmlFor={name} className="mb-1 text-muted">
            <small>{label}</small>
          </label>
          <input
            {...input}
            type={type || 'text'}
            name={name}
            id={name}
            className="form-control rounded"
          />
          {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
      )}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};
