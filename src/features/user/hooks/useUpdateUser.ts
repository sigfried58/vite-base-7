import { useMutation } from '@shared/hooks';
import { API_ENDPOINTS } from '@constants/api';
import type { User } from '@src-types/user';

export const useUpdateUser = (id: number | string) => {
  return useMutation<User>(API_ENDPOINTS.USER_BY_ID(id), { method: 'PUT' });
};
