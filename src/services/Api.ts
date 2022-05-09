import axios from 'axios';

export const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? '',
});

Api.interceptors.request.use(config => {
  // Do something before request is sent
  return {
    ...config,
    params: {
      ...config.params,
      token: process.env.REACT_APP_API_TOKEN ?? '',
    },
  };
});
