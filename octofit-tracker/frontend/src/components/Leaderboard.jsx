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

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/leaderboard`);
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard: ${response.status}`);
        }

        const payload = await response.json();
        setEntries(normalizeList(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title mb-3">Leaderboard</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <ol className="list-group list-group-numbered">
            {entries.map((entry, index) => (
              <li key={entry._id || `${entry.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">{entry.name}</div>
                  <div className="text-muted">{entry.team}</div>
                </div>
                <span className="badge bg-primary rounded-pill">{entry.points} pts</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
