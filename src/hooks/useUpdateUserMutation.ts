import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@constants/api';
import { userKeys } from '@constants/queryKeys';
import apiClient from '../lib/apiClient';

export const useUpdateUserMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiClient.put(API_ENDPOINTS.USER_BY_ID(id), userData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
    },
  });
};
