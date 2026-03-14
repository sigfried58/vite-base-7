export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

export const API_ENDPOINTS = {
  USERS: '/users',
  USER_BY_ID: (id: number | string) => `/users/${id}`,
} as const;
