import { apiInstance } from 'api/api';

const linkYouTubeAccount = (params) => {
  return apiInstance.post('/api/auth/google/callback', params,{ withCredentials: true });
};

const getAuthLink = () => {
  return apiInstance.get('/api/auth/google',{ withCredentials: true });
};

const getVideoInformation = ({ downloadUrl }) => {
  return apiInstance.get('/api/you-tube/get-video-information',{ params: { downloadUrl }, withCredentials: true });
};

const convertVideo = ({ downloadUrl }) => {
  return apiInstance.post('/api/you-tube/convert-to-full-hd',{ downloadUrl }, { withCredentials: true });
};

const cancelConvertVideo = ({ downloadUrl }) => {
  return apiInstance.post('/api/you-tube/convert-cancel',{ downloadUrl }, { withCredentials: true });
};

const getCreds = () => {
  return apiInstance.get('/api/you-tube/get-credentials', { withCredentials: true });
};

const downloadVideo = ({ downloadUrl }, onDownloadProgress) => {
  return apiInstance.get('/api/you-tube/download-video',{
    responseType: 'blob',
    params: { downloadUrl },
    withCredentials: true,
    onDownloadProgress,
  });
};

export const youTubeApi = {
  getAuthLink,
  linkYouTubeAccount,
  getVideoInformation,
  downloadVideo,
  convertVideo,
  cancelConvertVideo,
  getCreds,
}
