import axios from 'axios';
import { isProductionMode, USER_KEY } from 'constants/common';
import { getLocalStorageUser } from 'utils/localStorage';
import { authApi } from 'api/authApi';
import { NavigationService } from 'navigation';

let axiosConfig = {
  timeout: 360000,
}

if (!isProductionMode) {
  axiosConfig = {
    ...axiosConfig,
    baseURL: 'http://localhost:3000',
  }
}

const apiInstance = axios.create(axiosConfig);

apiInstance.interceptors.request.use(config => {
  if (!config.headers['authorization']) {
    const { token } = getLocalStorageUser();

    config.headers['authorization'] = `bearer ${token}`;
  }

  return config;
})

apiInstance.interceptors.response.use((response) => {
  return response;
}, async (error) => {

  // Logout if refresh token expired
  if(error.response.status === 400 && error.response.data.error.message === 'INVALID_REFRESH_TOKEN_ERROR') {
    localStorage.removeItem(USER_KEY);

    return Promise.resolve(() => {
      return NavigationService.navigateToIndex();
    })
  }

  // Try to refresh token if access token invalid
  if(error.response.status === 401 && error.response.data.message === 'TOKEN_EXPIRED') {
    try {
      const response = await authApi.refreshToken();

      const config = error.config;

      localStorage.removeItem(USER_KEY);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));

      config.headers['authorization'] = `bearer ${response.data.token}`;

      return new Promise((resolve, reject) => {
        axios.request(config).then(response => { resolve(response) }).catch((error) => { reject(error) })
      })
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
});

export { apiInstance };
