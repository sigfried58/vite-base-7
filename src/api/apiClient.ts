import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { API_BASE_URL } from '@constants/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add logic here if needed (e.g., auth tokens)
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Global error handling
    if (error.code === 'ECONNABORTED') {
      console.error('API Request Timeout');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
