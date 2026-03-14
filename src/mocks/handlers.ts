import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users/1', () => {
    return HttpResponse.json({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz'
    });
  }),
  http.post('https://jsonplaceholder.typicode.com/users', async ({ request }) => {
    const newUser = await request.json();
    return HttpResponse.json({ ...(newUser as object), id: 11 }, { status: 201 });
  }),
  http.put('https://jsonplaceholder.typicode.com/users/:id', async ({ request, params }) => {
    const { id } = params;
    const updatedUser = await request.json();
    return HttpResponse.json({ ...(updatedUser as object), id: Number(id) });
  }),
  http.delete('https://jsonplaceholder.typicode.com/users/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
