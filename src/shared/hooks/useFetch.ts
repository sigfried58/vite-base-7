import { useState, useEffect, useCallback, useRef } from 'react';
import axios, { isCancel, type AxiosRequestConfig, type AxiosError } from 'axios';
import apiClient from '@api/apiClient';

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useFetch = <T>(url: string, config?: AxiosRequestConfig) => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
  });

  const configRef = useRef(config);

  const fetchData = useCallback(async (abortSignal?: AbortSignal) => {
    setState((prev) => ({ ...prev, isLoading: true, isError: false, error: null }));
    try {
      const response = await apiClient.request<T>({
        url,
        signal: abortSignal,
        ...configRef.current,
      });
      setState({
        data: response.data,
        isLoading: false,
        isError: false,
        error: null,
      });
    } catch (err) {
      if (isCancel(err)) return;
      
      setState({
        data: null,
        isLoading: false,
        isError: true,
        error: err as Error,
      });
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
};
