import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import apiClient from '../lib/apiClient';

export const useFetch = <T>(
  url: string,
  options?: Omit<UseQueryOptions<T, AxiosError>, 'queryFn'>
) => {
  return useQuery<T, AxiosError>({
    queryKey: options?.queryKey || [url],
    queryFn: async ({ signal }) => {
      const response = await apiClient.request<T>({
        url,
        method: 'GET',
        signal,
      });
      return response.data;
    },
    ...options,
  });
};
