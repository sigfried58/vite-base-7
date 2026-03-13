import { render, screen, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { server } from '../mocks/server';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('renders user details successfully', async () => {
    render(<UserProfile />);
    
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

    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to fetch user');
    });
  });
});
