import { useMutation as useTanStackMutation, type UseMutationOptions } from '@tanstack/react-query';
import { type AxiosError, type AxiosRequestConfig } from 'axios';
import apiClient from '../lib/apiClient';

interface ExtendedMutationOptions<T, D> extends UseMutationOptions<T, AxiosError, D> {
  method?: AxiosRequestConfig['method'];
}

export const useMutation = <T, D = any>(
  url: string,
  options?: ExtendedMutationOptions<T, D>
) => {
  const mutation = useTanStackMutation<T, AxiosError, D>({
    mutationFn: async (data: D) => {
      const response = await apiClient.request<T>({
        url,
        method: options?.method || 'POST',
        data,
      });
      return response.data;
    },
    ...options,
  });

  return {
    ...mutation,
    mutate: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
