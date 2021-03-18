import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

export const UserInfo = ({ title, value }) => {
  return (
    <Row className="mb-3">
      <Col xs={12} sm={5} md={12}><small>{title}</small></Col>
      <Col xs={12} sm={7} md={12}>{value}</Col>
    </Row>
  );
};

UserInfo.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};
