import PropTypes from 'prop-types';

export const videoInformation = PropTypes.shape({
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
});
