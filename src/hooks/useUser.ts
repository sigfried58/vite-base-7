import { useFetch } from '@hooks/useFetch';
import type { User } from '@src-types/user';
import { API_ENDPOINTS } from '@constants/api';
import { userKeys } from '@constants/queryKeys';

export const useUser = (id: number) => {
  return useFetch<User>(API_ENDPOINTS.USER_BY_ID(id), {
    queryKey: userKeys.detail(id),
    enabled: !!id,
  });
};
