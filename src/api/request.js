import axios from 'axios';
import BaseUrl from './BaseUrl';
const service = axios.create({
  baseURL: `${BaseUrl}`,
  timeout: 50000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  async config => {
    config.headers['Authorization'] = '';
    if (true) {
      config.headers['Authorization'] =  'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1';
     
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response;

    // if the custom code is not 200, it is judged as an error.
    if (res.status !== 200) {
      return Promise.reject(new Error(res || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    return Promise.reject(error);
  },
);

export default service;

// By Aftab Ameen & Waheeda Raheem