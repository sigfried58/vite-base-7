import { useUser } from '../../hooks/useUser';

export function UserProfile() {
  const { data: user, error, isLoading } = useUser(1);

  if (error) return <div role="alert">{error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
