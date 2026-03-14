import { useState } from 'react';
import { useMutation } from '@hooks/useMutation';
import { API_ENDPOINTS } from '@constants/api';

export function UserActions() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { mutate: createUser, isLoading: isCreating, data: createdUser } = useMutation<any>(
    API_ENDPOINTS.USERS
  );

  const { mutate: updateUser, isLoading: isUpdating } = useMutation<any>(
    API_ENDPOINTS.USER_BY_ID(1),
    { method: 'PUT' }
  );

  const { mutate: deleteUser, isLoading: isDeleting, isError: deleteError } = useMutation<any>(
    API_ENDPOINTS.USER_BY_ID(1),
    { method: 'DELETE' }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ name, email });
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser({ name: 'Updated Name', email: 'updated@example.com' });
      alert('User updated successfully!');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3>User Actions (Mutations)</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '300px' }}>
        <input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit" disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create User (POST)'}
        </button>
      </form>

      {createdUser && (
        <div style={{ padding: '0.5rem', background: '#e6fffa', border: '1px solid #38b2ac' }}>
          Created: {createdUser.name} ({createdUser.email}) with ID: {createdUser.id}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={handleUpdate} disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update ID:1 (PUT)'}
        </button>
        <button onClick={handleDelete} disabled={isDeleting} style={{ borderColor: 'red', color: 'red' }}>
          {isDeleting ? 'Deleting...' : 'Delete ID:1 (DELETE)'}
        </button>
      </div>
      {deleteError && <div style={{ color: 'red' }}>Error deleting user.</div>}
    </div>
  );
}
