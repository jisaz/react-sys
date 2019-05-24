import axios from 'axios';
import { BusinessError, NetError, CancelError } from './errors';

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 50000,
});

// Add a request interceptor
service.interceptors.request.use(config => config, error => Promise.reject(error));

// Add a response interceptor
service.interceptors.response.use(response => {
  const data = response.data;
  if (data.code !== 200) {
    return Promise.reject(new BusinessError(data.code, data.msg));
  }
  return response;
}, error => {

  const errcode = Number(error.code) || 0;

  return Promise.reject(new NetError(errcode));
});

export default service;
