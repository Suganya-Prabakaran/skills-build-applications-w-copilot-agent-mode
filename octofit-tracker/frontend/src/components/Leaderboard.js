import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const tableClassName = 'table table-striped table-hover table-bordered align-middle mb-0 data-table';
  const [leaderboard, setLeaderboard] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Leaderboard fetched data:', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setLeaderboard(records);
      })
      .catch((error) => console.error('Leaderboard fetch error:', error));
  }, [endpoint]);

  const filteredLeaderboard = leaderboard.filter((entry) =>
    `${entry.user_name || entry.user || ''} ${entry.rank || ''} ${entry.points || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card data-card shadow-sm mb-4">
      <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="mb-0 text-light-emphasis">See the top performers from the backend leaderboard.</p>
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
            <label htmlFor="leaderboardSearch" className="form-label mb-1">
              Search Leaderboard
            </label>
            <div className="input-group">
              <span className="input-group-text">Filter</span>
              <input
                id="leaderboardSearch"
                type="text"
                className="form-control"
                placeholder="Search leaderboard"
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
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.length > 0 ? (
                filteredLeaderboard.map((entry, idx) => (
                  <tr key={`${entry.user_name || entry.user || 'leader'}-${idx}`}>
                    <td>{entry.rank}</td>
                    <td>{entry.user_name || entry.user}</td>
                    <td>{entry.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">
                    No leaderboard entries found.
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
                  <h5 className="modal-title">Raw Leaderboard JSON</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="json-pre">{JSON.stringify(leaderboard, null, 2)}</pre>
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

export default Leaderboard;
