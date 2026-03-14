import { useFetch } from '@shared/hooks/useFetch';
import type { User } from '@src-types/user';
import { API_ENDPOINTS } from '@constants/api';

export const useUser = (id: number) => {
  return useFetch<User>(API_ENDPOINTS.USER_BY_ID(id));
};
