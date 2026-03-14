import { fetchUser } from './userService';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('userService', () => {
  describe('fetchUser', () => {
    it('returns user data for a valid ID', async () => {
      const user = await fetchUser(1);
      
      expect(user).toBeDefined();
      expect(user.id).toBe(1);
      expect(user.name).toBe('Leanne Graham');
      expect(user.email).toBe('Sincere@april.biz');
    });

    it('throws an error when the request fails', async () => {
      server.use(
        http.get('https://jsonplaceholder.typicode.com/users/1', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(fetchUser(1)).rejects.toThrow('Request failed with status code 500');
    });
  });
});
