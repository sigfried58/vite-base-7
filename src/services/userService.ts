import axios from 'axios';
import type { User } from '../types/user';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUser = async (id: number): Promise<User> => {
  const { data } = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
  return data;
};
