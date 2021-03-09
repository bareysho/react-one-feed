import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { NavigationService } from 'navigation';
import { BUTTON_TYPE } from 'constants/buttonType';
import { BUTTON_COLOR_TYPE } from 'constants/buttonColorType';

export const Button = ({ title, onClick, className, type, colorType, to, disabled, buttonBlock }) => {
  const buttonColorType = `btn-${colorType || BUTTON_COLOR_TYPE.brand}`;

  const classes = classNames('btn rounded', { 'btn-block': buttonBlock }, buttonColorType, className);

  const handleOnClick = useCallback((...args) => {
    if (onClick) { onClick(args); }

    if (to) { NavigationService.redirectTo(to); }
  }, [onClick, to]);

  return (
    <button
      type={type || BUTTON_TYPE.button}
      className={classes}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  colorType: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  buttonBlock: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(BUTTON_TYPE)),
};

Button.defaultProps = {
  buttonBlock: true,
};
