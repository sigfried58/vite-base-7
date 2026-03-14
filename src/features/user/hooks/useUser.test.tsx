import { renderHook, waitFor } from '@testing-library/react';
import { useUser } from './useUser';
import { server } from '@mocks/server';
import { http, HttpResponse } from 'msw';
import { API_BASE_URL, API_ENDPOINTS } from '@constants/api';

describe('useUser Hook', () => {
  it('returns user data successfully', async () => {
    const { result } = renderHook(() => useUser(1));

    // Initially loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.name).toBe('Leanne Graham');
    expect(result.current.data?.email).toBe('Sincere@april.biz');
  });

  it('handles API errors correctly', async () => {
    server.use(
      http.get(`${API_BASE_URL}${API_ENDPOINTS.USER_BY_ID(999)}`, () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    const { result } = renderHook(() => useUser(999));

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeDefined();
  });
});
