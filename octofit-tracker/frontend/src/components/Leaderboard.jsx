import { useState, useEffect } from 'react';
import { apiFetch, extractDataFromResponse } from '../utils/api';

// Codespaces example endpoint: https://<codespace>-8000.app.github.dev/api/leaderboard

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await apiFetch('/leaderboard');
        const { data } = extractDataFromResponse(response);
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Leaderboard</h1>
      
      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      
      {!loading && leaderboard.length === 0 && (
        <div className="alert alert-secondary">No leaderboard data found</div>
      )}

      {!loading && leaderboard.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Activities</th>
                <th>Total Calories</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || entry._id || index}>
                  <td>
                    <strong>#{index + 1}</strong>
                  </td>
                  <td>{entry.username || entry.userId}</td>
                  <td>{entry.score || 0}</td>
                  <td>{entry.activityCount || 0}</td>
                  <td>{entry.totalCalories || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
