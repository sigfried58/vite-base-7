import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUser } from './useUser';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useUser Hook', () => {
  it('returns user data successfully', async () => {
    const { result } = renderHook(() => useUser(1), {
      wrapper: createWrapper(),
    });

    // Initially loading
    expect(result.current.isPending).toBe(true);
    expect(result.current.data).toBeUndefined();

    // Wait for the query to resolve
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.name).toBe('Leanne Graham');
    expect(result.current.data?.email).toBe('Sincere@april.biz');
  });

  it('handles API errors correctly', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/users/999', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    const { result } = renderHook(() => useUser(999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toMatch(/Request failed with status code 404/);
  });
});
