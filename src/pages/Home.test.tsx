import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Home';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('Home Page', () => {
  it('renders correctly and displays essential elements', () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByText('Welcome to the MFE Base Template!')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go to About/i })).toBeInTheDocument();
  });

  it('handles simulated component errors gracefully', async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>
    );
    
    // Silence React's expected error logging and window ErrorEvents
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const preventDefaultError = (e: ErrorEvent) => e.preventDefault();
    window.addEventListener('error', preventDefaultError);

    const errorButton = screen.getByRole('button', { name: /Simulate Component Error/i });
    fireEvent.click(errorButton);

    expect(screen.getByText('Something went wrong in the component tree.')).toBeInTheDocument();

    consoleSpy.mockRestore();
    window.removeEventListener('error', preventDefaultError);
  });

  it('renders MSW example successfully', async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Initial loading from UserProfile
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      // Validate the mock data arrived
      expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument();
    });
  });
});
