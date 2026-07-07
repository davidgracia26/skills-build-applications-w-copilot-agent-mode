import { useState, useEffect } from 'react';
import { apiFetch, extractDataFromResponse } from '../utils/api';

// Codespaces example endpoint: https://<codespace>-8000.app.github.dev/api/activities

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await apiFetch('/activities');
        const { data } = extractDataFromResponse(response);
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Activities</h1>
      
      {loading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      
      {!loading && activities.length === 0 && (
        <div className="alert alert-secondary">No activities found</div>
      )}

      {!loading && activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id || activity._id}>
                  <td>{activity.id || activity._id}</td>
                  <td>{activity.userId || activity.user}</td>
                  <td>{activity.type}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                  <td>{activity.duration} min</td>
                  <td>{activity.caloriesBurned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
