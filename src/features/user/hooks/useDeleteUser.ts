import { useMutation } from '@shared/hooks';
import { API_ENDPOINTS } from '@constants/api';

export const useDeleteUser = (id: number | string) => {
  return useMutation<void>(API_ENDPOINTS.USER_BY_ID(id), { method: 'DELETE' });
};
