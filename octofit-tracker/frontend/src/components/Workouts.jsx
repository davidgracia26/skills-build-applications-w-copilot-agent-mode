import { useState, useEffect } from 'react';
import { apiFetch, extractDataFromResponse } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await apiFetch('/workouts');
        const { data } = extractDataFromResponse(response);
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Personalized Workouts</h1>
      
      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      
      {!loading && workouts.length === 0 && (
        <div className="alert alert-secondary">No workouts found</div>
      )}

      {!loading && workouts.length > 0 && (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout.id || workout._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{workout.name || workout.type}</h5>
                  <p className="card-text">{workout.description || 'No description available'}</p>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">
                      Duration: {workout.duration || 'N/A'} min
                    </small>
                    <small className="text-muted">
                      Difficulty: {workout.difficulty || 'N/A'}
                    </small>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-primary w-100">
                    Start Workout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
