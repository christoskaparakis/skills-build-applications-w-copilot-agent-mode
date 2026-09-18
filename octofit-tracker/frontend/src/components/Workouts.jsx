import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const hasValidCodespaceName =
    Boolean(codespaceName) &&
    codespaceName !== 'undefined' &&
    codespaceName !== 'your-codespace-name';

  if (hasValidCodespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/workouts`);
        if (!response.ok) {
          throw new Error(`Failed to fetch workouts: ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeList(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title mb-3">Workouts</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.title}>
                <div className="border rounded p-3 h-100">
                  <h4>{workout.title}</h4>
                  <p className="mb-1"><strong>Focus:</strong> {workout.focus}</p>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                  <p className="mb-1"><strong>Duration:</strong> {workout.durationMinutes} min</p>
                  <p className="mb-0"><strong>Equipment:</strong> {workout.equipment?.join(', ') || 'None'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
