import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import './Section.scss';

export const Section = ({ title, children }) => {
  return (
    <div className="section">
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {children}
        </Card.Body>
      </Card>
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
