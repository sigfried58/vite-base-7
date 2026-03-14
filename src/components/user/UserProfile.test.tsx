import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '../../mocks/server';
import { UserProfile } from './UserProfile';
import { API_BASE_URL, API_ENDPOINTS } from '../../constants/api';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProvider = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('UserProfile', () => {
  it('renders user details successfully', async () => {
    renderWithProvider(<UserProfile />);
    
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
      http.get(`${API_BASE_URL}${API_ENDPOINTS.USER_BY_ID(1)}`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProvider(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
