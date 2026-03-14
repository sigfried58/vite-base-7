import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import About from './About';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('About Page', () => {
  it('renders correctly with heading and text', () => {
    renderWithProviders(<About />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Page');
    expect(screen.getByText('This is the About page for the MFE Base Template.')).toBeInTheDocument();
  });

  it('contains a link to navigate back home', () => {
    renderWithProviders(<About />);

    const homeLink = screen.getByRole('link', { name: /Go back Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/home');
  });
});
