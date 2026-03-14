import { useState, useCallback } from 'react';
import { type AxiosError, type AxiosRequestConfig, isCancel } from 'axios';
import apiClient from '../lib/apiClient';

interface UseMutationState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
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
    async (data?: D, overrideConfig?: AxiosRequestConfig) => {
      setState((prev) => ({ ...prev, isLoading: true, isError: false, error: null }));
      try {
        const response = await apiClient.request<T>({
          url,
          method: 'POST',
          data,
          ...config,
          ...overrideConfig,
        });
        setState({
          data: response.data,
          isLoading: false,
          isError: false,
          error: null,
        });
        return response.data;
      } catch (err: any) {
        if (isCancel(err)) throw err;

        setState({
          data: null,
          isLoading: false,
          isError: true,
          error: err as AxiosError,
        });
        throw err;
      }
    },
    [url, config]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
    });
  }, []);

  return { ...state, mutate, reset };
};
