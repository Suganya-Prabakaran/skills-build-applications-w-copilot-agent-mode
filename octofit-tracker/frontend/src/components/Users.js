import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/users/`;

  useEffect(() => {
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Users response data:', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch((error) => console.error('Users fetch error:', error));
  }, [endpoint]);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.team}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <div>
          <h2 className="h5 mb-1">Users</h2>
          <p className="mb-0 text-white-50">Browse the OctoFit user roster from the backend API.</p>
        </div>
        <button className="btn btn-outline-light" onClick={() => setShowModal(true)}>
          View JSON
        </button>
      </div>
      <div className="card-body">
        <form className="mb-3">
          <div className="input-group">
            <span className="input-group-text">Search</span>
            <input
              type="text"
              className="form-control"
              placeholder="Search users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-dark align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.team}</td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
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
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Raw Users JSON</h5>
                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <pre className="bg-black text-white p-3 rounded">{JSON.stringify(users, null, 2)}</pre>
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

export default Users;
