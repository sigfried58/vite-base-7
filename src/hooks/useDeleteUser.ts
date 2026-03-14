import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@constants/api';
import { userKeys } from '@constants/queryKeys';
import apiClient from '../lib/apiClient';

export const useDeleteUser = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete(API_ENDPOINTS.USER_BY_ID(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
    },
  });
};
