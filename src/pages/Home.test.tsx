import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from './Home';
import { server } from '@mocks/server';
import { http, HttpResponse } from 'msw';
import { API_BASE_URL, API_ENDPOINTS } from '@constants/api';

describe('Home Page', () => {
  it('renders correctly and displays essential elements', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByText('Welcome to the MFE Base Template!')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go to About/i })).toBeInTheDocument();
  });

  it('handles simulated component errors gracefully', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
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
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Initial loading from UserProfile
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      // Validate the mock data arrived
      expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument();
    });
  });
});
