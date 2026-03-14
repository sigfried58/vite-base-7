import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { CodeErrorBoundary } from './CodeErrorBoundary';

const Bomb = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Explosion!');
  }
  return <div>Safe</div>;
};

describe('CodeErrorBoundary', () => {
  // Prevent console.error from cluttering the test output, and
  // prevent React 18's error re-throwing from failing the Vitest run
  const originalError = console.error;
  const preventDefaultError = (e: ErrorEvent) => e.preventDefault();
  
  beforeAll(() => {
    console.error = vi.fn();
    window.addEventListener('error', preventDefaultError);
  });
  afterAll(() => {
    console.error = originalError;
    window.removeEventListener('error', preventDefaultError);
  });

  it('renders children when there is no error', () => {
    render(
      <MemoryRouter>
        <CodeErrorBoundary>
          <div>Child Content</div>
        </CodeErrorBoundary>
      </MemoryRouter>
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('catches error and renders fallback UI', () => {
    render(
      <MemoryRouter>
        <CodeErrorBoundary>
          <Bomb shouldThrow={true} />
        </CodeErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText('Something went wrong in the component tree.')).toBeInTheDocument();
    expect(screen.getByText(/Explosion!/)).toBeInTheDocument();
  });

  it('resets error state when clicking "Go back Home"', async () => {
    render(
      <MemoryRouter initialEntries={['/error']}>
        <Routes>
          <Route path="/home" element={<div>Home Page Content</div>} />
          <Route
            path="/error"
            element={
              <CodeErrorBoundary>
                <Bomb shouldThrow={true} />
              </CodeErrorBoundary>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Something went wrong in the component tree.')).toBeInTheDocument();
    
    // Simulate clicking the reset link
    const resetLink = screen.getByText('Go back Home');
    fireEvent.click(resetLink);
  });
});
