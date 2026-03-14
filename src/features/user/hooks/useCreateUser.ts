import { useMutation } from '@shared/hooks';
import { API_ENDPOINTS } from '@constants/api';
import type { User } from '@src-types/user';

export const useCreateUser = () => {
  return useMutation<User>(API_ENDPOINTS.USERS);
};
