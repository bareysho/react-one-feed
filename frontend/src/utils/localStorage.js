import { USER_KEY } from 'constants/common';

export const getLocalStorageUser = () => {
  return (localStorage.getItem(USER_KEY) && JSON.parse(localStorage.getItem(USER_KEY))) || {};
}
