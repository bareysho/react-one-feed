import React from 'react';
import PropType from 'prop-types';
import { Spinner as SpinnerComponent } from 'react-bootstrap';

import './SpinnerWrapper.scss';

export const SpinnerWrapper = ({ size }) => {
  return (
    <div className="spinner-wrapper">
      <SpinnerComponent animation="border" size={size} />
    </div>
  );
};

SpinnerWrapper.propTypes = {
  size: PropType.number,
};
