import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import About from './About';

describe('About Page', () => {
  it('renders correctly with heading and text', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Page');
    expect(screen.getByText('This is the About page for the MFE Base Template.')).toBeInTheDocument();
  });

  it('contains a link to navigate back home', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: /Go back Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/home');
  });
});
