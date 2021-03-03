import axios from 'axios';
import { USER_KEY } from 'constants/common';

const { token } = (localStorage.getItem(USER_KEY) && JSON.parse(localStorage.getItem(USER_KEY))) || {};

const apiInstance = axios.create({
  baseURL: 'http://192.168.1.2:3000',
  timeout: 360000,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

apiInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {

  // Jika response 500 dan juga token tidak bisa di refresh lagi maka akan logout dan masuk ke halaman login
  if(error.response.status === 500 && error.response.data.error.message === 'Token has expired and can no longer be refreshed') {
    console.log('token di hapus dan logout kehalaman login');
    console.log(error.response);
    localStorage.removeItem(USER_KEY);

    return new Promise((resolve, reject) => {
      // history nya belom bisa ngepush ke halaman cuma linknya doang terupdate
      // history.push('/login');

      console.log('redirect ke halaman login')
      return window.location.href = '/';
      // reject(error);
    })
  }

  // refresh token jika error 401 dan mesage token has expired
  if(error.response.status === 401 && error.response.data.message === 'TOKEN_EXPIRED') {
    console.log('the token must be refreshed');
    return apiInstance.post('/auth/refresh-token', {}, { withCredentials: true })
      .then((res) => {
        const config = error.config;

        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(res.data));

        config.headers['Authorization'] = `Bearer ${res.data.token}`;

        return new Promise((resolve, reject) => {
          axios.request(config)
            .then(response => {
              resolve(response);
            }).catch((error) => {
              reject(error);
            })
        })
      })
      .catch((error) => {
        Promise.reject(error);
      })
  }

  return Promise.reject(error);
});

export { apiInstance };
