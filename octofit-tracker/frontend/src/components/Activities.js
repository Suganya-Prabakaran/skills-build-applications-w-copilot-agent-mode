import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Activities response data:', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setActivities(records);
      })
      .catch((error) => console.error('Activities fetch error:', error));
  }, [endpoint]);

  const filteredActivities = activities.filter((activity) =>
    `${activity.user_name || activity.user || ''} ${activity.type || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <div>
          <h2 className="h4 mb-1">Activities</h2>
          <p className="mb-0 text-white-50">Review logged activity data from the backend.</p>
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
              placeholder="Search activities"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover table-dark mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity, idx) => (
                  <tr key={idx}>
                    <td>{activity.user_name || activity.user}</td>
                    <td>{activity.type}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    No activities found.
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
                <h5 className="modal-title">Raw Activities JSON</h5>
                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <pre className="bg-black text-white p-3 rounded">{JSON.stringify(activities, null, 2)}</pre>
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

export default Activities;
