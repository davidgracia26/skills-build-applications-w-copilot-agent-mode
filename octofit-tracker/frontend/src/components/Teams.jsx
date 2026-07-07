import { useState, useEffect } from 'react';
import { apiFetch, extractDataFromResponse } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await apiFetch('/teams');
        const { data } = extractDataFromResponse(response);
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Teams</h1>
      
      {loading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      
      {!loading && teams.length === 0 && (
        <div className="alert alert-secondary">No teams found</div>
      )}

      {!loading && teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id || team._id}>
                  <td>{team.id || team._id}</td>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                  <td>{team.members ? team.members.length : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
