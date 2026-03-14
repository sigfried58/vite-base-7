import { useUserQuery } from '@hooks/useUserQuery';

export function UserProfile() {
  const { data: user, error, isLoading } = useUserQuery(1);

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
