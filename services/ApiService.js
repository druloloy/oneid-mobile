import axios from 'axios';
import TokenService from './TokenService';
import apiConfig from './api.config';

const {getLocalSession, getLocalUser} = TokenService;

const instance = axios.create({
  baseURL: apiConfig.baseUrl + apiConfig.endpoints.patientApi,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'max-age=31536000', // cache all requests for 1 year
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  async config => {
    const session = await getLocalSession();
    const userId = await getLocalUser();
    if (session && userId) {
      config.headers['_sid'] = session;
      config.headers['_uid'] = userId;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
