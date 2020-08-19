import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  async (conf) => {
    const token = JSON.parse(sessionStorage.getItem('token'));

    // eslint-disable-next-line no-param-reassign
    conf.headers.Authorization = `Bearer ${token}`;

    return conf;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.config.url !== '/login'
    ) {
      const requestConfig = error.config;
      window.location = '/';
      return axios(requestConfig);
    }
    return Promise.reject(error);
  }
);

export default api;
