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

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/teams`);
        if (!response.ok) {
          throw new Error(`Failed to fetch teams: ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeList(payload));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title mb-3">Teams</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-3">
            {teams.map((team) => (
              <div className="col-md-6" key={team._id || team.name}>
                <div className="border rounded p-3 h-100">
                  <h4>{team.name}</h4>
                  <p className="mb-1"><strong>Sport:</strong> {team.sport}</p>
                  <p className="mb-1"><strong>City:</strong> {team.city}</p>
                  <p className="mb-0"><strong>Members:</strong> {team.members?.length ?? 0}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
