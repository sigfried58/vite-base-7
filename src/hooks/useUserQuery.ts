import { useQuery } from '@tanstack/react-query';
import type { User } from '@src-types/user';
import { API_ENDPOINTS } from '@constants/api';
import { userKeys } from '@constants/queryKeys';
import apiClient from '../lib/apiClient';

export const useUserQuery = (id: number) => {
  return useQuery<User>({
    queryKey: userKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await apiClient.get<User>(API_ENDPOINTS.USER_BY_ID(id), { signal });
      return response.data;
    },
    enabled: !!id,
  });
};
