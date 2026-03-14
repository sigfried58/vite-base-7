import { useMutation } from './useMutation';
import { API_ENDPOINTS } from '@constants/api';
import { useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@constants/queryKeys';

export const useUpdateUser = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation<any>(API_ENDPOINTS.USER_BY_ID(id), {
    method: 'PUT',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
    },
  });
};
