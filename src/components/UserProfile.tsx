import { useUser } from '../hooks/useUser';

export function UserProfile() {
  const { data: user, error, isPending } = useUser(1);

  if (error) return <div role="alert">{error.message}</div>;
  if (isPending) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
