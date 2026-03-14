import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { GlobalErrorBoundary } from './GlobalErrorBoundary';

const renderErrorBoundary = (routerConfig: Parameters<typeof createMemoryRouter>[0], initialEntries = ['/']) => {
  const router = createMemoryRouter(routerConfig, {
    initialEntries,
  });
  // Silence react router console errors during testing
  const originalError = console.error;
  console.error = () => {};
  render(<RouterProvider router={router} />);
  console.error = originalError;
};

// Helper to manually throw a RouteErrorResponse-like object
const Throw404 = () => {
  throw { statusText: 'Not Found', status: 404, internal: true, data: 'Not Found' };
};

describe('GlobalErrorBoundary', () => {
  it('renders standard error message for generic Error instances', () => {
    const FailingComponent = () => {
      throw new Error('Generic failure');
    };

    renderErrorBoundary([
      {
        path: '/',
        element: <FailingComponent />,
        errorElement: <GlobalErrorBoundary />,
      },
    ]);

    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Generic failure')).toBeInTheDocument();
  });

  it('renders RouteErrorResponse status text (e.g. 404 Not Found)', () => {
    renderErrorBoundary([
      {
         path: '/',
         element: <Throw404 />,
         errorElement: <GlobalErrorBoundary />,
      }
    ]);

    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
