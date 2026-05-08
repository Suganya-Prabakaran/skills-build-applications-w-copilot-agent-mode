import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Teams response data:', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch((error) => console.error('Teams fetch error:', error));
  }, [endpoint]);

  const filteredTeams = teams.filter((team) =>
    `${team.name} ${team.description}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <div>
          <h2 className="h5 mb-1">Teams</h2>
          <p className="mb-0 text-white-50">View the Marvel and DC teams from the API.</p>
        </div>
        <button className="btn btn-outline-light" onClick={() => setShowModal(true)}>
          View JSON
        </button>
      </div>
      <div className="card-body">
        <form className="mb-3">
          <div className="input-group">
            <span className="input-group-text">Filter</span>
            <input
              type="text"
              className="form-control"
              placeholder="Search teams"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-dark mb-0">
            <thead>
              <tr>
                <th>Team</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team, idx) => (
                <tr key={idx}>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                </tr>
              ))}
              {filteredTeams.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center text-muted py-4">
                    No teams found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Raw Teams JSON</h5>
                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <pre className="bg-black text-white p-3 rounded">{JSON.stringify(teams, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
