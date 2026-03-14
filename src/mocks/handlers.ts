import { http, HttpResponse } from 'msw';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';

export const handlers = [
  http.get(`${API_BASE_URL}${API_ENDPOINTS.USER_BY_ID(1)}`, () => {
    return HttpResponse.json({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz'
    });
  }),
  http.post(`${API_BASE_URL}${API_ENDPOINTS.USERS}`, async ({ request }) => {
    const newUser = await request.json();
    return HttpResponse.json({ ...(newUser as object), id: 11 }, { status: 201 });
  }),
  http.put(`${API_BASE_URL}${API_ENDPOINTS.USERS}/:id`, async ({ request, params }) => {
    const { id } = params;
    const updatedUser = await request.json();
    return HttpResponse.json({ ...(updatedUser as object), id: Number(id) });
  }),
  http.delete(`${API_BASE_URL}${API_ENDPOINTS.USERS}/:id`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
