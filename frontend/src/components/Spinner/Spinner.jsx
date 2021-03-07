import React from 'react';

import './Spinner.scss';

export const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
