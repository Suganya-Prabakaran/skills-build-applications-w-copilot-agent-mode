import React, { useEffect, useState } from 'react';

const Teams = () => {
  const tableClassName = 'table table-striped table-hover table-bordered align-middle mb-0 data-table';
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Teams fetched data:', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setTeams(records);
      })
      .catch((error) => console.error('Teams fetch error:', error));
  }, [endpoint]);

  const filteredTeams = teams.filter((team) =>
    `${team.name || ''} ${team.description || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card data-card shadow-sm mb-4">
      <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="h4 mb-1">Teams</h2>
          <p className="mb-0 text-light-emphasis">View the teams from the backend API.</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <a
            className="btn btn-link link-light link-underline-opacity-25 link-underline-opacity-100-hover px-0"
            href={endpoint}
            target="_blank"
            rel="noreferrer"
          >
            API endpoint
          </a>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={() => setShowModal(true)}>
            View JSON
          </button>
        </div>
      </div>

      <div className="card-body">
        <form className="row g-3 mb-3" onSubmit={(e) => e.preventDefault()}>
          <div className="col-12">
            <label htmlFor="teamsSearch" className="form-label mb-1">
              Search Teams
            </label>
            <div className="input-group">
              <span className="input-group-text">Filter</span>
              <input
                id="teamsSearch"
                type="text"
                className="form-control"
                placeholder="Search teams"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </form>

        <div className="table-responsive">
          <table className={tableClassName}>
            <thead>
              <tr>
                <th>Team</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team, idx) => (
                  <tr key={`${team.name || 'team'}-${idx}`}>
                    <td>{team.name}</td>
                    <td>{team.description}</td>
                  </tr>
                ))
              ) : (
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
        <>
          <div className="modal fade show d-block" tabIndex="-1" aria-modal="true" role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
              <div className="modal-content json-modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Raw Teams JSON</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="json-pre">{JSON.stringify(teams, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setShowModal(false)} />
        </>
      )}
    </div>
  );
};

export default Teams;
