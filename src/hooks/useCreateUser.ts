import { useMutation } from './useMutation';
import { API_ENDPOINTS } from '@constants/api';
import { useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@constants/queryKeys';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any>(API_ENDPOINTS.USERS, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
