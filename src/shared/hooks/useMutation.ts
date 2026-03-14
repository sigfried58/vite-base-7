import { useState, useCallback } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';
import apiClient from '@api/apiClient';

interface UseMutationState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: axios.AxiosError | null;
}

export const useMutation = <T, D = any>(
  url: string,
  config?: AxiosRequestConfig
) => {
  const [state, setState] = useState<UseMutationState<T>>({
    data: null,
    isLoading: false,
    isError: false,
    error: null,
  });

  const mutate = useCallback(
    async (data?: D) => {
      setState((prev) => ({ ...prev, isLoading: true, isError: false, error: null }));
      try {
        const response = await apiClient.request<T>({
          url,
          ...config,
          data,
        });
        setState({
          data: response.data,
          isLoading: false,
          isError: false,
          error: null,
        });
        return response.data;
      } catch (err) {
        const axiosError = err as axios.AxiosError;
        setState({
          data: null,
          isLoading: false,
          isError: true,
          error: axiosError,
        });
        throw axiosError;
      }
    },
    [url, config]
  );

  return { ...state, mutate };
};
