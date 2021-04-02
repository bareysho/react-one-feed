import { useEffect, useRef, useState } from 'react';
import _ from 'lodash/lang';

const MOBILE_SMALL = 320;
const MOBILE = 767;
const TABLET = 991;
const DESKTOP = TABLET + 1;

const getActualDeviceState = width => {
  const isMobileSmall = width <= MOBILE_SMALL;
  const isMobile = width <= MOBILE;
  const isTablet = width <= TABLET && !isMobile;
  const isDesktop = width >= DESKTOP && !isTablet && !isMobile;

  return {
    isDesktop,
    isMobile,
    isMobileSmall,
    isTablet,
  };
};

export const useDeviceState = () => {
  const [, rerender] = useState({});
  const windowWidth = useRef(window.innerWidth);
  const deviceState = useRef({});

  const handleResize = () => {
    windowWidth.current = window.innerWidth;
    const updateDeviceState = getActualDeviceState(window.innerWidth);

    const isEqual = _.isEqual(updateDeviceState, deviceState.current);

    if (!isEqual) {
      deviceState.current = { ...updateDeviceState };
      rerender(updateDeviceState);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    deviceState.current = getActualDeviceState(windowWidth.current);

    rerender(deviceState.current);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...deviceState.current,
  };
};
