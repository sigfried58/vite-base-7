import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '../mocks/server';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it('renders user details successfully', async () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <UserProfile />
      </QueryClientProvider>
    );
    
    // Initial loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for the data to load and assert the elements
    await waitFor(() => {
      expect(screen.getByText('User Profile')).toBeInTheDocument();
      expect(screen.getByText('Name: Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Email: Sincere@april.biz')).toBeInTheDocument();
    });
  });

  it('handles server error', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/users/1', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <UserProfile />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Request failed with status code 500');
    });
  });
});
