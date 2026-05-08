import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/leaderboards/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Leaderboard response data:', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setLeaderboard(records);
      })
      .catch((error) => console.error('Leaderboard fetch error:', error));
  }, [endpoint]);

  const filteredLeaderboard = leaderboard.filter((entry) =>
    `${entry.user_name || entry.user || ''} ${entry.rank || ''} ${entry.points || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <div>
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="mb-0 text-white-50">See the top performers from the backend leaderboard.</p>
        </div>
        <button className="btn btn-outline-light" onClick={() => setShowModal(true)}>
          View JSON
        </button>
      </div>
      <div className="card-body">
        <form className="mb-4">
          <div className="input-group">
            <span className="input-group-text">Filter</span>
            <input
              type="text"
              className="form-control"
              placeholder="Search leaderboard"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover table-dark mb-0">
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
                  <tr key={idx}>
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
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Raw Leaderboard JSON</h5>
                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <pre className="bg-black text-white p-3 rounded">{JSON.stringify(leaderboard, null, 2)}</pre>
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

export default Leaderboard;
