import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@constants/api';
import { userKeys } from '@constants/queryKeys';
import apiClient from '../lib/apiClient';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiClient.post(API_ENDPOINTS.USERS, userData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
