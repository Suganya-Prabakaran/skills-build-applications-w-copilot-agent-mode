import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';
import logo from './assets/octofitapp-small.png';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar">
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
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">
                  Workouts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        <div className="page-header mb-4">
          <h1 className="display-5 text-light">OctoFit Tracker Dashboard</h1>
          <p className="lead text-secondary">Browse users, teams, workouts, activities, and leaderboard data from the backend API.</p>
        </div>
        <Routes>
          <Route path="/" element={<div className="alert alert-info">Welcome to OctoFit Tracker. Choose a section from the menu.</div>} />
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
