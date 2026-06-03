import React, { useEffect, useState } from 'react';

const Users = () => {
  const tableClassName = 'table table-striped table-hover table-bordered align-middle mb-0 data-table';
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/users/`;

  useEffect(() => {
    console.log('Users endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Users fetched data:', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setUsers(records);
      })
      .catch((error) => console.error('Users fetch error:', error));
  }, [endpoint]);

  const filteredUsers = users.filter((user) =>
    `${user.name || ''} ${user.email || ''} ${user.team || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card data-card shadow-sm mb-4">
      <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="h4 mb-1">Users</h2>
          <p className="mb-0 text-light-emphasis">Browse the OctoFit user roster from the backend API.</p>
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
            <label htmlFor="usersSearch" className="form-label mb-1">
              Search Users
            </label>
            <div className="input-group">
              <span className="input-group-text">Filter</span>
              <input
                id="usersSearch"
                type="text"
                className="form-control"
                placeholder="Search users"
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
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <tr key={`${user.email || user.name || 'user'}-${idx}`}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.team}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">
                    No users found.
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
                  <h5 className="modal-title">Raw Users JSON</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="json-pre">{JSON.stringify(users, null, 2)}</pre>
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

export default Users;
