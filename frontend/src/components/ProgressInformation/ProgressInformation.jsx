import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

export const ProgressInformation = ({ label, progress }) => {
  return (
    <>
      <small>{label}</small>
      <ProgressBar animated now={progress} label={`${progress}%`} />
    </>
  );
};

ProgressInformation.propTypes = {
  progress: PropTypes.number,
  label: PropTypes.string,
};
