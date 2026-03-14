import { useFetch } from './useFetch';
import type { User } from '../types/user';

export const useUser = (id: number) => {
  return useFetch<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
};
