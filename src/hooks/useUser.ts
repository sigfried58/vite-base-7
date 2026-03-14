import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../services/userService';
import type { User } from '../types/user';

export const useUser = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });
};
