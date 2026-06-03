import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';
import logo from './assets/octofitapp-small.png';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const HomeDashboard = () => (
  <div className="card data-card shadow-sm">
    <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
      <div>
        <h2 className="h4 mb-1">Welcome to OctoFit Tracker</h2>
        <p className="mb-0 text-light-emphasis">
          Use the sections below to browse users, teams, activities, workouts, and leaderboard data.
        </p>
        <p className="mb-0 small">
          API Base: <span className="fw-semibold">{apiOrigin}</span>
        </p>
      </div>
      <a
        className="btn btn-outline-light btn-sm"
        href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
        target="_blank"
        rel="noreferrer"
      >
        Bootstrap Docs
      </a>
    </div>
    <div className="card-body">
      <h3 className="h5 mb-3">Quick Navigation</h3>
      <div className="list-group">
        <NavLink to="/users" className="list-group-item list-group-item-action">
          Users
        </NavLink>
        <NavLink to="/teams" className="list-group-item list-group-item-action">
          Teams
        </NavLink>
        <NavLink to="/activities" className="list-group-item list-group-item-action">
          Activities
        </NavLink>
        <NavLink to="/workouts" className="list-group-item list-group-item-action">
          Workouts
        </NavLink>
        <NavLink to="/leaderboard" className="list-group-item list-group-item-action">
          Leaderboard
        </NavLink>
      </div>
    </div>
  </div>
);

function App() {
  console.log('OctoFit frontend routes initialized with react-router-dom. API base:', apiOrigin);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar sticky-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="OctoFit" className="app-logo me-2" />
            <span>OctoFit Tracker</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/workouts">
                  Workouts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="page-header mb-4">
          <div className="d-flex align-items-center gap-3 page-branding mb-2">
            <img src={logo} alt="OctoFit brand" className="page-logo" />
            <h1 className="display-6 mb-0">OctoFit Tracker Dashboard</h1>
          </div>
          <p className="lead mb-0">Explore your fitness data with consistent Bootstrap cards, tables, forms, links, and modals.</p>
        </div>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
