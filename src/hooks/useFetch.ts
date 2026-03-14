import { useState, useEffect, useCallback } from 'react';
import { type AxiosError, type AxiosRequestConfig, isCancel } from 'axios';
import apiClient from '../lib/apiClient';

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
}

export const useFetch = <T>(url: string, config?: AxiosRequestConfig) => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
  });

  const fetchData = useCallback(async (abortController: AbortController) => {
    setState((prev) => ({ ...prev, isLoading: true, isError: false, error: null }));
    try {
      const response = await apiClient.request<T>({
        url,
        method: 'GET',
        ...config,
        signal: abortController.signal,
      });
      setState({
        data: response.data,
        isLoading: false,
        isError: false,
        error: null,
      });
    } catch (err: any) {
      if (isCancel(err)) return;
      
      setState({
        data: null,
        isLoading: false,
        isError: true,
        error: err as AxiosError,
      });
    }
  }, [url, config]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController);
    return () => abortController.abort();
  }, [fetchData]);

  const refetch = useCallback(() => {
    const abortController = new AbortController();
    fetchData(abortController);
  }, [fetchData]);

  return { ...state, refetch };
};
