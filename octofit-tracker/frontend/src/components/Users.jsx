import { useState, useEffect } from 'react';
import { apiFetch, extractDataFromResponse } from '../utils/api';

// Codespaces example endpoint: https://<codespace>-8000.app.github.dev/api/users

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiFetch('/users');
        const { data } = extractDataFromResponse(response);
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Users</h1>
      
      {loading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      
      {!loading && users.length === 0 && (
        <div className="alert alert-secondary">No users found</div>
      )}

      {!loading && users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id || user._id}>
                  <td>{user.id || user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
